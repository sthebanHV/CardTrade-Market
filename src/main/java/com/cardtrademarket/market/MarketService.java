package com.cardtrademarket.market;

import com.cardtrademarket.model.MarketCache;
import com.cardtrademarket.repository.MarketCacheRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MarketService {

    private static final Logger log = LoggerFactory.getLogger(MarketService.class);
    private static final long TTL_MS = 24 * 60 * 60 * 1000L;
    private static final long TTL_NEGATIVO_MS = 6 * 60 * 60 * 1000L;
    private static final long INTERVALO_MS = 200;
    private static final int FALLOS_PARA_BLOQUEAR = 3;
    private static final long BLOQUEO_MS = 5 * 60 * 1000L;

    @Autowired
    private MarketCacheRepository cacheRepo;

    @Autowired
    private List<MarketClient> clients;

    private final ObjectMapper mapper = new ObjectMapper();
    private final Map<String, Long> ultimoIntento = new ConcurrentHashMap<>();
    private final Map<String, Integer> fallos = new ConcurrentHashMap<>();
    private final Map<String, Long> abiertoHasta = new ConcurrentHashMap<>();

    public MarketSearchResult buscar(String q, List<String> games, int limit) {
        List<MarketCard> results = new ArrayList<>();
        List<String> unavailable = new ArrayList<>();
        for (String game : games) {
            String cacheKey = "S|" + game + "|" + q.trim().toLowerCase() + "|" + limit;
            Optional<String> cacheado = leerCache(cacheKey, TTL_MS);
            if (cacheado.isPresent()) {
                results.addAll(deserializarLista(cacheado.get()));
                continue;
            }
            List<MarketClient> ordenados = clientsDe(game);
            boolean ok = false;
            for (MarketClient client : ordenados) {
                String k = clave(client);
                if (fuenteBloqueada(k)) continue;
                try {
                    esperarIntervalo(game);
                    List<MarketCard> r = client.buscar(q, limit);
                    marcarExito(k);
                    guardarCache(cacheKey, serializar(r));
                    results.addAll(r);
                    ok = true;
                    break;
                } catch (Exception e) {
                    marcarFallo(k);
                    log.warn("market source failed: {} ({})", k, e.getMessage());
                }
            }
            if (!ok) unavailable.add(game);
        }
        return new MarketSearchResult(results, unavailable);
    }

    public Optional<MarketCard.Detail> detalle(String game, String externalId) {
        String cacheKey = "D|" + game + "|" + externalId;
        Optional<String> cacheado = leerCache(cacheKey, TTL_MS);
        if (cacheado.isPresent() && !cacheado.get().equals("null")) {
            try {
                return Optional.of(mapper.readValue(cacheado.get(), MarketCard.Detail.class));
            } catch (Exception ignored) {
            }
        }
        for (MarketClient client : clientsDe(game)) {
            String k = clave(client);
            if (fuenteBloqueada(k)) continue;
            try {
                esperarIntervalo(game);
                Optional<MarketCard.Detail> d = client.detalle(externalId);
                marcarExito(k);
                guardarCache(cacheKey, d.map(this::serializar).orElse("null"));
                return d;
            } catch (Exception e) {
                marcarFallo(k);
                log.warn("market detail failed: {} ({})", k, e.getMessage());
            }
        }
        if (cacheado.isPresent() && !cacheado.get().equals("null")) {
            try {
                return Optional.of(mapper.readValue(cacheado.get(), MarketCard.Detail.class));
            } catch (Exception ignored) {
            }
        }
        return Optional.empty();
    }

    public Optional<MarketCard> resolver(String game, String nombre) {
        String cacheKey = "R|" + game + "|" + nombre.trim().toLowerCase();
        Optional<String> cacheado = leerCache(cacheKey, TTL_MS);
        if (cacheado.isPresent()) {
            if (cacheado.get().equals("null")) return Optional.empty();
            try {
                return Optional.of(mapper.readValue(cacheado.get(), MarketCard.class));
            } catch (Exception ignored) {
            }
        }
        for (MarketClient client : clientsDe(game)) {
            String k = clave(client);
            if (fuenteBloqueada(k)) continue;
            try {
                esperarIntervalo(game);
                Optional<MarketCard> match = client.resolver(nombre, 20);
                marcarExito(k);
                guardarCache(cacheKey, match.map(this::serializar).orElse("null"));
                return match;
            } catch (Exception e) {
                marcarFallo(k);
                log.warn("market resolve failed: {} ({})", k, e.getMessage());
            }
        }
        return Optional.empty();
    }

    public static Optional<MarketCard> mejorMatch(String nombre, List<MarketCard> candidatos) {
        String objetivo = normalizar(nombre);
        MarketCard mejor = null;
        int mejorScore = 0;
        for (MarketCard c : candidatos) {
            if (c == null || c.getName() == null) continue;
            int s = score(objetivo, normalizar(c.getName()));
            if (s > mejorScore) {
                mejorScore = s;
                mejor = c;
            }
        }
        return mejorScore >= 60 ? Optional.ofNullable(mejor) : Optional.empty();
    }

    private List<MarketClient> clientsDe(String game) {
        List<MarketClient> out = new ArrayList<>();
        for (MarketClient c : clients) {
            if (c.game().equalsIgnoreCase(game)) out.add(c);
        }
        out.sort(Comparator.comparingInt(MarketClient::prioridad));
        return out;
    }

    private String clave(MarketClient client) {
        return client.game() + "|" + client.fuente();
    }

    private boolean fuenteBloqueada(String k) {
        Long hasta = abiertoHasta.get(k);
        return hasta != null && System.currentTimeMillis() < hasta;
    }

    private void marcarFallo(String k) {
        int n = fallos.merge(k, 1, Integer::sum);
        if (n >= FALLOS_PARA_BLOQUEAR) {
            abiertoHasta.put(k, System.currentTimeMillis() + BLOQUEO_MS);
        }
    }

    private void marcarExito(String k) {
        fallos.remove(k);
        abiertoHasta.remove(k);
    }

    private void esperarIntervalo(String juego) {
        Long ultimo = ultimoIntento.get(juego);
        if (ultimo != null) {
            long delta = System.currentTimeMillis() - ultimo;
            if (delta < INTERVALO_MS) {
                try {
                    Thread.sleep(INTERVALO_MS - delta);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
        ultimoIntento.put(juego, System.currentTimeMillis());
    }

    private Optional<String> leerCache(String key, long ttlMs) {
        return cacheRepo.findByCacheKey(key)
                .filter(c -> c.getCreatedAt() != null
                        && System.currentTimeMillis() - c.getCreatedAt().getTime() < ttlMs)
                .map(MarketCache::getPayload);
    }

    private void guardarCache(String key, String payload) {
        try {
            MarketCache c = cacheRepo.findByCacheKey(key).orElseGet(MarketCache::new);
            c.setCacheKey(key);
            c.setPayload(payload);
            c.setCreatedAt(new Date());
            cacheRepo.save(c);
        } catch (Exception e) {
            log.warn("market cache write failed: {}", e.getMessage());
        }
    }

    private String serializar(Object o) {
        try {
            return mapper.writeValueAsString(o);
        } catch (Exception e) {
            return "null";
        }
    }

    private List<MarketCard> deserializarLista(String json) {
        try {
            return mapper.readValue(json, new TypeReference<List<MarketCard>>() {
            });
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public static String normalizar(String s) {
        String x = Normalizer.normalize(s == null ? "" : s, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase()
                .replaceAll("[^a-z0-9]+", " ");
        return x.trim().replaceAll("\\s+", " ");
    }

    private static int score(String a, String b) {
        if (a.isEmpty() || b.isEmpty()) return 0;
        if (a.equals(b)) return 100;
        if (a.contains(b) || b.contains(a)) return 85;
        Set<String> ta = new HashSet<>(Arrays.asList(a.split(" ")));
        Set<String> tb = new HashSet<>(Arrays.asList(b.split(" ")));
        Set<String> inter = new HashSet<>(ta);
        inter.retainAll(tb);
        if (inter.isEmpty()) return 0;
        int minTokens = Math.max(1, Math.min(ta.size(), tb.size()));
        double ratio = (double) inter.size() / minTokens;
        return (int) Math.round(ratio * 70);
    }

    public long ttlCacheMs() {
        return TTL_MS;
    }

    public long ttlNegativoMs() {
        return TTL_NEGATIVO_MS;
    }
}

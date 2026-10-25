package com.cardtrademarket.service;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.Collection;
import com.cardtrademarket.model.CollectionItem;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.CollectionItemRepository;
import com.cardtrademarket.repository.CollectionRepository;
import com.cardtrademarket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private CollectionItemRepository itemRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    // ---------- Colecciones temáticas (US-33) ----------

    public Collection crearColeccion(String userId, String name, String description) {
        return collectionRepository.save(new Collection(userId, name, description));
    }

    public List<Collection> coleccionesDe(String userId) {
        return collectionRepository.findByUserId(userId);
    }

    public Collection coleccionDe(String userId, String collectionId) {
        Collection c = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new IllegalArgumentException("Colección no encontrada"));
        if (!c.getUserId().equals(userId)) {
            throw new SecurityException("No tienes permiso sobre esta colección");
        }
        return c;
    }

    public Collection actualizarColeccion(String userId, String collectionId, String name, String description) {
        Collection c = coleccionDe(userId, collectionId);
        c.setName(name);
        c.setDescription(description);
        c.setUpdatedAt(LocalDateTime.now());
        return collectionRepository.save(c);
    }

    public void eliminarColeccion(String userId, String collectionId) {
        Collection c = coleccionDe(userId, collectionId);
        collectionRepository.delete(c);
    }

    public Collection agregarCard(String userId, String collectionId, String cardId) {
        Collection c = coleccionDe(userId, collectionId);
        if (c.getCardIds() == null) c.setCardIds(new ArrayList<>());
        if (c.getCardIds().contains(cardId)) {
            throw new IllegalArgumentException("La carta ya está en esta colección");
        }
        if (cardRepository.findById(cardId).isEmpty()) {
            throw new IllegalArgumentException("Carta no encontrada");
        }
        c.getCardIds().add(cardId);
        c.setUpdatedAt(LocalDateTime.now());
        return collectionRepository.save(c);
    }

    public Collection quitarCard(String userId, String collectionId, String cardId) {
        Collection c = coleccionDe(userId, collectionId);
        if (c.getCardIds() != null) {
            c.getCardIds().remove(cardId);
        }
        c.setUpdatedAt(LocalDateTime.now());
        return collectionRepository.save(c);
    }

    // ---------- Ítems de la colección principal (US-29/30) ----------

    public List<CollectionItem> itemsDe(String userId) {
        return itemRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<CollectionItem> buscarItems(String userId, String juego, String rareza, String estado, String q) {
        List<CollectionItem> base = itemRepository.buscar(userId,
                emptyToNull(juego), emptyToNull(rareza), emptyToNull(estado));
        if (q != null && !q.isBlank()) {
            String needle = q.toLowerCase();
            base = base.stream()
                    .filter(i -> i.getNombre() != null && i.getNombre().toLowerCase().contains(needle))
                    .collect(Collectors.toList());
        }
        return base;
    }

    public CollectionItem crearItem(String userId, Map<String, Object> body) {
        String cardId = str(body.get("cardId"));
        if (cardId == null || cardId.isBlank()) {
            throw new IllegalArgumentException("cardId es obligatorio");
        }
        if (itemRepository.findByUserIdAndCardId(userId, cardId).isPresent()) {
            throw new IllegalStateException("Esta carta ya está en tu colección");
        }
        Card card = cardRepository.findById(cardId).orElse(null);
        if (card == null) {
            throw new IllegalArgumentException("Carta no encontrada");
        }
        CollectionItem item = new CollectionItem();
        item.setUserId(userId);
        item.setCardId(cardId);
        item.setNombre(card.getNombre());
        item.setJuego(str(body.get("juego")) != null ? str(body.get("juego")) : card.getTipo());
        item.setRareza(str(body.get("rareza")) != null ? str(body.get("rareza")) : null);
        item.setEstado(str(body.get("estado")));
        item.setFechaAdquisicion(str(body.get("fechaAdquisicion")));
        item.setNotas(str(body.get("notas")));
        String pagado = str(body.get("precioPagado"));
        if (pagado != null && !pagado.isBlank()) {
            try {
                item.setPrecioPagado(new BigDecimal(pagado));
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("precioPagado inválido");
            }
        }
        String imagen = str(body.get("imagenDataUrl"));
        if (imagen != null && imagen.length() > 2_000_000) {
            throw new IllegalArgumentException("Imagen demasiado grande");
        }
        item.setImagenDataUrl(imagen);
        return itemRepository.save(item);
    }

    public CollectionItem actualizarItem(String userId, String itemId, Map<String, Object> body) {
        CollectionItem item = itemPropio(userId, itemId);
        String s;
        if ((s = str(body.get("estado"))) != null) item.setEstado(s);
        if ((s = str(body.get("juego"))) != null) item.setJuego(s);
        if ((s = str(body.get("rareza"))) != null) item.setRareza(s);
        if ((s = str(body.get("fechaAdquisicion"))) != null) item.setFechaAdquisicion(s);
        if (body.containsKey("notas")) item.setNotas(str(body.get("notas")));
        if (body.containsKey("precioPagado")) {
            String p = str(body.get("precioPagado"));
            if (p == null || p.isBlank()) {
                item.setPrecioPagado(null);
            } else {
                try { item.setPrecioPagado(new BigDecimal(p)); }
                catch (NumberFormatException e) { throw new IllegalArgumentException("precioPagado inválido"); }
            }
        }
        if (body.containsKey("imagenDataUrl")) {
            String imagen = str(body.get("imagenDataUrl"));
            if (imagen != null && imagen.length() > 2_000_000) {
                throw new IllegalArgumentException("Imagen demasiado grande");
            }
            item.setImagenDataUrl(imagen);
        }
        return itemRepository.save(item);
    }

    @Transactional
    public void eliminarItem(String userId, String itemId) {
        CollectionItem item = itemPropio(userId, itemId);
        itemRepository.delete(item);
    }

    public CollectionItem itemPropio(String userId, String itemId) {
        CollectionItem item = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Ítem no encontrado"));
        if (!item.getUserId().equals(userId)) {
            throw new SecurityException("No tienes permiso sobre este ítem");
        }
        return item;
    }

    // ---------- Estadísticas (US-31) ----------

    public Map<String, Object> stats(String userId) {
        List<CollectionItem> items = itemsDe(userId);
        Map<String, Card> cards = new HashMap<>();
        List<String> ids = items.stream().map(CollectionItem::getCardId).distinct().collect(Collectors.toList());
        if (!ids.isEmpty()) {
            cardRepository.findAllById(ids).forEach(c -> cards.put(c.getId(), c));
        }

        BigDecimal totalValor = BigDecimal.ZERO;
        Map<String, BigDecimal> porJuegoValor = new LinkedHashMap<>();
        Map<String, Integer> porJuegoCant = new LinkedHashMap<>();
        Map<String, Integer> porRareza = new LinkedHashMap<>();
        List<Map<String, Object>> conValor = new ArrayList<>();

        for (CollectionItem i : items) {
            Card c = cards.get(i.getCardId());
            BigDecimal valor;
            if (c != null && c.getPrecio() != null) {
                valor = BigDecimal.valueOf(c.getPrecio());
            } else {
                valor = i.getPrecioPagado() != null ? i.getPrecioPagado() : BigDecimal.ZERO;
            }
            totalValor = totalValor.add(valor);

            String juego = i.getJuego() != null ? i.getJuego() : "Sin juego";
            porJuegoValor.merge(juego, valor, BigDecimal::add);
            porJuegoCant.merge(juego, 1, Integer::sum);
            String rareza = i.getRareza() != null ? i.getRareza() : "Sin rareza";
            porRareza.merge(rareza, 1, Integer::sum);

            Map<String, Object> e = new LinkedHashMap<>();
            e.put("cardId", i.getCardId());
            e.put("nombre", i.getNombre());
            e.put("valor", valor);
            conValor.add(e);
        }

        conValor.sort((a, b) -> ((BigDecimal) b.get("valor")).compareTo((BigDecimal) a.get("valor")));
        List<Map<String, Object>> top = conValor.size() > 5 ? conValor.subList(0, 5) : conValor;

        List<Map<String, Object>> juegosOut = new ArrayList<>();
        porJuegoValor.forEach((k, v) -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("juego", k);
            m.put("cantidad", porJuegoCant.get(k));
            m.put("valor", v);
            juegosOut.add(m);
        });
        List<Map<String, Object>> rarezasOut = new ArrayList<>();
        porRareza.forEach((k, v) -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("rareza", k);
            m.put("cantidad", v);
            rarezasOut.add(m);
        });

        int n = items.size();
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("totalCartas", n);
        out.put("totalValor", totalValor);
        out.put("valorPromedio", n == 0 ? BigDecimal.ZERO
                : totalValor.divide(BigDecimal.valueOf(n), 2, RoundingMode.HALF_UP));
        out.put("porJuego", juegosOut);
        out.put("porRareza", rarezasOut);
        out.put("topValiosas", top);
        out.put("ultimaAgregada", items.stream()
                .map(CollectionItem::getCreatedAt)
                .max(Comparator.naturalOrder())
                .map(Object::toString)
                .orElse(null));
        return out;
    }

    // ---------- Export CSV (US-32) ----------

    public String exportCsv(String userId) {
        StringBuilder sb = new StringBuilder();
        sb.append("Nombre,Juego,Rareza,Estado,Fecha de adquisicion,Precio pagado,Notas\n");
        for (CollectionItem i : itemsDe(userId)) {
            sb.append(csv(i.getNombre())).append(',')
              .append(csv(i.getJuego())).append(',')
              .append(csv(i.getRareza())).append(',')
              .append(csv(i.getEstado())).append(',')
              .append(csv(i.getFechaAdquisicion())).append(',')
              .append(i.getPrecioPagado() != null ? i.getPrecioPagado().toPlainString() : "").append(',')
              .append(csv(i.getNotas())).append('\n');
        }
        return sb.toString();
    }

    private static String csv(String v) {
        if (v == null) return "";
        if (v.contains(",") || v.contains("\"") || v.contains("\n")) {
            return '"' + v.replace("\"", "\"\"") + '"';
        }
        return v;
    }

    private static String emptyToNull(String s) {
        return (s == null || s.isBlank()) ? null : s;
    }

    private static String str(Object o) {
        return o == null ? null : String.valueOf(o);
    }
}

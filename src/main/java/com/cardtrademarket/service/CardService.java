package com.cardtrademarket.service;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.FollowRepository;
import com.cardtrademarket.repository.PriceAlertRepository;
import com.cardtrademarket.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Date;

@Service
public class CardService {

    private static final Logger log = LoggerFactory.getLogger(CardService.class);

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PriceAlertRepository priceAlertRepository;

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private NotificationService notificationService;

    @Transactional
    public Card crear(Card card, String vendedorId) {
        User vendedor = userRepository.findById(vendedorId).orElseThrow();
        card.setVendedorId(vendedorId);
        card.setFechaPublicacion(new Date());
        card.setStatus(Card.Status.PUBLICADO);
        return cardRepository.save(card);
    }

    @Transactional
    public Card actualizarPrecio(String cardId, Double nuevoPrecio) {
        Card card = cardRepository.findById(cardId).orElseThrow();
        card.setPrecioAnterior(card.getPrecio());
        card.setPrecio(nuevoPrecio);
        card.setFechaActualizacion(new Date());
        return cardRepository.save(card);
    }

    @Transactional
    public void marcarVendido(String cardId, String compradorId) {
        Card card = cardRepository.findById(cardId).orElseThrow();
        card.setStatus(Card.Status.VENDIDO);
        cardRepository.save(card);
    }

    public List<Card> listarPublicadas() {
        return cardRepository.findByStatus(Card.Status.PUBLICADO);
    }

    public List<Card> listarPorTipo(String tipo) {
        return cardRepository.findByTipoOrderByNombreAsc(tipo);
    }

    public List<Card> listarPorRareza(String rareza) {
        return cardRepository.findByRarityOrderByNombreAsc(rareza);
    }

    public List<Card> buscarPorTipoYRareza(String tipo, String rareza) {
        return cardRepository.findByTipoOrderByNombreAsc(tipo).stream()
                .filter(c -> rareza.equals(c.getRarity()))
                .toList();
    }

    public List<Card> buscarPorPrecio(Double min, Double max) {
        double desde = (min != null) ? min : 0.0;
        double hasta = (max != null) ? max : Double.MAX_VALUE;
        return cardRepository.findByPrecioBetween(desde, hasta);
    }

    public List<Card> buscarPorTexto(String query) {
        return cardRepository.searchByText(query);
    }

    public Optional<Card> obtenerPorId(String id) {
        return cardRepository.findById(id);
    }

    @Transactional
    public void actualizarImagenes(String cardId, List<String> imagenesUrl) {
        Card card = cardRepository.findById(cardId).orElseThrow();
        card.setImagenes(imagenesUrl);
        cardRepository.save(card);
    }

    public List<Card> destacadas() {
        return cardRepository.findTop8ByStatusOrderByFechaPublicacionDesc(Card.Status.PUBLICADO);
    }

    public List<Card> recientes() {
        return cardRepository.findByStatusOrderByFechaPublicacionDesc(Card.Status.PUBLICADO).stream()
                .limit(8)
                .toList();
    }

    public List<Card> buscar(String q) {
        if (q == null || q.isBlank()) return List.of();
        return cardRepository.searchByText(q.trim()).stream()
                .filter(c -> c.getStatus() == Card.Status.PUBLICADO)
                .toList();
    }

    public List<String> sugerencias(String q) {
        if (q == null || q.isBlank()) return List.of();
        return cardRepository.searchByText(q.trim()).stream()
                .filter(c -> c.getStatus() == Card.Status.PUBLICADO)
                .map(Card::getNombre)
                .distinct()
                .limit(8)
                .toList();
    }

    public List<Card> comparar(List<String> ids) {
        if (ids == null || ids.isEmpty()) return List.of();
        return cardRepository.findByIdIn(ids);
    }

    public List<Card> ofertas() {
        java.util.Date ahora = new java.util.Date();
        return cardRepository.findByStatus(Card.Status.PUBLICADO).stream()
                .filter(c -> c.getPrecioOferta() != null && c.getPrecioOferta() < c.getPrecio())
                .filter(c -> c.getOfertaExpira() == null || c.getOfertaExpira().after(ahora))
                .sorted((a, b) -> Double.compare(
                        descuento(b), descuento(a)))
                .toList();
    }

    private double descuento(Card c) {
        if (c.getPrecio() == null || c.getPrecio() <= 0 || c.getPrecioOferta() == null) return 0;
        return (c.getPrecio() - c.getPrecioOferta()) / c.getPrecio();
    }

    public List<Card> filtrar(String q, String game, String rarity, String condition,
                              Double priceMin, Double priceMax, String sort) {
        java.util.stream.Stream<Card> stream =
                cardRepository.findByStatus(Card.Status.PUBLICADO).stream();

        if (q != null && !q.isBlank()) {
            String needle = q.trim().toLowerCase();
            stream = stream.filter(c ->
                    (c.getNombre() != null && c.getNombre().toLowerCase().contains(needle))
                    || (c.getTipo() != null && c.getTipo().toLowerCase().contains(needle))
                    || (c.getEdition() != null && c.getEdition().toLowerCase().contains(needle))
                    || (c.getDescripcion() != null && c.getDescripcion().toLowerCase().contains(needle)));
        }
        if (game != null && !game.isBlank()) {
            String g = game.trim().toLowerCase();
            stream = stream.filter(c -> c.getTipo() != null && c.getTipo().toLowerCase().equals(g));
        }
        if (rarity != null && !rarity.isBlank()) {
            String r = rarity.trim().toLowerCase();
            stream = stream.filter(c -> c.getRarity() != null && c.getRarity().toLowerCase().equals(r));
        }
        if (condition != null && !condition.isBlank()) {
            String cd = condition.trim().toLowerCase();
            stream = stream.filter(c -> c.getCondition() != null && c.getCondition().toLowerCase().equals(cd));
        }
        if (priceMin != null) {
            stream = stream.filter(c -> c.getPrecio() != null && c.getPrecio() >= priceMin);
        }
        if (priceMax != null) {
            stream = stream.filter(c -> c.getPrecio() != null && c.getPrecio() <= priceMax);
        }

        List<Card> result = new java.util.ArrayList<>(stream.toList());
        if (sort != null) {
            switch (sort) {
                case "price_asc" -> result.sort(java.util.Comparator.comparing(Card::getPrecio,
                        java.util.Comparator.nullsLast(java.util.Comparator.naturalOrder())));
                case "price_desc" -> result.sort(java.util.Comparator.comparing(Card::getPrecio,
                        java.util.Comparator.nullsLast(java.util.Comparator.reverseOrder())));
                case "name" -> result.sort(java.util.Comparator.comparing(Card::getNombre,
                        java.util.Comparator.nullsLast(java.util.Comparator.naturalOrder())));
                case "discount" -> result.sort(java.util.Comparator.comparingDouble(
                        c -> -descuento(c)));
                default -> result.sort(java.util.Comparator.comparing(Card::getFechaPublicacion,
                        java.util.Comparator.nullsLast(java.util.Comparator.reverseOrder())));
            }
        } else {
            result.sort(java.util.Comparator.comparing(Card::getFechaPublicacion,
                    java.util.Comparator.nullsLast(java.util.Comparator.reverseOrder())));
        }
        return result;
    }

    public List<java.util.Map<String, Object>> categorias() {
        return cardRepository.findByStatus(Card.Status.PUBLICADO).stream()
                .collect(java.util.stream.Collectors.groupingBy(Card::getTipo))
                .entrySet().stream()
                .map(e -> {
                    java.util.Map<String, Object> m = new java.util.LinkedHashMap<>();
                    m.put("juego", e.getKey());
                    m.put("cantidad", e.getValue().size());
                    return m;
                })
                .sorted((a, b) -> Integer.compare((Integer) b.get("cantidad"), (Integer) a.get("cantidad")))
                .toList();
    }

    // ===== Fase 4: gestión de publicaciones (US-17..22) =====

    public static class ValidacionException extends RuntimeException {
        public ValidacionException(String msg) { super(msg); }
    }

    public static class NoDuenoException extends RuntimeException {
        public NoDuenoException() { super("No eres el dueño de esta publicación"); }
    }

    public Card crearPropia(Card card, String vendedorId) {
        if (card.getNombre() == null || card.getNombre().isBlank()) {
            throw new ValidacionException("El nombre es obligatorio");
        }
        if (card.getTipo() == null || card.getTipo().isBlank()) {
            throw new ValidacionException("El juego es obligatorio");
        }
        if (card.getPrecio() == null || card.getPrecio() <= 0) {
            throw new ValidacionException("El precio debe ser mayor a 0");
        }
        if (card.getImagenes() != null && card.getImagenes().size() > 5) {
            throw new ValidacionException("Máximo 5 fotos por publicación");
        }
        if (card.getImagenes() != null) {
            for (String img : card.getImagenes()) {
                if (img != null && img.length() > 3_500_000) {
                    throw new ValidacionException("Cada foto debe pesar menos de 2.5 MB (imagen demasiado grande)");
                }
            }
        }
        Card creada = crear(card, vendedorId);
        notificarSeguidores(creada);
        return creada;
    }

    // US-36: notificar a los seguidores cuando se publica algo nuevo
    private void notificarSeguidores(Card card) {
        try {
            for (com.cardtrademarket.model.Follow f : followRepository.findByFollowingId(card.getVendedorId())) {
                notificationService.createNotification(
                        f.getFollowerId(),
                        "LISTING_ADDED",
                        "Nueva publicación de tu vendedor seguido",
                        "Se publicó \"" + card.getNombre() + "\" por $" + card.getPrecio(),
                        "/cards/" + card.getId());
            }
        } catch (Exception e) {
            log.warn("No se pudieron notificar seguidores para la carta {}: {}", card.getId(), e.getMessage());
        }
    }

    // US-37: alertas de precio — avisar cuando el precio baja al objetivo
    private void dispararAlertas(Card card) {
        try {
            for (com.cardtrademarket.model.PriceAlert alerta : priceAlertRepository.findByCardIdAndActiveTrue(card.getId())) {
                Double target = alerta.getTargetPrice();
                Double actual = card.getPrecio();
                if (target == null || actual == null || actual > target) continue;
                if (target.equals(alerta.getLastNotifiedPrice())) continue;
                String email = userRepository.findById(alerta.getUserId())
                        .map(User::getEmail)
                        .orElse("?");
                notificationService.createNotification(
                        alerta.getUserId(),
                        "PRICE_DROP",
                        "¡Precio objetivo alcanzado!",
                        "\"" + card.getNombre() + "\" está en $" + actual + " (tu objetivo: $" + target + ")",
                        "/cards/" + card.getId());
                log.info("EMAIL (simulado) -> {}: La carta {} bajó a ${} (objetivo ${})",
                        email, card.getNombre(), actual, target);
                alerta.setLastNotifiedPrice(target);
                priceAlertRepository.save(alerta);
            }
        } catch (Exception e) {
            log.warn("No se pudieron evaluar alertas de precio para la carta {}: {}", card.getId(), e.getMessage());
        }
    }

    public Card propia(String cardId, String vendedorId) {
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new java.util.NoSuchElementException("Publicación no encontrada"));
        if (vendedorId == null || !vendedorId.equals(card.getVendedorId())) {
            throw new NoDuenoException();
        }
        return card;
    }

    public List<Card> misPublicaciones(String vendedorId, String filtro) {
        List<Card> todas = cardRepository.findByVendedorIdOrderByFechaPublicacionDesc(vendedorId);
        if (filtro == null || filtro.isBlank() || filtro.equals("todas")) {
            return todas;
        }
        return switch (filtro) {
            case "activas" -> todas.stream().filter(c -> c.getStatus() == Card.Status.PUBLICADO).toList();
            case "pausadas" -> todas.stream().filter(c -> c.getStatus() == Card.Status.PAUSADO).toList();
            case "vendidas" -> todas.stream().filter(c -> c.getStatus() == Card.Status.VENDIDO).toList();
            default -> todas;
        };
    }

    public Card actualizarDatos(Card card, Card datos) {
        if (datos.getNombre() != null && !datos.getNombre().isBlank()) card.setNombre(datos.getNombre());
        if (datos.getTipo() != null && !datos.getTipo().isBlank()) card.setTipo(datos.getTipo());
        if (datos.getEdition() != null) card.setEdition(datos.getEdition());
        if (datos.getRarity() != null) card.setRarity(datos.getRarity());
        if (datos.getCondition() != null) card.setCondition(datos.getCondition());
        if (datos.getDescripcion() != null) card.setDescripcion(datos.getDescripcion());
        if (datos.getImagenes() != null) {
            if (datos.getImagenes().size() > 5) throw new ValidacionException("Máximo 5 fotos por publicación");
            card.setImagenes(datos.getImagenes());
        }
        if (datos.getPrecio() != null) {
            if (datos.getPrecio() <= 0) throw new ValidacionException("El precio debe ser mayor a 0");
            if (!datos.getPrecio().equals(card.getPrecio())) {
                card.setPrecioAnterior(card.getPrecio());
                card.setPrecio(datos.getPrecio());
            }
        }
        card.setFechaActualizacion(new Date());
        Card guardada = cardRepository.save(card);
        dispararAlertas(guardada);
        return guardada;
    }

    public Card cambiarPrecio(Card card, Double nuevoPrecio) {
        if (nuevoPrecio == null || nuevoPrecio <= 0) {
            throw new ValidacionException("El precio debe ser mayor a 0");
        }
        if (nuevoPrecio.equals(card.getPrecio())) return card;
        card.setPrecioAnterior(card.getPrecio());
        card.setPrecio(nuevoPrecio);
        card.setFechaActualizacion(new Date());
        Card guardada = cardRepository.save(card);
        dispararAlertas(guardada);
        return guardada;
    }

    public Card cambiarEstado(Card card, Card.Status nuevo) {
        card.setStatus(nuevo);
        card.setFechaActualizacion(new Date());
        return cardRepository.save(card);
    }

    public void eliminarPropia(Card card) {
        cardRepository.delete(card);
    }

    @Transactional
    public Card verDetalle(String id) {
        Optional<Card> opt = cardRepository.findById(id);
        if (opt.isEmpty()) return null;
        cardRepository.incrementarVistas(id);
        Card c = opt.get();
        c.setVistas((c.getVistas() == null ? 0 : c.getVistas()) + 1);
        return c;
    }

    public long contarPublicadasDe(String vendedorId) {
        return cardRepository.countByVendedorIdAndStatus(vendedorId, Card.Status.PUBLICADO);
    }

    public long contarVendidasDe(String vendedorId) {
        return cardRepository.countByVendedorIdAndStatus(vendedorId, Card.Status.VENDIDO);
    }
}
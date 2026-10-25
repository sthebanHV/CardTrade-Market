package com.cardtrademarket.service;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Date;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;
    
    @Autowired
    private UserRepository userRepository;

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
}
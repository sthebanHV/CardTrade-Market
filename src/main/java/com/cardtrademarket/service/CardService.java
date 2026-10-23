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
}
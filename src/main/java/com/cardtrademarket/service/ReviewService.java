package com.cardtrademarket.service;

import com.cardtrademarket.model.Review;
import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.ReviewRepository;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    public Review createReview(String userId, String cardId, Integer rating, String comment) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new RuntimeException("Carta no encontrada"));

        // Verificar que el usuario ya tiene esta carta (opcional)
        Review review = new Review(userId, cardId, rating, comment);
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByUser(String userId) {
        return reviewRepository.findByUserId(userId);
    }

    public List<Review> getReviewsByCard(String cardId) {
        return reviewRepository.findByCardId(cardId);
    }
}
package com.cardtrademarket.controller;

import com.cardtrademarket.model.Review;
import com.cardtrademarket.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestParam String userId,
                                                @RequestParam String cardId,
                                                @RequestParam Integer rating,
                                                @RequestParam String comment) {
        Review review = reviewService.createReview(userId, cardId, rating, comment);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable String userId) {
        List<Review> reviews = reviewService.getReviewsByUser(userId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/card/{cardId}")
    public ResponseEntity<List<Review>> getReviewsByCard(@PathVariable String cardId) {
        List<Review> reviews = reviewService.getReviewsByCard(cardId);
        return ResponseEntity.ok(reviews);
    }
}
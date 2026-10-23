package com.cardtrademarket.controller;

import com.cardtrademarket.model.Collection;
import com.cardtrademarket.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/collection")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @PostMapping
    public ResponseEntity<Collection> createCollection(@RequestParam String userId,
                                                       @RequestParam String name,
                                                       @RequestParam String description) {
        Collection collection = collectionService.createCollection(userId, name, description);
        return ResponseEntity.ok(collection);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Collection>> getCollectionsByUser(@PathVariable String userId) {
        List<Collection> collections = collectionService.getCollectionsByUser(userId);
        return ResponseEntity.ok(collections);
    }

    @GetMapping("/{collectionId}")
    public ResponseEntity<Collection> getCollectionById(@PathVariable String collectionId) {
        Collection collection = collectionService.getCollectionById(collectionId);
        return ResponseEntity.ok(collection);
    }

    @PutMapping("/{collectionId}")
    public ResponseEntity<Collection> updateCollection(@PathVariable String collectionId,
                                                       @RequestParam String name,
                                                       @RequestParam String description) {
        Collection collection = collectionService.updateCollection(collectionId, name, description);
        return ResponseEntity.ok(collection);
    }

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<Void> deleteCollection(@PathVariable String collectionId) {
        collectionService.deleteCollection(collectionId);
        return ResponseEntity.noContent().build();
    }
}
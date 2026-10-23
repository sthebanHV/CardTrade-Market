package com.cardtrademarket.service;

import com.cardtrademarket.model.Collection;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.CollectionRepository;
import com.cardtrademarket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private UserRepository userRepository;

    public Collection createCollection(String userId, String name, String description) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Collection collection = new Collection(userId, name, description);
        return collectionRepository.save(collection);
    }

    public List<Collection> getCollectionsByUser(String userId) {
        return collectionRepository.findByUserId(userId);
    }

    public Collection getCollectionById(String collectionId) {
        return collectionRepository.findById(collectionId).orElseThrow(() -> new RuntimeException("Colección no encontrada"));
    }

    public Collection updateCollection(String collectionId, String name, String description) {
        Collection collection = getCollectionById(collectionId);
        collection.setName(name);
        collection.setDescription(description);
        return collectionRepository.save(collection);
    }

    public void deleteCollection(String collectionId) {
        collectionRepository.deleteById(collectionId);
    }
}
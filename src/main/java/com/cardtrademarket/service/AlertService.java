package com.cardtrademarket.service;

import com.cardtrademarket.model.Alert;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.AlertRepository;
import com.cardtrademarket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private UserRepository userRepository;

    public Alert createAlert(String userId, String type, String message, String relatedId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Alert alert = new Alert(userId, type, message, relatedId);
        return alertRepository.save(alert);
    }

    public List<Alert> getAlertsByUser(String userId) {
        return alertRepository.findByUserId(userId);
    }

    public Alert getAlertById(String alertId) {
        return alertRepository.findById(alertId).orElseThrow(() -> new RuntimeException("Alerta no encontrada"));
    }

    public Alert marcarComoLeido(String alertId) {
        Alert alert = getAlertById(alertId);
        alert.setIsRead(true);
        return alertRepository.save(alert);
    }

    public void deleteAlert(String alertId) {
        alertRepository.deleteById(alertId);
    }
}
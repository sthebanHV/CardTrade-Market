package com.cardtrademarket.service;

import com.cardtrademarket.model.Notification;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.NotificationRepository;
import com.cardtrademarket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    public Notification createNotification(String userId, String type, String title, String message, String actionUrl) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Notification notification = new Notification(userId, type, title, message, actionUrl);
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsByUser(String userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Notification getNotificationById(String notificationId) {
        return notificationRepository.findById(notificationId).orElseThrow(() -> new RuntimeException("Notificación no encontrada"));
    }

    public Notification marcarComoLeido(String notificationId) {
        Notification notification = getNotificationById(notificationId);
        notification.setIsRead(true);
        return notificationRepository.save(notification);
    }

    public void deleteNotification(String notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
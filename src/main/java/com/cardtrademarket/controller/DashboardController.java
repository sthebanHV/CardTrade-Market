package com.cardtrademarket.controller;

import com.cardtrademarket.model.CollectionItem;
import com.cardtrademarket.model.Follow;
import com.cardtrademarket.model.Order;
import com.cardtrademarket.model.Review;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.CollectionItemRepository;
import com.cardtrademarket.repository.FollowRepository;
import com.cardtrademarket.repository.MessageRepository;
import com.cardtrademarket.repository.OrderRepository;
import com.cardtrademarket.repository.PriceAlertRepository;
import com.cardtrademarket.repository.FavouriteRepository;
import com.cardtrademarket.repository.ReviewRepository;
import com.cardtrademarket.repository.UserRepository;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.model.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private FavouriteRepository favouriteRepository;

    @Autowired
    private PriceAlertRepository priceAlertRepository;

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private CollectionItemRepository collectionItemRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    private boolean delMes(LocalDateTime fecha) {
        return fecha != null && YearMonth.from(fecha).equals(YearMonth.now());
    }

    @GetMapping("/stats")
    public ResponseEntity<?> stats() {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }

        List<Order> compras = orderRepository.findByUserIdOrderByCreatedAtDesc(u.getId());
        List<Order> ventas = orderRepository.findByVendedorId(u.getId());

        long comprasMes = compras.stream().filter(o -> delMes(o.getCreatedAt())).count();
        double comprasMesMonto = compras.stream()
                .filter(o -> delMes(o.getCreatedAt()) && !"CANCELLED".equals(o.getStatus()))
                .mapToDouble(o -> o.getTotal() == null ? 0 : o.getTotal()).sum();

        long ventasMes = ventas.stream().filter(o -> delMes(o.getCreatedAt())).count();
        double ventasMesMonto = 0;
        double ventasTotalMonto = 0;
        for (Order o : ventas) {
            if ("CANCELLED".equals(o.getStatus()) || o.getItems() == null) {
                continue;
            }
            for (var item : o.getItems()) {
                if (u.getId().equals(item.getVendedorId())) {
                    double p = item.getPrecioUnitario() == null ? 0 : item.getPrecioUnitario();
                    ventasTotalMonto += p;
                    if (delMes(o.getCreatedAt())) {
                        ventasMesMonto += p;
                    }
                }
            }
        }

        long publicacionesActivas = cardRepository.countByVendedorIdAndStatus(u.getId(), Card.Status.PUBLICADO);
        long ventasTotal = ventas.size();
        long favoritos = favouriteRepository.findByUserId(u.getId()).size();
        long alertas = priceAlertRepository.findByUserIdOrderByCreatedAtDesc(u.getId()).size();
        long seguidos = followRepository.countByFollowerId(u.getId());
        long seguidores = followRepository.countByFollowingId(u.getId());
        long mensajesSinLeer = messageRepository.noLeidosDe(u.getId());

        List<CollectionItem> itemsColeccion = collectionItemRepository.findByUserIdOrderByCreatedAtDesc(u.getId());
        double valorColeccion = itemsColeccion.stream()
                .mapToDouble(i -> i.getPrecioPagado() == null ? 0 : i.getPrecioPagado().doubleValue()).sum();

        List<Review> miasReviews = reviewRepository.findByUserId(u.getId());
        List<Review> recibidas = reviewRepository.findBySellerIdOrderByCreatedAtDesc(u.getId());
        double ratingPromedio = recibidas.stream().mapToInt(Review::getRating).average().orElse(0);

        boolean vendedorVerificado = ventasTotal > 0;
        boolean coleccionista = itemsColeccion.size() >= 5;

        Map<String, Object> perspectivas = new LinkedHashMap<>();
        perspectivas.put("VENDEDOR", publicacionesActivas > 0 || ventasTotal > 0);
        perspectivas.put("VENDEDOR_VERIFICADO", vendedorVerificado);
        perspectivas.put("COLECCIONISTA", coleccionista);
        perspectivas.put("COMPRADOR", !compras.isEmpty());

        Map<String, Object> out = new LinkedHashMap<>();
        Map<String, Object> vm = new LinkedHashMap<>();
        vm.put("cantidad", ventasMes);
        vm.put("monto", ventasMesMonto);
        out.put("ventasMes", vm);
        Map<String, Object> cm = new LinkedHashMap<>();
        cm.put("cantidad", comprasMes);
        cm.put("monto", comprasMesMonto);
        out.put("comprasMes", cm);
        out.put("ventasTotal", ventasTotal);
        out.put("ventasTotalMonto", ventasTotalMonto);
        out.put("comprasTotal", compras.size());
        out.put("publicacionesActivas", publicacionesActivas);
        out.put("favoritos", favoritos);
        out.put("alertasPrecio", alertas);
        out.put("seguidos", seguidos);
        out.put("seguidores", seguidores);
        out.put("mensajesSinLeer", mensajesSinLeer);
        out.put("valorColeccion", valorColeccion);
        out.put("itemsColeccion", itemsColeccion.size());
        out.put("reseñas", Map.of(
                "recibidas", recibidas.size(),
                "promedio", Math.round(ratingPromedio * 10.0) / 10.0,
                "dadas", miasReviews.size()));
        out.put("ratingPromedio", Math.round(ratingPromedio * 10.0) / 10.0);
        out.put("perspectivas", perspectivas);
        return ResponseEntity.ok(out);
    }

    @GetMapping("/activity")
    public ResponseEntity<?> actividad() {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        List<Map<String, Object>> eventos = new ArrayList<>();

        for (Order o : orderRepository.findByUserIdOrderByCreatedAtDesc(u.getId())) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("tipo", "COMPRA");
            m.put("texto", "Compraste " + (o.getItems() != null && !o.getItems().isEmpty()
                    ? o.getItems().size() + " carta(s)" : "un pedido")
                    + " \u00b7 " + o.getNumeroOrden());
            m.put("fecha", o.getCreatedAt());
            m.put("url", "/my-purchases/" + o.getId());
            eventos.add(m);
        }

        for (Order o : orderRepository.findByVendedorId(u.getId())) {
            if (o.getItems() == null) {
                continue;
            }
            for (var item : o.getItems()) {
                if (!u.getId().equals(item.getVendedorId())) {
                    continue;
                }
                Map<String, Object> m = new LinkedHashMap<>();
                m.put("tipo", "VENTA");
                m.put("texto", "Vendiste " + item.getNombre());
                m.put("fecha", o.getCreatedAt());
                m.put("url", "/my-sales");
                eventos.add(m);
            }
        }

        for (Review r : reviewRepository.findBySellerIdOrderByCreatedAtDesc(u.getId())) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("tipo", "RESE\u00d1A");
            userRepository.findById(r.getUserId()).ifPresent(autor ->
                    m.put("texto", autor.getUsername() + " te calific\u00f3 con " + r.getRating() + " estrella(s)"
                            + (r.getComment() != null && !r.getComment().isBlank()
                            ? ": \u201c" + r.getComment() + "\u201d" : "")));
            if (!m.containsKey("texto")) {
                m.put("texto", "Recibiste una rese\u00f1a de " + r.getRating() + " estrella(s)");
            }
            m.put("fecha", r.getCreatedAt());
            m.put("url", "/profile");
            eventos.add(m);
        }

        List<Follow> seguidores = followRepository.findByFollowingId(u.getId());
        for (int i = 0; i < Math.min(5, seguidores.size()); i++) {
            Follow f = seguidores.get(i);
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("tipo", "SEGUIDOR");
            userRepository.findById(f.getFollowerId()).ifPresent(seguidor ->
                    m.put("texto", seguidor.getUsername() + " come\u00f3 de seguirte"));
            if (!m.containsKey("texto")) {
                m.put("texto", "Nuevo seguidor");
            }
            m.put("fecha", f.getFecha() == null ? null
                    : f.getFecha().toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDateTime());
            m.put("url", "/my-followed");
            eventos.add(m);
        }

        eventos.sort(Comparator.comparing((Map<String, Object> m) -> m.get("fecha") == null
                ? LocalDateTime.MIN : (LocalDateTime) m.get("fecha")).reversed());
        List<Map<String, Object>> top = eventos.subList(0, Math.min(12, eventos.size()));
        return ResponseEntity.ok(top);
    }
}

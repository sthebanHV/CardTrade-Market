package com.cardtrademarket.controller;

import com.cardtrademarket.model.AuditLog;
import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.Order;
import com.cardtrademarket.model.Report;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.AuditLogRepository;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.OrderRepository;
import com.cardtrademarket.repository.ReportRepository;
import com.cardtrademarket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private static final String[] ROLES = {"ROLE_USER", "ROLE_ADMIN"};
    private static final String[] ESTADOS_USUARIO = {"ACTIVO", "SUSPENDIDO"};
    private static final String[] ESTADOS_REPORTE = {"DESCARTADO", "OCULTO", "SUSPENDIDO", "RESUELTO"};

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    private Map<String, Object> resumenUsuario(User u) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", u.getId());
        m.put("username", u.getUsername());
        m.put("nombre", u.getNombre());
        m.put("email", u.getEmail());
        m.put("role", u.getRole());
        m.put("status", u.getStatus() == null ? "ACTIVO" : u.getStatus());
        m.put("fechaCreacion", u.getFechaCreacion());
        m.put("emailVerified", u.isEmailVerified());
        m.put("publicacionesActivas", cardRepository.countByVendedorIdAndStatus(u.getId(), Card.Status.PUBLICADO));
        return m;
    }

    private void auditar(User admin, String accion, String tipo, String objetivoId, String detalle) {
        auditLogRepository.save(new AuditLog(admin.getId(), admin.getUsername(), accion, tipo, objetivoId, detalle));
    }

    // ---------- US-47: usuarios ----------

    @GetMapping("/users")
    public ResponseEntity<?> usuarios(@RequestParam(defaultValue = "") String q,
                                      @RequestParam(required = false) String rol,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size) {
        if (usuarioActual() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        String busqueda = q == null ? "" : q.trim().toLowerCase();
        List<User> todos = new ArrayList<>(userRepository.findAll());
        todos.sort(Comparator.comparing(User::getFechaCreacion,
                Comparator.nullsLast(Comparator.reverseOrder())));
        List<User> filtrados = new ArrayList<>();
        for (User u : todos) {
            boolean coincideQ = busqueda.isEmpty()
                    || (u.getUsername() != null && u.getUsername().toLowerCase().contains(busqueda))
                    || (u.getNombre() != null && u.getNombre().toLowerCase().contains(busqueda))
                    || (u.getEmail() != null && u.getEmail().toLowerCase().contains(busqueda));
            boolean coincideRol = rol == null || rol.isEmpty() || rol.equals(u.getRole());
            if (coincideQ && coincideRol) {
                filtrados.add(u);
            }
        }
        int desde = Math.min(page * size, filtrados.size());
        int hasta = Math.min(desde + size, filtrados.size());
        List<Map<String, Object>> items = new ArrayList<>();
        for (User u : filtrados.subList(desde, hasta)) {
            items.add(resumenUsuario(u));
        }
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("total", filtrados.size());
        out.put("page", page);
        out.put("size", size);
        out.put("items", items);
        return ResponseEntity.ok(out);
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> cambiarRol(@PathVariable String id, @RequestBody Map<String, String> body) {
        User admin = usuarioActual();
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        String rol = body.get("role");
        boolean valido = false;
        for (String r : ROLES) {
            if (r.equals(rol)) {
                valido = true;
            }
        }
        if (!valido) {
            return ResponseEntity.badRequest().body(Map.of("error", "Rol inv\u00e1lido"));
        }
        if (id.equals(admin.getId())) {
            return ResponseEntity.badRequest().body(Map.of("error", "No puedes modificar tu propio rol"));
        }
        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Usuario no encontrado"));
        }
        User objetivo = opt.get();
        String anterior = objetivo.getRole();
        objetivo.setRole(rol);
        userRepository.save(objetivo);
        auditar(admin, "CAMBIAR_ROL", "USER", id,
                "Rol de " + objetivo.getUsername() + ": " + anterior + " \u2192 " + rol);
        return ResponseEntity.ok(resumenUsuario(objetivo));
    }

    @PutMapping("/users/{id}/status")
    public ResponseEntity<?> cambiarStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        User admin = usuarioActual();
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        String status = body.get("status");
        boolean valido = false;
        for (String s : ESTADOS_USUARIO) {
            if (s.equals(status)) {
                valido = true;
            }
        }
        if (!valido) {
            return ResponseEntity.badRequest().body(Map.of("error", "Estado inv\u00e1lido"));
        }
        if (id.equals(admin.getId())) {
            return ResponseEntity.badRequest().body(Map.of("error", "No puedes modificar tu propio estado"));
        }
        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Usuario no encontrado"));
        }
        User objetivo = opt.get();
        objetivo.setStatus(status);
        userRepository.save(objetivo);
        auditar(admin, "SUSPENDIDO".equals(status) ? "SUSPENDER_USUARIO" : "REACTIVAR_USUARIO",
                "USER", id, "Usuario " + objetivo.getUsername() + " \u2192 " + status);
        return ResponseEntity.ok(resumenUsuario(objetivo));
    }

    // ---------- US-47: reportes ----------

    @GetMapping("/reports")
    public ResponseEntity<?> reportes(@RequestParam(required = false) String estado) {
        if (usuarioActual() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        List<Report> base = (estado == null || estado.isEmpty())
                ? reportRepository.findAllByOrderByFechaDesc()
                : reportRepository.findByEstadoOrderByFechaDesc(estado);
        List<Map<String, Object>> out = new ArrayList<>();
        for (Report r : base) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", r.getId());
            m.put("cardId", r.getCardId());
            m.put("motivo", r.getMotivo());
            m.put("detalles", r.getDetalles());
            m.put("fecha", r.getFecha());
            m.put("estado", r.getEstado() == null ? "PENDIENTE" : r.getEstado());
            m.put("fechaResolucion", r.getFechaResolucion());
            m.put("notaResolucion", r.getNotaResolucion());
            cardRepository.findById(r.getCardId()).ifPresent(c -> {
                Map<String, Object> cm = new LinkedHashMap<>();
                cm.put("id", c.getId());
                cm.put("nombre", c.getNombre());
                cm.put("vendedorId", c.getVendedorId());
                cm.put("status", c.getStatus() == null ? null : c.getStatus().name());
                m.put("card", cm);
            });
            out.add(m);
        }
        return ResponseEntity.ok(out);
    }

    @PostMapping("/reports/{id}/resolve")
    public ResponseEntity<?> resolverReporte(@PathVariable String id, @RequestBody Map<String, String> body) {
        User admin = usuarioActual();
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        String estado = body.get("estado");
        boolean valido = false;
        for (String e : ESTADOS_REPORTE) {
            if (e.equals(estado)) {
                valido = true;
            }
        }
        if (!valido) {
            return ResponseEntity.badRequest().body(Map.of("error", "Estado inv\u00e1lido"));
        }
        Optional<Report> opt = reportRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Reporte no encontrado"));
        }
        Report r = opt.get();
        if (r.getEstado() != null && !"PENDIENTE".equals(r.getEstado())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "El reporte ya fue resuelto"));
        }
        r.setEstado(estado);
        r.setFechaResolucion(new Date());
        r.setAdminId(admin.getId());
        r.setNotaResolucion(body.get("nota"));
        reportRepository.save(r);

        Optional<Card> card = cardRepository.findById(r.getCardId());
        String detalle = "Reporte " + r.getMotivo() + " \u2192 " + estado;
        if (card.isPresent()) {
            Card c = card.get();
            if ("OCULTO".equals(estado)) {
                c.setStatus(Card.Status.PAUSADO);
                cardRepository.save(c);
                detalle += " (carta " + c.getNombre() + " pausada)";
            }
            if ("SUSPENDIDO".equals(estado)) {
                userRepository.findById(c.getVendedorId()).ifPresent(v -> {
                    v.setStatus("SUSPENDIDO");
                    userRepository.save(v);
                });
                detalle += " (vendedor suspendido)";
            }
        }
        auditar(admin, "RESOLVER_REPORTE", "REPORT", id, detalle);
        return ResponseEntity.ok(Map.of("ok", true, "estado", estado));
    }

    // ---------- US-47: estadísticas ----------

    @GetMapping("/stats")
    public ResponseEntity<?> stats() {
        if (usuarioActual() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        List<User> users = userRepository.findAll();
        List<Card> cards = cardRepository.findAll();
        List<Order> orders = orderRepository.findAll();

        LocalDate hoy = LocalDate.now();
        LocalDate limite30 = hoy.minusDays(30);
        Date limite30Date = Date.from(limite30.atStartOfDay(ZoneId.systemDefault()).toInstant());

        long usuariosNuevos30 = users.stream()
                .filter(u -> u.getFechaCreacion() != null && u.getFechaCreacion().after(limite30Date))
                .count();
        long cartasPublicadas = cards.stream().filter(c -> c.getStatus() == Card.Status.PUBLICADO).count();
        long cartasVendidas = cards.stream().filter(c -> c.getStatus() == Card.Status.VENDIDO).count();
        long reportesPendientes = reportRepository.findAll().stream()
                .filter(r -> r.getEstado() == null || "PENDIENTE".equals(r.getEstado()))
                .count();

        double ingresos = 0;
        long ordenesValidas = 0;
        Map<String, Double[]> porDia = new LinkedHashMap<>(); // [count, monto]
        for (int i = 29; i >= 0; i--) {
            porDia.put(hoy.minusDays(i).toString(), new Double[]{0.0, 0.0});
        }
        Map<String, double[]> porVendedor = new HashMap<>(); // [count, monto]
        for (Order o : orders) {
            if ("CANCELLED".equals(o.getStatus())) {
                continue;
            }
            ordenesValidas++;
            double total = o.getTotal() == null ? 0 : o.getTotal();
            ingresos += total;
            if (o.getCreatedAt() != null) {
                LocalDate d = o.getCreatedAt().toLocalDate();
                if (!d.isBefore(limite30)) {
                    Double[] acum = porDia.get(d.toString());
                    if (acum != null) {
                        acum[0] = acum[0] + 1;
                        acum[1] = acum[1] + total;
                    }
                }
            }
            if (o.getItems() != null) {
                for (var item : o.getItems()) {
                    if (item.getVendedorId() != null) {
                        porVendedor.computeIfAbsent(item.getVendedorId(), k -> new double[]{0, 0});
                        double[] acum = porVendedor.get(item.getVendedorId());
                        acum[0] += 1;
                        acum[1] += item.getPrecioUnitario() == null ? 0 : item.getPrecioUnitario();
                    }
                }
            }
        }

        List<Map<String, Object>> serie = new ArrayList<>();
        for (var e : porDia.entrySet()) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("fecha", e.getKey());
            m.put("ventas", e.getValue()[0].intValue());
            m.put("ingresos", e.getValue()[1]);
            serie.add(m);
        }

        Map<String, Long> porJuego = new LinkedHashMap<>();
        for (Card c : cards) {
            String juego = c.getTipo() == null ? "Otro" : c.getTipo();
            porJuego.merge(juego, 1L, Long::sum);
        }
        List<Map<String, Object>> topJuegos = new ArrayList<>();
        porJuego.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .forEach(e -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("juego", e.getKey());
                    m.put("cantidad", e.getValue());
                    topJuegos.add(m);
                });

        List<Map<String, Object>> topVendedores = new ArrayList<>();
        porVendedor.entrySet().stream()
                .sorted((a, b) -> Double.compare(b.getValue()[1], a.getValue()[1]))
                .limit(5)
                .forEach(e -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    userRepository.findById(e.getKey()).ifPresent(v -> {
                        m.put("username", v.getUsername());
                        m.put("nombre", v.getNombre());
                        m.put("ventas", (long) e.getValue()[0]);
                        m.put("monto", e.getValue()[1]);
                    });
                    if (m.containsKey("username")) {
                        topVendedores.add(m);
                    }
                });

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("usuarios", users.size());
        out.put("usuariosNuevos30d", usuariosNuevos30);
        out.put("usuariosSuspendidos", users.stream()
                .filter(u -> "SUSPENDIDO".equals(u.getStatus())).count());
        out.put("cartasPublicadas", cartasPublicadas);
        out.put("cartasVendidas", cartasVendidas);
        out.put("cartasTotal", cards.size());
        out.put("ordenes", ordenesValidas);
        out.put("ingresos", ingresos);
        out.put("reportesPendientes", reportesPendientes);
        out.put("serie30d", serie);
        out.put("topJuegos", topJuegos);
        out.put("topVendedores", topVendedores);
        return ResponseEntity.ok(out);
    }

    // ---------- US-47: auditoría ----------

    @GetMapping("/audit")
    public ResponseEntity<?> auditoria() {
        if (usuarioActual() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        return ResponseEntity.ok(auditLogRepository.findTop100ByOrderByFechaDesc());
    }
}

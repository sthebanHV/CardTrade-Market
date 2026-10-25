package com.cardtrademarket.controller;

import com.cardtrademarket.model.Address;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.AddressRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/** US-26: direcciones de envío (máximo 5 por usuario). */
@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private static final int MAXIMO = 5;

    private final AddressRepository addressRepository;

    public AddressController(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    private ResponseEntity<Map<String, String>> error(int status, String msg) {
        return ResponseEntity.status(status).body(Map.of("error", msg));
    }

    private boolean validar(Address a) {
        if (a.getNombreCompleto() == null || a.getNombreCompleto().isBlank()
                || a.getLinea1() == null || a.getLinea1().isBlank()
                || a.getCiudad() == null || a.getCiudad().isBlank()
                || a.getEstado() == null || a.getEstado().isBlank()
                || a.getCodigoPostal() == null || a.getCodigoPostal().isBlank()) {
            return false;
        }
        return true;
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        User u = usuarioActual();
        if (u == null) return error(401, "Debes iniciar sesión");
        List<Address> dirs = addressRepository.findByUserIdOrderByPredeterminadaDescCreatedAtDesc(u.getId());
        return ResponseEntity.ok(dirs);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> crear(@RequestBody Address addr) {
        User u = usuarioActual();
        if (u == null) return error(401, "Debes iniciar sesión");
        if (!validar(addr)) return error(400, "Dirección incompleta: nombre, línea 1, ciudad, estado y CP son obligatorios");
        if (addressRepository.countByUserId(u.getId()) >= MAXIMO) {
            return error(400, "Puedes guardar máximo " + MAXIMO + " direcciones");
        }
        addr.setId(null);
        addr.setUserId(u.getId());
        if (addr.isPredeterminada()) {
            desmarcarPredeterminadas(u.getId());
        } else if (addressRepository.countByUserId(u.getId()) == 0) {
            addr.setPredeterminada(true);
        }
        return ResponseEntity.status(201).body(addressRepository.save(addr));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable String id, @RequestBody Address datos) {
        User u = usuarioActual();
        if (u == null) return error(401, "Debes iniciar sesión");
        Address propia = addressRepository.findById(id).orElse(null);
        if (propia == null || !u.getId().equals(propia.getUserId())) return error(404, "Dirección no encontrada");
        if (!validar(datos)) return error(400, "Dirección incompleta: nombre, línea 1, ciudad, estado y CP son obligatorios");
        propia.setNombreCompleto(datos.getNombreCompleto());
        propia.setLinea1(datos.getLinea1());
        propia.setLinea2(datos.getLinea2());
        propia.setCiudad(datos.getCiudad());
        propia.setEstado(datos.getEstado());
        propia.setCodigoPostal(datos.getCodigoPostal());
        propia.setTelefono(datos.getTelefono());
        if (datos.isPredeterminada() && !propia.isPredeterminada()) {
            desmarcarPredeterminadas(u.getId());
            propia.setPredeterminada(true);
        } else if (!datos.isPredeterminada()) {
            propia.setPredeterminada(false);
        }
        return ResponseEntity.ok(addressRepository.save(propia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable String id) {
        User u = usuarioActual();
        if (u == null) return error(401, "Debes iniciar sesión");
        Address propia = addressRepository.findById(id).orElse(null);
        if (propia == null || !u.getId().equals(propia.getUserId())) return error(404, "Dirección no encontrada");
        addressRepository.delete(propia);
        return ResponseEntity.ok(Map.of("ok", "Dirección eliminada"));
    }

    @PatchMapping("/{id}/default")
    @Transactional
    public ResponseEntity<?> marcarPredeterminada(@PathVariable String id) {
        User u = usuarioActual();
        if (u == null) return error(401, "Debes iniciar sesión");
        Address propia = addressRepository.findById(id).orElse(null);
        if (propia == null || !u.getId().equals(propia.getUserId())) return error(404, "Dirección no encontrada");
        desmarcarPredeterminadas(u.getId());
        propia.setPredeterminada(true);
        return ResponseEntity.ok(addressRepository.save(propia));
    }

    private void desmarcarPredeterminadas(String userId) {
        for (Address a : addressRepository.findByUserId(userId)) {
            if (a.isPredeterminada()) {
                a.setPredeterminada(false);
                addressRepository.save(a);
            }
        }
    }
}

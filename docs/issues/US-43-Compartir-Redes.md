# [US-43] Compartir en Redes

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Redes sociales disponibles
- **Valocious**: Ayuda a promocionar publicaciones
- **Estimable**: 3 puntos de esfuerzo
- **Pequeño**: Implementación simple
- **Testable**: Verificar que el enlace se genera correctamente

---

## Historia de Usuario

**Como** vendedor,
**quiero** compartir cartas en redes sociales para promocionarlas,
**para** llegar a más compradores potenciales.

---

## Criterios de Aceptación

1. Botón "Compartir" en cada publicación
2. Opciones: Facebook, Twitter, WhatsApp, Copiar enlace
3. Generar preview con imagen y título de la carta
4. Copiar enlace al portapapeles con confirmación

---

## Wireframe

### Botón de Compartir

```
+----------------------------------------------------------+
|  +------+  Charizard ex Full ART                        |
|  |      |  $45.00 USD                                   |
|  | [img]|  [Compartir 📤] [♥ Favorito]                 |
|  +------+                                               |
+----------------------------------------------------------+
```

### Modal de Compartir

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  📤 COMpartir Carta                                 | |
|  |                                                     | |
|  |  Compartir "Charizard ex Full ART" en:              | |
|  |                                                     | |
|  |  [📘 Facebook]  [🐦 Twitter]  [💬 WhatsApp]         | |
|  |                                                     | |
|  |  O copiar enlace:                                   | |
|  |  +-----------------------------------------------+  | |
|  |  |  https://cardtrade.market/cards/12345          |  | |
|  |  +-----------------------------------------------+  | |
|  |  [📋 Copiar Enlace]                                 | |
|  |                                                     | |
|  |  [Cerrar]                                           | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/cards/:id`
- **Componentes**: `ShareButton`, `ShareModal`
- **Endpoints**: No requiere endpoints (generación client-side)
- **Meta tags**: Implementar Open Graph para previews
- **Librerías**: `react-share` o similar

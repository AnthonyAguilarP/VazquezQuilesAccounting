# Animaciones en VazquezQuilesAccounting

Este proyecto utiliza **Astro View Transitions** y **Motion** para crear animaciones suaves y profesionales.

## Características Implementadas

### 1. View Transitions (Transiciones entre páginas)
Las transiciones entre páginas se activan automáticamente gracias a `<ViewTransitions />` en el Layout.

**Efectos aplicados:**
- Fade in/out suave
- Escala (zoom) durante la transición
- Deslizamiento lateral en secciones hero
- La barra de navegación persiste sin animación (`transition:persist`)

### 2. Motion Animations (Animaciones dentro de página)
Componente `AnimatedSection` que anima elementos cuando aparecen en el viewport.

**Tipos de animaciones disponibles:**
- `fade` - Aparece gradualmente
- `slide-up` - Se desliza desde abajo
- `slide-left` - Se desliza desde la derecha
- `slide-right` - Se desliza desde la izquierda
- `zoom` - Escala desde pequeño
- `rotate` - Rota mientras aparece

## Cómo Usar AnimatedSection

```astro
---
import AnimatedSection from '../components/AnimatedSection.astro';
---

<!-- Fade simple -->
<AnimatedSection animation="fade">
  <h1>Mi título</h1>
</AnimatedSection>

<!-- Slide up con delay -->
<AnimatedSection animation="slide-up" delay={0.3}>
  <p>Contenido que aparece después</p>
</AnimatedSection>

<!-- Zoom con clase personalizada -->
<AnimatedSection animation="zoom" delay={0.5} class="my-custom-class">
  <div>Contenido con clase adicional</div>
</AnimatedSection>
```

## Props de AnimatedSection

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `animation` | string | `'fade'` | Tipo de animación (fade, slide-up, slide-left, slide-right, zoom, rotate) |
| `delay` | number | `0` | Delay en segundos antes de iniciar |
| `class` | string | `''` | Clases CSS adicionales |

## Ejemplos Implementados

### Página de Servicios
- Hero con fade y slide-up
- Tarjetas de servicios con zoom escalonado
- CTA con slide-up

### Página de Contacto
- Hero con fade y slide-up
- Formulario con slide-right
- Información de contacto con slide-left

## Personalización

### Cambiar duración de animaciones
Edita `src/components/AnimatedSection.astro`:
```typescript
duration: 0.8, // Cambiar este valor (en segundos)
```

### Agregar nuevos tipos de animación
Agrega al objeto `animations` en `AnimatedSection.astro`:
```typescript
const animations = {
  'mi-animacion': {
    opacity: [0, 1],
    transform: ['rotate(180deg)', 'rotate(0)'],
  },
};
```

### Modificar transiciones entre páginas
Edita `src/styles/global.css` en las secciones:
- `::view-transition-old(root)`
- `::view-transition-new(root)`

## Compatibilidad
- ✅ Chrome 111+
- ✅ Edge 111+
- ✅ Safari 18+
- ⚠️ Firefox (fallback sin animación)

## Performance
- Todas las animaciones usan `transform` y `opacity` (GPU-accelerated)
- InView detection optimizado con Motion
- Animaciones solo se ejecutan cuando los elementos son visibles

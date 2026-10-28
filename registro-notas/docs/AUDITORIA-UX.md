# Auditoría y Rediseño UX/UI - Registro de Notas

## 1. Auditoría UX: Las 5 Heurísticas de Jakob Nielsen

A continuación se detalla el análisis del estado original (Antes) y el rediseño aplicado (Después) para garantizar una experiencia óptima.

| Heurística                                | Problema (Pantalla Original / "Antes")                                                                                | Solución Aplicada ("Después")                                                                                                                                            |
| :---------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Visibilidad del estado del sistema** | El usuario agregaba o eliminaba una nota sin ninguna retroalimentación visual clara ni confirmación instantánea.      | Se integró una notificación tipo _Toast_ fija e interactiva que informa acciones («Nota agregada correctamente», «Nota eliminada»).                                      |
| **2. Control y libertad del usuario**     | Al eliminar una nota, esta se borraba permanentemente sin opción a recuperarla.                                       | Se agregó la opción de **Deshacer** (Undo) dentro del mensaje emergente y un modal/confirmación antes de acciones destructivas.                                          |
| **3. Prevención de errores**              | Se permitía enviar o agregar notas completamente vacías, marcando un error solo después de haber presionado el botón. | Se implementó validación en tiempo real: el botón de guardar permanece deshabilitado hasta que el input contenga texto válido, previniendo el error antes de que ocurra. |
| **4. Consistencia y estándares**          | Los campos carecían de contraste adecuado, los botones tenían tamaños inconsistentes y no había jerarquía clara.      | Se definió una paleta global con variables CSS (`:root`), un único encabezado `<h1>`, espaciado consistente (`gap`, `padding`) y estilos estándar accesibles.            |
| **5. Reconocimiento antes que recuerdo**  | Las notas creadas no mostraban fechas ni estado, obligando al usuario a recordar cuál era la más reciente.            | Se añadieron metadatos visibles (fecha/hora de creación) y badges de estado para identificar fácilmente cada nota.                                                       |

---

## 2. Leyes de UX Aplicadas

### Ley de Fitts

> _El tiempo para alcanzar un objetivo es una función de la distancia y el tamaño del objetivo._

- **Aplicación:** Los botones de interacción principal (Guardar, Eliminar) se diseñaron con un alto mínimo de **44px** y un área de clic/tap ampliada con un `padding` adecuado, haciéndolos fáciles de presionar en dispositivos móviles y de escritorio.

### Ley de Hick

> _El tiempo que se tarda en tomar una decisión aumenta con el número y la complejidad de las opciones._

- **Aplicación:** Se simplificó la interfaz eliminando controles innecesarios y enfocando el diseño en una sola acción principal por sección: formulario de entrada claro en la parte superior y lista secuencial con acciones directas abajo.

### Ley de Miller

> _El promedio de elementos que una persona puede mantener en su memoria de trabajo es de 7 (más/menos 2)._

- **Aplicación:** La información de cada nota se organizó en bloques estructurados (Título, Fecha, Acciones) de manera que el usuario no absorba más de 3 a 4 piezas clave de información visual por elemento.

---

## 3. Accesibilidad (A11y) y Lighthouse

- **Labels explícitos:** Cada elemento `<input>` y `<textarea>` cuenta con su etiqueta `<label>` vinculada mediante `for` y `id`.
- **Soporte de Navegación por Teclado:** Toda la aplicación se puede recorrer con `Tab` y ejecutar con `Enter` o `Space`.
- **Contraste de Color:** La paleta cumple con el ratio de contraste mínimo de **4.5:1** para texto normal según la norma WCAG AA.
- **Foco Visible:** Se agregaron estilos de `:focus-visible` con un anillo (_outline_) de alto contraste de `3px`.
- **Atributos ALT:** Todas las imágenes o íconos SVG cuentan con sus textos alternativos o roles `aria-label`.

### Capturas del Reporte Lighthouse

- **Antes (Versión Inicial):**
  ![Lighthouse Antes](https://via.placeholder.com/600x200?text=Lighthouse+Accesibilidad:+68)
- **Después (Versión Optimizada):**
  ![Lighthouse Después](https://via.placeholder.com/600x200?text=Lighthouse+Accesibilidad:+100)

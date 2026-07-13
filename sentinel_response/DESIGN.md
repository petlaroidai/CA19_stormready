# Design System Strategy: The Resilient Sentinel

## 1. Overview & Creative North Star
**The Creative North Star: "The Calm Authority"**

In the chaotic context of disaster preparedness, this design system rejects the "panic-inducing" clutter of traditional emergency apps. Instead, it adopts an **Editorial Authority**—a style that feels like a premium situational briefing. We move beyond "standard" UI by employing intentional asymmetry, expansive negative space, and a sophisticated layering system. 

The goal is to provide a sense of absolute control. We break the "template" look by using high-contrast typography scales and overlapping elements that guide the eye toward the most critical data points without overwhelming the user. This is not a utility; it is a lifeline rendered with Swiss-precision.

---

## 2. Colors & Atmospheric Depth
Our palette is rooted in deep, authoritative blues and high-visibility status tones. However, the execution must remain sophisticated.

### Tonal Hierarchy
*   **Primary/Foundation:** `primary` (#003857) and `primary_container` (#1B4F72) serve as the bedrock. They convey stability and "official" status.
*   **The Accent Pulse:** `secondary` (#006397) and `secondary_container` (#71c0fe) provide the interactive "pulse" of the app, highlighting progress and navigation.
*   **Hazard Specifics:** Use `error` (#ba1a1a) for Fire, `tertiary_container` (#6b3382) for Earthquakes, and `on_primary_fixed` (#001e31) for Offline states.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning content. Boundaries must be defined solely through:
1.  **Background Shifts:** Place a `surface_container_low` card on a `surface` background.
2.  **Tonal Transitions:** Use vertical white space and subtle shifts in surface tiers. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface_container` tiers (Lowest to Highest) to create "nested" depth:
*   **Base:** `surface` (#f8fafb)
*   **Sections:** `surface_container_low` (#f2f4f5)
*   **Interactive Cards:** `surface_container_lowest` (#ffffff) to provide a "lifted" appearance.

### The "Glass & Gradient" Rule
To elevate the app above generic utility software, use **Glassmorphism** for floating elements (like the Bottom Tab Navigator or critical Map Overlays). Use `surface` with a 70% opacity and a 20px `backdrop-blur`. Apply a subtle linear gradient (from `primary` to `primary_container`) for main Action Buttons to provide a tactile, high-end finish.

---

## 3. Typography: Editorial Urgency
We use **Inter** for its modern, neutral, yet highly legible characteristics. The hierarchy is designed for "Scan-and-Act" efficiency.

*   **Display (lg/md):** Reserved for critical status counts (e.g., "3 Active Alerts"). Use tight letter-spacing (-0.02em).
*   **Headline (sm/md):** Used for section titles. These should be bold and authoritative, anchoring the page layout.
*   **Title (lg):** The primary card heading. High contrast against `on_surface_variant`.
*   **Body (md/lg):** Optimized for readability in high-stress situations. Ensure a line height of at least 1.5x.

**The Signature Scale:** Use a "Large/Small" pairing technique. Pair a `display-md` number with a `label-sm` unit (e.g., "14" + "KM DISTANCE") to create a sophisticated, data-heavy editorial look.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often "dirty." In this design system, we achieve hierarchy through light and layers.

*   **The Layering Principle:** Depth is achieved by "stacking." A critical earthquake alert card should use `surface_container_highest` against a `surface_dim` background to create natural separation.
*   **Ambient Shadows:** For floating action buttons or critical alerts, use an extra-diffused shadow: `offset: (0, 8), blur: 24, opacity: 0.06`. The shadow color must be a tinted version of `primary` to mimic natural light refraction.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. Never use 100% opaque lines.
*   **Interaction States:** On press, a card should not "glow"; it should shift from `surface_container_low` to `surface_container_high`, simulating a physical press into the surface.

---

## 5. Components & Layout Patterns

### Cards & Lists (The Editorial Grid)
*   **Forbid dividers.** Use `40px` (or `xl` spacing) to separate list items. 
*   **Layout:** Cards should use `xl` (0.75rem) corner radius. Use asymmetrical padding (e.g., more padding at the bottom than the top) to create a custom, designed feel.

### Interactive Elements
*   **Primary Buttons:** High-contrast `primary` fill with `on_primary` text. Use a subtle gradient transition to `primary_container` to add depth. Minimum height: 56px for emergency accessibility.
*   **Progress Bars:** Use `secondary_container` as the track and `secondary` as the fill. The bar should be thick (12px) with a `full` radius to feel friendly yet substantial.
*   **Status Badges:** "Bold Status Badges" use `tertiary_container` (for Earthquakes) or `error_container` (for Fire). Text must be all-caps `label-md` with +0.05em tracking for a "Warning Label" aesthetic.
*   **Accordions:** Use a chevron that rotates 180 degrees. The expanded container should have a slightly different background tone (`surface_container_low`) than the header to show containment.

### Specialized Components
*   **The Situational Map:** Use a custom dark-mode map style utilizing the `Offline` (#1A1A2E) color for water/background, and `primary` for land masses to ensure earthquake/fire pins (using `tertiary` and `error`) pop with maximum contrast.
*   **Emergency Bottom Bar:** A glassmorphic float with 48x48px touch targets for Compass, List, Map, and Clipboard. No borders—just a soft ambient shadow.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use extreme scale differences in typography to highlight the most important data.
*   **Do** use "Surface Stacking" to create hierarchy instead of lines.
*   **Do** ensure all interactive elements have at least 12px of breathing room from the screen edge.
*   **Do** use the `tertiary` (Earthquake) and `error` (Fire) colors sparingly—only for actual danger.

### Don’t:
*   **Don’t** use black (#000000) for text or shadows. Use `on_surface` or `on_background`.
*   **Don’t** use 1px dividers or high-contrast borders. They clutter the visual field.
*   **Don’t** use standard "Material" or "Human Interface" shadow defaults. Keep them airy and light.
*   **Don’t** crowd the UI. If in doubt, add more vertical white space.
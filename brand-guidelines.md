# Brand guidelines

Visual rules for the public site and the private area: colour, type, layout, components and motion. Read together with `PROJECT.md` (scope, stack) and `PROFILE.md` (copy). If this file and `PROJECT.md` disagree on scope, `PROJECT.md` wins.

## Direction

**Quiet minimalism with glass controls.** Two layers, as on iOS 26:

- **Content layer:** white ground, large type, a lot of space, flat surfaces. No shadows, gradients or blur on content.
- **Control layer:** the things you press float above the content as Liquid Glass in jade and translucent white: the navigation island, buttons and the closing action. Glass is a material for controls only, never for cards, text blocks or sections.

Rules that follow from it:

- Content first. Every page reads well with animations and images switched off.
- One accent colour, jade. Everything else is near-black, white and grey. Real third-party logos keep their own colours.
- One section, one idea. The hero fills the first screen. The stack and project sections size to their content.
- Equal edges: every block starts and ends on the container lines or on a grid column.
- Avoid: generic templates, stock illustrations, emoji as icons, cards that fade in while scrolling, two calls to action competing in one view.
- The Home hero sequence (see "Motion") is the one large scene on the site. Everything around it stays quiet.

## Logo and name

- The name `jade-atlas` never appears on the public site.
- The private area shows only the logo, without the name.
- The public header is a floating glass island, centred: the owner's name and the navigation (Projects, About). No logo beside the name.
- Until the owner provides a logo for the private area, use a filled circle in `--color-primary`, 24px.
- Keep clear space around the logo equal to half its height.

## Colour

Light theme only in v1. Components use the semantic tokens below, never raw hex values, so a dark theme can be added later by redefining the tokens.

| Token | Hex | Use |
|---|---|---|
| `--color-background` | `#FFFFFF` | Page ground, continuous with the end of the Home hero |
| `--color-foreground` | `#09090B` | Body text, headings |
| `--color-card` | `#FFFFFF` | Form surfaces, tiles on the muted ground |
| `--color-card-foreground` | `#09090B` | Text on cards |
| `--color-primary` | `#18181B` | Logo placeholder, strong UI |
| `--color-on-primary` | `#FFFFFF` | Text on primary |
| `--color-secondary` | `#3F3F46` | Icons, secondary text on dark surfaces |
| `--color-on-secondary` | `#FFFFFF` | Text on secondary |
| `--color-accent` | `#00755A` | Jade green. Links, the main action, the active navigation item, the focus ring |
| `--color-on-accent` | `#FFFFFF` | Text on accent |
| `--color-muted` | `#F3F5F4` | The alternate ground (one band per page) and tiles on the white ground |
| `--color-muted-foreground` | `#52525B` | Secondary text, captions, dates |
| `--color-border` | `#E4E4E7` | The 1px rule that closes a list row |
| `--color-border-strong` | `#71717A` | Borders of inputs and other controls |
| `--color-ring` | `#00755A` | Focus ring |
| `--color-destructive` | `#DC2626` | Delete actions, form errors |
| `--color-on-destructive` | `#FFFFFF` | Text on destructive |
| `--color-success` | `#00755A` | "Published" state, save confirmation |
| `--color-on-success` | `#FFFFFF` | Text on success |

Define the tokens once as CSS custom properties and expose them to Tailwind as theme colours.

**Glass tokens** (controls only, defined on `:root`): `--glass-jade`, `--glass-jade-deep`, `--glass-jade-light`, `--glass-fill` (translucent white), `--glass-jade-fill` (translucent jade for the main action), `--glass-tint` (hover), `--glass-edge`, `--glass-rim`, `--glass-shadow`, `--glass-blur`. Jade and translucent white only: no other hue, whatever a style reference shows.

**Rules**

- The interface stays 90–95% neutral. The accent is for links, the one main action of a view, the active navigation item, the focus ring and the Home hero's light. Never a section ground.
- White text on the jade glass fill stays at least 4.5:1 at every point of the gradient. The light jade is glow only; text never sits on it.
- Glass falls back to an opaque surface when `backdrop-filter` is unsupported or the system asks for reduced transparency.
- Status is never colour alone: "Published", errors and confirmations always carry a text label or an icon.
- `--color-border` is too light to delimit a control. Inputs, checkboxes and selects use `--color-border-strong`.
- Third-party logos (the stack diagram) are the real marks in their own colours, small (at most 28px), never redrawn or tinted. The footer carries "Product names and logos are trademarks of their owners".

**Contrast (WCAG 2)**: every text pair is at least 4.5:1; text people read (paragraphs, card lines) is at least 7:1. Recheck with a contrast tool whenever a token changes: foreground and muted foreground on background and on muted, accent on background and on muted, white on accent.

## Typography

| Role | Font | Use |
|---|---|---|
| Interface and text | Manrope (variable) | Headings, body, buttons, forms |
| Technical accent | JetBrains Mono | Highlighted numbers, technology chips, dates, code |

Both are open source (SIL Open Font License) and self-hosted through `@fontsource`, with `font-display: swap`, so the site makes no request to a third-party font service.

```css
--font-sans: "Manrope Variable", ui-sans-serif, system-ui, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, "Cascadia Code", monospace;
```

**Scale** (390px → 1440px viewport, fluid with `clamp`)

| Style | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Display (Home title) | 38 → 72px | 500 | 1.05 | -0.045em |
| H1 (page title) | 34 → 56px | 500 | 1.08 | -0.04em |
| H2 (section title) | 30 → 48px | 500 | 1.1 | -0.035em |
| H3 (card and row title) | 20 → 24px | 500 | 1.25 | -0.02em |
| Lead | 18 → 20px | 400 | 1.5 | 0 |
| Body | 16px | 400 | 1.625 | 0 |
| Small | 14px | 400 | 1.5 | 0 |
| Label, chip, date (mono) | 13px | 500 | 1.4 | 0 |
| Figure (Home numbers, mono) | same size as H2 | 500 | 1.1 | -0.02em |

**Rules**

- Size and tight tracking carry a headline, never weight: headings are 500, text is 400 and 500. No 600, 700 or 800 anywhere.
- Body text is never below 16px; nothing is below 13px. Lines are at most 62 characters wide.
- Headings use `text-wrap: balance` and take at most three lines at every width.
- Each level is at least 1.3 times the next one on desktop. A figure never outgrows the H2.
- Sentence case everywhere. No tracked capitals, no small caps.
- Numbers that change or line up use tabular figures.
- Mono is an accent. Never set a paragraph in mono.
- Long URLs and identifiers wrap with `overflow-wrap: anywhere`.

## Layout and spacing

- **Spacing scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. No values outside the scale, apart from the section paddings below.
- **Container:** `width: min(100% - 2 * gutter, 1280px)`, centred. Gutter 24px on a phone, 48px from 640px, 80px from 1024px. The header island, every section and the footer share it.
- **Grid:** 12 columns with a 24px gutter (12px on a phone).
- **Two text lines:** the left container line and the split line at column 5. Every split on the site uses this pair: label, date or action on the left four columns, content on the right eight. Never mirrored, never alternating. Under 1024px a split stacks, label first.
- **Sections:** top padding 120px (96 on a phone), bottom padding 72px (48) by default. Section titles sit first, aligned to the top. The Home hero copy is centred vertically beneath the navigation. The stack and project sections use 32–64px of vertical padding.
- **Compact spacing on phones:** About leaves 64px between the introduction, Experience and the closing action. Experience entries use 24px vertical padding, with 16px above their lists and skill chips. The shared closing group uses 64px above and 32px below.
- **Separation** between sections is space or a change of ground, never a rule or a shadow. One muted band per page at most. A list may close each row with a 1px rule.
- **Breakpoints to test:** 390, 768, 1024, 1440px. Mobile first, no horizontal scroll at 320px.
- **Private area:** same tokens, denser. 32–48px between blocks, 16px between form fields, tables with 12px cell padding.
- **Corners:** `--radius-sm` 10px (small tiles, diagram nodes' icons), `--radius-md` 16px (images inside a tile, diagram nodes), `--radius-lg` 24px (tiles, panels, large images). Controls and chips are fully round. Nested corners are concentric: inner radius = outer radius − padding.
- **Elevation:** content is flat. Only glass controls carry a soft shadow and an inner rim.
- **Two boxes deep at most:** a tile and its image, a panel and its nodes. Never a card inside a card.

## Components

- **Buttons.** Fully round, at least 44px high, label weight 500. Main: jade glass, white label, optional trailing arrow. Secondary: translucent white glass, jade-deep label. One main button per view. Hover: the button rises 1px and brightens; press: it scales to 0.98. Destructive (private area only): destructive background, always behind a confirmation.
- **Closing action.** A single compact main button labelled “Write to me” sits at the start of the footer beside the location, wrapping when space is limited.
- **Links.** Accent colour. In running text they are underlined; standalone links draw their underline on hover.
- **Navigation island.** Glass, fully round, centred, sticky. The active item is jade.
- **Tiles (projects).** A flat tile on the opposite ground (muted on white, white on muted), `--radius-lg`, 8px padding around a 16:9 cover with `--radius-md`, then title, summary and chips. The whole tile is one link. Hover: the tile rises 2px and the cover zooms to 1.03 inside its frame.
- **Chips (technologies, skills).** Mono 13px, fully round, a 6% foreground tint as background, not clickable.
- **Rows (experience, skills, education).** One template: the label, date or category on the left line, the content on the split line, a 1px rule closing the row.
- **Highlighted numbers (Home).** Mono, H2 size, tabular figures, with a body-size label underneath in muted foreground. They sit under the stack diagram, not in a section of their own.
- **Stack diagram (Home).** One muted panel with white nodes: front end → backend → data and external services. Each node is real text with the tool's real logo when a licensed one exists, otherwise the name alone. Thin lines connect the nodes; a jade pulse travels along them.
- **Forms (private area).** Always a visible label above the field, helper text below, the error next to the field in destructive colour with an icon. Never a placeholder used as a label.
- **Focus.** Every interactive element shows a 2px `--color-ring` outline with 2px offset on keyboard focus, following the radius of the element. Never remove it, never animate it.
- **Icons.** Lucide, SVG, 1.5px stroke, 20px in the interface and 24px standalone. Icon-only buttons carry an `aria-label`. No emoji.

## Images

- Project covers are 16:9, cropped from the centre. Reserve the space with `aspect-ratio` so the page does not shift while they load, and load them lazily below the fold.
- Every image has an `alt` text that describes it; decorative images have an empty `alt`.
- No stock photos, no generic illustrations, no caption under an image. A project without a cover shows a tinted block with the project title in mono.
- The Home hero is the exception: green stars on white spiral into a black hole, the view dives through a dark star tunnel and comes out on white, where the copy appears. The static fallback is the complete copy on white.

## Motion

Motion answers the pointer and helps readers follow the content. The Home hero carries the main sequence. Page heads can enter on load, controls respond to input, and About highlights each experience as its title first enters the viewport. Content stays visible while scrolling.

**Which tool for what**

| Case | Tool |
|---|---|
| Hover, press and focus feedback | CSS transitions |
| Page head entrance on load | CSS animation |
| Project tiles on load (Projects page) | CSS animation (`enter`, staggered) |
| Route change | View Transitions API through React Router `viewTransition`: the page crossfades and rises, the header stays |
| Active navigation item | Motion (`layoutId`): a glass pill glides to the new item |
| Sheen on the main button, spotlight on a project tile | CSS (`glass-sheen`, `tile-hover::before`); the spotlight follows the pointer through `--spot-x` and `--spot-y` |
| Pulses on the stack diagram | CSS animation |
| Home hero sequence: scroll progress | Motion (`useScroll`) |
| Home hero sequence: stars, black hole, tunnel | Two decorative canvases, loaded only on the Home: an instanced WebGL scene, and the MIT-licensed dgreenheck TSL raymarcher using WebGPURenderer with its WebGL fallback |
| Count-up of the three numbers, when they enter the viewport | AnimeJS |
| About Experience: settle the role title and trace the date | Motion (`inView` and `animate`) for the title, Anime.js for the decorative line |
| About Experience: highlight the career path as the reader scrolls | Motion (`useScroll`) |

One element is animated by one tool only.

**Tokens**

| Token | Value | Use |
|---|---|---|
| `--motion-fast` | 200ms | Hover and press |
| `--motion-reveal` | 500ms | Page head entrance |
| `--motion-count` | 800ms | Count-up of the Home numbers |
| `--ease-out` | `cubic-bezier(0.33, 1, 0.68, 1)` | Entrances and state changes |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Count-up of the Home numbers |

**Rules**

- Animate `opacity` and `transform` only (the diagram pulse may animate `background-position` or `offset-distance`). Never anything that moves the layout.
- **Page head entrance:** on every page except the Home, the title, the lead and the actions rise 12px and fade in once on load, 80ms apart.
- **Hover layer:** a linked tile rises 2px and its cover zooms to 1.03, with a soft light that follows the mouse; a button rises 1px and presses to 0.98, and the main button's glass takes a light sheen; a standalone link draws its underline; the main button's arrow leans 3px forward.
- **Route change:** the page (not the header) fades out in 200ms and the next page rises 12px while it fades in over 500ms. Links that change the page use `viewTransition`.
- **Owner's expanded motion (2026-11-24):** the owner asked for more expressive motion than the rules above allowed. The route change, the gliding navigation pill, the project tile entrance and the pointer-following light are the additions. They keep the same limits: transform and opacity only, no content hidden until scrolled, and the reduced-motion rules below.
- **Diagram pulses** cycle in 2.5–4s and run only while the diagram is on screen.
- No scroll-triggered content fades, parallax or scroll snapping. Scroll progress drives the Home hero and the jade line connecting the dates in About Experience. Each Experience title settles once on entry and a short jade line briefly underlines its date.
- Animations never block input. One exception: the Home hero text takes no pointer events until its buttons are at least half visible. While keyboard focus is inside the hero text, the hero shows its final state.
- Do not split DOM text into letters.
- The count-up runs once, uses tabular figures so the width does not jump, and ends on the exact value written in `PROFILE.md`.
- Content is visible by default in the HTML and CSS, so a failed script never leaves an empty page.

**Home hero sequence**

The Home opens on a white sky of small green stars around a black hole with a jade accretion disk. Native scrolling pulls the stars in; the view dives into the hole, travels through a dark tunnel of stars that bends and accelerates, and exits on white, where the title, the subtitle and the two buttons appear. The owner's name is not in the hero. While the dark part of the sequence is on screen, the navigation island hides.

- The scroll stays native. The hero is a tall section with a sticky stage; never intercept wheel or touch events, never scroll for the user, no scroll snapping.
- It is the only pinned section on the site.
- Smoothness comes first. Target 60fps on a mid-range phone:
  - draw only inside `requestAnimationFrame`, and stop when the final white state is reached;
  - animate the canvas content, `opacity` and `transform` only; no layout reads while scrolling;
  - cap the star pixel ratio at 2 and scale the star count to the viewport; cap the raymarcher at 960×640 pixels and DPR 1;
  - share geometry and material across instances, animate in the vertex shader, dispose geometry, textures, materials and renderer on unmount;
  - stop drawing when the hero is out of the viewport.
- The real title, subtitle and buttons are in the HTML from the first frame. The canvases are `aria-hidden`.
- The hero is static (complete copy on white) under reduced motion, on viewports under 560px tall, and when WebGL is unavailable, the scene cannot initialize or its context is lost. It switches live when the viewport or the preference changes.

**Reduced motion**

When the system asks for reduced motion, the site shows the final state at once: no entrance, no count-up, no pulses, no hero sequence. Colour feedback on hover stays.

- Motion: wrap the application in `<MotionConfig reducedMotion="user">`.
- AnimeJS: do not start the timeline when `matchMedia("(prefers-reduced-motion: reduce)").matches` is true.
- CSS: `@media (prefers-reduced-motion: reduce)` removes animations and transitions on transform.
- View Transitions: the route change is instant under reduced motion (`::view-transition-*` animations set to `none`). The pill jumps to its new item, and the pointer spotlight stays centred.

## Voice

- First person, plain sentences, concrete numbers instead of adjectives.
- English only. Sentence case in headings and buttons ("See projects", not "See Projects").
- A page title names what the page is. A button is a verb and its object.
- The copy comes from `PROFILE.md`. Do not add claims or personal details that are not there.

## Checklist before delivering a page

- [ ] Only semantic tokens, no raw hex or off-scale spacing
- [ ] Text contrast at least 4.5:1 (7:1 for paragraphs), controls at least 3:1
- [ ] Visible focus on every interactive element, full keyboard navigation
- [ ] Touch targets at least 44×44px
- [ ] Works at 390, 768, 1024 and 1440px, and at 320px without horizontal scroll
- [ ] Every block starts and ends on the container lines or a grid column
- [ ] No layout shift from images, fonts or animations
- [ ] Reduced motion shows the final state immediately
- [ ] No emoji as icons; icon-only buttons have a label
- [ ] Glass only on controls; content surfaces are flat

## Source

First generated with the `ui-ux-pro-max` skill (2026-11-15), then changed several times by the owner for the Home hero (frame sequence, stone model, jade sky, black hole, tunnel).

Rewritten on 2026-11-16 at the owner's request, following the `design-taste-frontend` skill and an Apple iOS 26 reference. Owner's decisions: glass on controls only, in jade and translucent white; a new text face, with JetBrains Mono kept; the CV merged into the About page. Taken from the skill: one section per screen, equal edges and the two text lines, the type scale and weights, the hover layer, no scroll-triggered fade-ins, real logos, the closing action in the footer. The skill dealt Manrope with JetBrains Mono (its second pairing; the first came with a different mono), the `close-type` closing and one muted band per page. Kept against the skill, by the owner's choice: the floating glass navigation, glass buttons, separate routes instead of one long page, and the three Home numbers.

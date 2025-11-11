# Project Sleep - Design Style Guide

## Design Philosophy

### Core Aesthetic: Glassmorphism Tech Noir
The design embodies cutting-edge Android development through a sophisticated glassmorphism interface that feels both premium and technically advanced. The aesthetic draws inspiration from sci-fi UI designs and modern tech interfaces, creating an immersive experience that reflects the innovative nature of custom ROM development.

### Color Palette
**Primary Colors:**
- Deep Navy: #0B1426 (Primary background)
- Electric Blue: #00D4FF (Accent and CTAs)
- Cyan Glow: #4DFFFF (Highlights and glows)
- Dark Slate: #1A2332 (Secondary backgrounds)

**Glassmorphism Colors:**
- Glass Blue: rgba(0, 212, 255, 0.1) (Glass surfaces)
- Glass Navy: rgba(11, 20, 38, 0.2) (Glass backgrounds)
- Glass White: rgba(255, 255, 255, 0.05) (Light mode glass)

**Gradient Combinations:**
- Hero Gradient: Linear from #0B1426 to #1A2332
- Accent Gradient: Linear from #00D4FF to #4DFFFF
- Glass Gradient: Linear from rgba(0, 212, 255, 0.1) to rgba(77, 255, 255, 0.05)

### Typography
**Primary Font:** Inter (Sans-serif)
- Headings: Inter Bold (700) - Modern, technical precision
- Body Text: Inter Regular (400) - Clean readability
- Code/Technical: JetBrains Mono - Developer aesthetic

**Font Hierarchy:**
- H1: 3.5rem (56px) - Hero titles
- H2: 2.5rem (40px) - Section headers
- H3: 1.75rem (28px) - Card titles
- Body: 1rem (16px) - Standard text
- Small: 0.875rem (14px) - Captions and metadata

### Visual Language
**Glassmorphism Elements:**
- Backdrop-filter: blur(20px)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Box-shadow: 0 8px 32px rgba(0, 212, 255, 0.1)
- Border-radius: 16px for cards, 8px for buttons

**Interactive States:**
- Hover: Scale 1.02, glow effect with box-shadow
- Active: Scale 0.98, inner shadow
- Focus: 2px solid #00D4FF outline

## Visual Effects

### Used Libraries
- **Anime.js**: Smooth micro-interactions and card animations
- **PIXI.js**: 3D fluid particle system for hero background
- **Splitting.js**: Text reveal animations and effects
- **ECharts.js**: Data visualization for download statistics
- **Splide**: Feature cards horizontal carousel
- **Typed.js**: Typewriter effect for hero text

### Animation Principles
**Timing:**
- Micro-interactions: 150-300ms ease-out
- Page transitions: 500ms ease-in-out
- Hero animations: 1000ms with stagger delays
- Hover effects: 200ms cubic-bezier(0.4, 0, 0.2, 1)

**Easing Functions:**
- Default: cubic-bezier(0.4, 0, 0.2, 1)
- Bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
- Smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94)

### Header Effects
**Hero Background:**
- PIXI.js particle system with 500+ floating particles
- Mouse interaction causing particle attraction/repulsion
- Color cycling from navy to electric blue
- Parallax depth layers for 3D effect

**Text Animations:**
- Typewriter effect for main headline
- Character-by-character reveal with stagger
- Gradient color cycling on emphasis words
- Glow pulse effect on interactive elements

### Scroll Motion
**Reveal Animations:**
- Trigger: Element enters top 60% of viewport
- Duration: 250ms with 50ms stagger
- Transform: translateY(20px) to translateY(0)
- Opacity: 0 to 1

**Parallax Elements:**
- Background particles: -0.5x scroll speed
- Decorative elements: -0.3x scroll speed
- Hero content: 1x scroll speed (normal)

### Hover Effects
**Glass Cards:**
- 3D tilt effect (5deg rotation)
- Glow expansion with color shift
- Scale increase (1.05x)
- Border color transition to electric blue

**Buttons:**
- Glow pulse animation
- Color morphing from navy to cyan
- Shadow expansion
- Subtle scale increase (1.02x)

**Images:**
- Zoom effect (1.1x scale)
- Overlay gradient reveal
- Border glow animation
- Caption slide-up effect

## Layout Principles

### Grid System
- Container max-width: 1200px
- Column gap: 2rem (32px)
- Row gap: 3rem (48px)
- Responsive breakpoints: 768px, 1024px, 1200px

### Spacing Scale
- xs: 0.5rem (8px)
- sm: 1rem (16px)
- md: 1.5rem (24px)
- lg: 2rem (32px)
- xl: 3rem (48px)
- 2xl: 4rem (64px)

### Component Styling
**Navigation Bar:**
- Height: 80px
- Glass background with backdrop blur
- Sticky positioning with z-index: 1000
- Border-bottom: 1px solid rgba(255, 255, 255, 0.1)

**Cards:**
- Padding: 2rem (32px)
- Border-radius: 16px
- Glass background with subtle border
- Hover transform with 3D tilt

**Buttons:**
- Primary: Electric blue background, white text
- Secondary: Glass background, blue border
- Padding: 0.75rem 1.5rem (12px 24px)
- Border-radius: 8px

This design system creates a cohesive, high-tech aesthetic that perfectly represents Project Sleep's innovative approach to Android development while maintaining excellent usability and accessibility.
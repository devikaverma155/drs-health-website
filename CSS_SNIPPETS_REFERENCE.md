# Quick CSS Reference - Premium Background Enhancements

## 1. Organic Glow Backgrounds (Hero/Sections)

Use this for hero-like sections that need premium atmospheric effects:

```tsx
<section className="section-with-glow">
  {/* Organic gradient glows */}
  <div className="absolute inset-0 -z-10">
    {/* Green glow (top-left) */}
    <div className="absolute top-0 left-0 w-96 h-96 rounded-full 
         bg-gradient-to-br from-green-100/20 to-transparent 
         blur-3xl opacity-40 -ml-32 -mt-32"></div>
    
    {/* Gold glow (bottom-right) */}
    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full 
         bg-gradient-to-tl from-amber-100/15 to-transparent 
         blur-3xl opacity-40 -mr-32 -mb-32"></div>
  </div>
  
  {/* Your content */}
  <div className="container-tight relative z-10">
    {/* Content stays on top */}
  </div>
</section>
```

**CSS Equivalent:**
```css
.section-with-glow::before {
  content: "";
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 1000px 800px at 10% 20%, rgba(46, 125, 50, 0.08), transparent 50%),
    radial-gradient(ellipse 900px 700px at 90% 80%, rgba(212, 175, 55, 0.06), transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.section-with-glow > * {
  position: relative;
  z-index: 2;
}
```

---

## 2. Premium Glass Card

Use for product cards, testimonials, info boxes:

```tsx
<div className="product-card rounded-2xl p-6 overflow-hidden">
  {/* Card content */}
</div>
```

**CSS:**
```css
.product-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid rgba(212, 175, 55, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  transition: all 200ms ease;
}

.product-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, transparent 100%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms ease;
  z-index: 1;
}

.product-card:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(212, 175, 55, 0.25);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.product-card:hover::before {
  opacity: 1;
}

.product-card > * {
  position: relative;
  z-index: 2;
}
```

---

## 3. Premium Button with Gold Glow

```tsx
<Button variant="primary">
  Shop Products
</Button>
```

**CSS:**
```css
.btn-primary {
  background: linear-gradient(to right, #A3261A, #7F1C13);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(163, 38, 26, 0.2);
  transition: all 200ms ease;
  transform: scale(1);
}

.btn-primary:hover {
  background: linear-gradient(to right, #7F1C13, #A3261A);
  box-shadow: 0 12px 32px rgba(212, 175, 55, 0.3);
  transform: scale(1.05);
}

.btn-primary:active {
  transform: scale(0.95);
}
```

---

## 4. Layered Background with Fixed Attachment

```css
body {
  background:
    radial-gradient(ellipse 800px 600px at 15% 5%, rgba(46, 125, 50, 0.15), transparent 50%),
    radial-gradient(ellipse 900px 700px at 85% 95%, rgba(212, 175, 55, 0.12), transparent 55%),
    radial-gradient(ellipse 500px 400px at 50% 50%, rgba(34, 139, 34, 0.04), transparent 40%),
    #F7F6F1;
  background-attachment: fixed;
  position: relative;
  min-height: 100vh;
}

/* Optional: Subtle botanical texture */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url('data:image/svg+xml,...');
  background-repeat: repeat;
  background-size: 300px 300px;
  opacity: 0.5;
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: multiply;
}
```

---

## 5. Section with Gradient Background

```tsx
<section className="section-bg-gradient section-padding">
  {/* Content */}
</section>
```

**CSS:**
```css
.section-bg-gradient {
  position: relative;
  background: linear-gradient(135deg, #F7F6F1 0%, #EFEDE4 50%, #F7F6F1 100%);
  background-attachment: fixed;
}

/* Alternating sections */
.section-bg-alt {
  background: linear-gradient(to bottom, #EFEDE4, #F7F6F1);
}
```

---

## 6. Image Hover Zoom Effect

```tsx
<Link href={`/product/${handle}`} className="block relative aspect-square overflow-hidden">
  <Image
    src={image}
    alt={alt}
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-300"
  />
</Link>
```

**CSS:**
```css
.product-image {
  transition: transform 300ms ease;
  transform-origin: center;
}

.group:hover .product-image {
  transform: scale(1.05);
}
```

---

## 7. Header with Glass Effect

```tsx
<header className="sticky top-0 z-50 bg-white/92 backdrop-blur-lg 
                  border-b border-white/40 shadow-sm">
```

**CSS:**
```css
header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
```

---

## 8. Premium Heading Typography

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', ui-serif;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

h1 {
  font-size: 2.25rem-3.75rem;  /* 36px-60px */
  font-weight: 700;
  letter-spacing: -0.03em;
}

h2 {
  font-size: 1.875rem-2.25rem;  /* 30px-36px */
  letter-spacing: -0.02em;
}

h3 {
  font-size: 1.5rem;  /* 24px */
  letter-spacing: -0.01em;
}
```

---

## 9. Gold Accent System

```css
/* Gold border (used on hover only) */
.gold-accent-border {
  border: 1.5px solid rgba(212, 175, 55, 0.15);
  transition: border-color 200ms ease;
}

.gold-accent-border:hover {
  border-color: rgba(212, 175, 55, 0.25);
}

/* Gold shadow glow (hover state) */
.gold-accent-shadow {
  transition: box-shadow 200ms ease;
}

.gold-accent-shadow:hover {
  box-shadow: 0 12px 32px rgba(212, 175, 55, 0.3);
}

/* Gold text (price, special text) */
.gold-text {
  background: linear-gradient(135deg, #A3261A 0%, #D4AF37 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Gold subtle background (price box, badges) */
.gold-bg-subtle {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.08));
  border: 1px solid rgba(212, 175, 55, 0.15);
}
```

---

## 10. Botanical Background Utility

```tsx
<section className="botanical-bg">
  {/* Content */}
</section>
```

**CSS:**
```css
.botanical-bg {
  position: relative;
  overflow: hidden;
}

.botanical-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml,...leaf-pattern...');
  background-repeat: no-repeat;
  background-size: 500px;
  background-position: -10% 20%;
  filter: blur(2px);
  pointer-events: none;
  z-index: 1;
  opacity: 0.04;
}

.botanical-bg > * {
  position: relative;
  z-index: 2;
}
```

---

## 11. Tailwind Utilities Added

```js
// In tailwind.config.ts extend section:

boxShadow: {
  'gold-glow': '0 8px 25px rgba(212, 175, 55, 0.25)',
  'premium': '0 16px 48px rgba(0, 0, 0, 0.1)',
}

// Usage in HTML:
<div className="shadow-gold-glow">...</div>
<div className="shadow-premium">...</div>
```

---

## 12. Performance Tips

✅ **DO:**
- Use `transition: all 200ms ease;` for smooth effects
- Use `transform: scale()` and `translate()` (GPU accelerated)
- Use `backdrop-filter` with moderate blur values (8-20px)
- Use `opacity` changes (very performant)

❌ **DON'T:**
- Animate `width`, `height`, or `left/right` (causes repaints)
- Use multiple heavy shadows (limit to 1-2)
- Use blur filter on large elements (use smaller containers)
- Use `filter: blur()` on text (reduces readability)

---

## 13. Color Values Quick Reference

```css
:root {
  /* Herbal Greens */
  --herbal-green: #2E7D32;
  --herbal-green-light: rgba(46, 125, 50, 0.15);
  --herbal-green-medium: rgba(46, 125, 50, 0.08);
  --herbal-green-subtle: rgba(34, 139, 34, 0.04);
  
  /* Golds */
  --gold: #D4AF37;
  --gold-soft: rgba(212, 175, 55, 0.15);
  --gold-medium: rgba(212, 175, 55, 0.25);
  --gold-shadow: rgba(212, 175, 55, 0.3);
  
  /* Backgrounds */
  --bg-warm-white: #F7F6F1;
  --bg-cream: #EFEDE4;
  
  /* Glass */
  --glass-white: rgba(255, 255, 255, 0.8);
  --glass-white-hover: rgba(255, 255, 255, 0.95);
}
```

---

## 14. Copy-Paste Ready Sections

### Hero Section Template
```tsx
export function HeroSection() {
  return (
    <section className="relative section-padding section-with-glow">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full 
             bg-gradient-to-br from-green-100/20 to-transparent 
             blur-3xl opacity-40 -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full 
             bg-gradient-to-tl from-amber-100/15 to-transparent 
             blur-3xl opacity-40 -mr-32 -mb-32"></div>
      </div>
      <div className="container-tight text-center max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          Your Headline
        </h1>
        <p className="mt-6 text-lg text-body-muted">Description</p>
      </div>
    </section>
  );
}
```

### Product Card Template
```tsx
<article className="product-card group flex flex-col h-full rounded-2xl overflow-hidden">
  <Link href={url} className="relative aspect-square overflow-hidden">
    <Image
      src={image}
      alt={alt}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-300"
    />
  </Link>
  <div className="p-5 flex flex-col flex-1 relative z-10">
    <h3 className="font-semibold text-foreground">{title}</h3>
    <div className="mt-3 flex items-baseline gap-2">
      <span className="text-lg font-bold">₹{price}</span>
    </div>
  </div>
</article>
```

---

## 15. Testing Checklist

Before deploying changes, verify:

- [ ] Backgrounds render correctly on desktop and mobile
- [ ] Text is fully readable on all backgrounds
- [ ] Hover effects work smoothly (no jank)
- [ ] No layout shifts on hover
- [ ] Glass blur effects work in Safari/Chrome/Firefox
- [ ] Gold accents are subtle (not overwhelming)
- [ ] Responsive design maintains on all screen sizes
- [ ] Performance is smooth (60fps on scroll)
- [ ] Accessibility: all text has sufficient contrast
- [ ] Images load without shifting content

---

## Customization Examples

### Change Hero Glow Colors
```tsx
{/* Replace color classes */}
from-purple-100/20  {/* Instead of green-100/20 */}
from-pink-100/15    {/* Instead of amber-100/15 */}
```

### Adjust Glass Blur Amount
```css
backdrop-filter: blur(24px);  /* Stronger */
backdrop-filter: blur(8px);   /* Lighter */
```

### Make Gold More Prominent
```css
border: 2px solid rgba(212, 175, 55, 0.35);  /* Thicker, more opaque */
box-shadow: 0 12px 32px rgba(212, 175, 55, 0.45);  /* Stronger glow */
```

### Create Warmer Tones
```css
from-amber-200/25  {/* More orange-y than current green */}
from-yellow-100/20 {/* More yellow */}
```

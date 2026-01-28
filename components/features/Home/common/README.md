# Home Common Components

## 📁 Shared Components & Hooks

```
common/
├── AOSProvider.tsx          # ✨ Global AOS provider (reusable)
├── hooks/
│   └── useAOS.ts          # ✨ Shared AOS hook (reusable)
├── AnimatedCounter.tsx
├── AnimateWave.tsx
├── FloatingIcons.tsx
├── SectionWrapper.tsx
├── SectionWithWave.tsx
├── PinnedBlog.tsx
├── PinnedBlogWrapper.tsx
├── VideoPlayer.tsx
└── YTVideoPlayer.tsx
```

## 🎯 AOSProvider - Reusable Animation Provider

### Purpose
Single, global provider for AOS (Animate On Scroll) library initialization.
Instead of initializing AOS in each section, we initialize it once at the page level.

### Benefits
✅ **Single initialization** - More efficient, prevents multiple `AOS.init()` calls  
✅ **Reusable** - Can be used across all sections  
✅ **Better performance** - One initialization instead of many  
✅ **Easier maintenance** - Centralized AOS configuration  

### Usage

Wrap your page content with `AOSProvider`:

```tsx
import AOSProvider from "./common/AOSProvider";

<AOSProvider>
  <Bannar />
  <Course />
  <OtherSections />
</AOSProvider>
```

### Implementation

The provider uses the `useAOS` hook which:
- Initializes AOS once on mount
- Configures AOS with optimal settings
- Refreshes AOS when needed
- Cleans up on unmount

### Configuration

Default AOS settings in `useAOS.ts`:
- Duration: 800ms
- Easing: ease-in-out
- Once: true (animations happen once)
- Mirror: false (no animation on scroll up)

You can modify these settings in `hooks/useAOS.ts` if needed.

## 📝 Migration Notes

**Before:** Each section had its own AOS provider
- `BannarAOSProvider`
- `CourseAOSProvider`
- etc.

**After:** Single `AOSProvider` at page level
- Wraps all sections in `HomeClient.tsx`
- All sections benefit from AOS automatically
- No need for individual providers

## 🔄 For Future Sections

When adding new sections that need AOS animations:

1. **Don't create** a new AOS provider
2. **Don't call** `AOS.init()` directly
3. **Just use** `data-aos` attributes in your components
4. The global `AOSProvider` will handle initialization

Example:
```tsx
<div data-aos="fade-up">
  Your content here
</div>
```

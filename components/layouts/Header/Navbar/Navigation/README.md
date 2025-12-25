# Navigation Components

A comprehensive, reusable navigation system for the EBP application with modern React patterns and responsive design.

## 🚀 Features

- **Reusable Components**: Modular navigation components that can be used across the application
- **Responsive Design**: Automatic mobile/desktop navigation handling
- **Performance Optimized**: Memoized components and hooks for optimal performance
- **Type Safety**: PropTypes for better development experience
- **Configuration Driven**: Centralized navigation configuration
- **Accessibility**: ARIA labels and keyboard navigation support

## 📁 Component Structure

```
Navigation/
├── index.js                     # Main export file
├── NavigationConfig.js          # Configuration constants
├── NavigationItem.jsx           # Individual navigation item component
├── MobileMenuToggle.jsx         # Mobile menu toggle button
├── ResponsiveNavigation.jsx     # Responsive navigation container
├── useNavigationConfig.js       # Hook for navigation configuration
├── useResponsiveNavigation.js   # Hook for responsive behavior
├── NavigationItem.propTypes.js  # PropTypes definitions
└── README.md                    # This documentation
```

## 🎯 Components

### NavigationItem

A flexible navigation item component that supports both desktop and mobile variants.

```jsx
import { NavigationItem } from "../Components/Navigation";

<NavigationItem
  item={{
    link: "/dashboard",
    icon: "MdDashboard",
    title: "Dashboard",
    color: "#13c2c2",
    description: "Access your dashboard",
    requiresAuth: true,
  }}
  variant="desktop"
  onClick={handleClick}
  showIcon={true}
  showDescription={false}
/>;
```

### MobileMenuToggle

Animated mobile menu toggle button with customizable variants.

```jsx
import { MobileMenuToggle } from "../Components/Navigation";

<MobileMenuToggle
  isOpen={isOpen}
  onToggle={toggleMenu}
  size="md"
  variant="default"
/>;
```

### ResponsiveNavigation

Container component that renders navigation items based on screen size.

```jsx
import { ResponsiveNavigation } from "../Components/Navigation";

<ResponsiveNavigation
  items={navigationItems}
  onItemClick={handleItemClick}
  variant="desktop"
/>;
```

## 🎣 Hooks

### useNavigationConfig

Hook for managing navigation configuration based on authentication state.

```jsx
import { useNavigationConfig } from "../Components/Navigation";

const { desktopItems, mobileItems, navigationItems } =
  useNavigationConfig(isAuthenticated);
```

### useResponsiveNavigation

Hook for managing responsive navigation behavior and mobile menu state.

```jsx
import { useResponsiveNavigation } from "../Components/Navigation";

const {
  isMobileMenuOpen,
  toggleMobileMenu,
  closeMobileMenu,
  handleItemClick,
  isMobile,
  isTablet,
  isDesktop,
} = useResponsiveNavigation();
```

## ⚙️ Configuration

### Navigation Items

Navigation items are defined in `NavigationConfig.js` with the following structure:

```javascript
export const NAVIGATION_ITEMS = {
  HOME: {
    link: "/",
    icon: "FaHome",
    title: "Home",
    color: "#1890ff",
    description: "Navigate to home page",
  },
  DASHBOARD: {
    link: "/dashboard",
    icon: "MdDashboard",
    title: "Dashboard",
    color: "#13c2c2",
    description: "Access your dashboard",
    requiresAuth: true,
  },
  // ... more items
};
```

### Breakpoints

Responsive breakpoints are defined for consistent behavior:

```javascript
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
};
```

## 🎨 Styling

The components use Tailwind CSS classes and support custom styling through className props. Color schemes are defined in the configuration and applied dynamically.

### Color System

Each navigation item has a defined color that's used for:

- Icon backgrounds
- Hover states
- Active states
- Mobile card styling

## 📱 Responsive Behavior

- **Mobile (< 768px)**: Collapsible menu with drawer
- **Tablet (768px - 1024px)**: Collapsible menu with drawer
- **Desktop (≥ 1024px)**: Horizontal navigation bar

## 🔧 Usage in Navbar

The improved Navbar component demonstrates how to use all navigation components together:

```jsx
import {
  ResponsiveNavigation,
  MobileMenuToggle,
  useNavigationConfig,
  useResponsiveNavigation,
} from "../Components/Navigation";

const Navbar = memo(() => {
  const { loggedUser } = usePContext();

  const { desktopItems, mobileItems } = useNavigationConfig(!!loggedUser);
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    handleItemClick,
  } = useResponsiveNavigation();

  // ... rest of component
});
```

## 🚀 Performance Optimizations

- **React.memo**: Components are memoized to prevent unnecessary re-renders
- **useCallback**: Event handlers are memoized
- **useMemo**: Navigation items are memoized based on authentication state
- **Lazy Loading**: Mobile navigation is only rendered when needed

## 🎯 Benefits

1. **Reusability**: Components can be used in different parts of the application
2. **Maintainability**: Centralized configuration makes updates easy
3. **Performance**: Optimized for minimal re-renders
4. **Accessibility**: Built-in ARIA support
5. **Responsive**: Automatic mobile/desktop handling
6. **Type Safety**: PropTypes for better development experience
7. **Consistency**: Unified styling and behavior across the app

## 🔄 Migration from Old Navbar

The old Navbar component has been completely refactored to use the new navigation system while maintaining the same visual appearance and functionality. The main improvements include:

- Reduced code complexity from 289 lines to 91 lines
- Better separation of concerns
- Improved performance with memoization
- More maintainable configuration system
- Enhanced responsive behavior

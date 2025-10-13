# Navbar3 Component

A modern, responsive navigation bar component with dropdown menus and search functionality.

## Features

- **Avatar Display**: Shows a user avatar on the left side
- **Menu Items**: Horizontal navigation menu with support for dropdown sub-items
- **Hover Dropdowns**: Smooth dropdown animations on hover for items with sub-menus
- **Search Bar**: Integrated search functionality with Material Icons
- **Fixed Positioning**: Stays at the top of the page while scrolling
- **TypeScript**: Fully typed for better developer experience
- **Responsive**: Adapts to different screen sizes

## Usage

```tsx
import { Navbar3 } from "@/components/Navbar3";

export default function MyPage() {
  return (
    <div>
      <Navbar3 />
      {/* Your page content */}
    </div>
  );
}
```

## Demo

Visit `/navbar3-demo` to see the component in action.

## Customization

### Menu Items

Edit the `items` array in `Navbar3.tsx` to customize menu items:

```tsx
const items: MenuItem[] = [
  { name: "About" }, // Simple link without dropdown
  { name: "Skills", items: ["UI/UX", "Development", "Design"] }, // With dropdown
  // Add more items...
];
```

### Styling

Modify `src/styles/Navbar3.css` to customize:
- Colors
- Spacing
- Transitions
- Dropdown appearance
- Search bar styling

### Avatar

Replace `/public/navbar3/avatar.svg` with your own avatar image.

## Component Structure

```
src/
├── components/
│   └── Navbar3.tsx          # Main component
├── styles/
│   └── Navbar3.css          # Component styles
└── app/
    └── navbar3-demo/
        └── page.tsx         # Demo page

public/
└── navbar3/
    └── avatar.svg           # Avatar image
```

## Dependencies

- React (hooks: `useState`, `useRef`)
- Next.js Image component
- Material Symbols Outlined font (imported in globals.css)

## Browser Support

Modern browsers with CSS support for:
- Flexbox
- CSS Transitions
- CSS `translate` property

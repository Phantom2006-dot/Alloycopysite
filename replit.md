# BAUHAUS Website

## Overview

BAUHAUS is a Nigerian cultural company operating across multiple verticals: Books, Films & Documentaries, Publishing, and Tourism. This website serves as their digital presence to showcase their catalog and services. The application is a clean, minimalist marketing website built with React and Vite, emphasizing professional presentation and intuitive navigation inspired by modern design aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18.3.1 with functional components and hooks pattern
- Vite 7.2.4 as the build tool for fast development and optimized production builds
- TypeScript for type safety (configured with relaxed strictness for flexibility)
- React Router DOM 7.9.6 for client-side routing with BrowserRouter

**Component Organization**
- Page-based routing with dedicated page components (Index, About, Books, TV, Film, Publishing, Events, Team, Contact, NotFound)
- Shared Layout component wrapping Header and Footer for consistent site structure
- Reusable MediaCarousel component using Embla Carousel for content showcases
- shadcn/ui component library integration for pre-built UI primitives

**Styling Architecture**
- Tailwind CSS 4.1.17 with utility-first approach
- CSS custom properties (CSS variables) for theming via `index.css`
- Light/dark theme support using next-themes package
- Custom design tokens including:
  - Color system: Background, foreground, primary, secondary, accent, destructive, muted
  - Typography: Inter (sans-serif) and Playfair Display (serif) from Google Fonts
  - Custom animations: fadeIn, slideIn for smooth page transitions
- Glassmorphism effects and gradient backgrounds for modern aesthetic

**State Management**
- React hooks (useState, useEffect) for local component state
- TanStack React Query for data fetching and caching capabilities
- ThemeProvider context for global theme state

**Responsive Design Strategy**
- Mobile-first approach with responsive breakpoints
- Custom `useIsMobile` hook for SSR-safe responsive behavior
- Embla Carousel configured with responsive slide counts
- Hamburger menu with animated transitions for mobile navigation

**Code Quality & Tooling**
- ESLint with TypeScript support for code linting
- Relaxed TypeScript configuration (strict mode disabled) for faster development
- Path aliases configured (`@/*` points to `src/*`) for cleaner imports
- PostCSS with Autoprefixer for CSS processing

### External Dependencies

**UI Component Libraries**
- Radix UI primitives (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, hover-card, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toast, toggle, tooltip)
- shadcn/ui configuration for component customization
- Embla Carousel React (8.6.0) for media carousels
- Lucide React (0.462.0) for icon system

**Form & Validation**
- React Hook Form with @hookform/resolvers for form handling
- cmdk for command menu functionality
- input-otp for OTP input components
- react-day-picker with date-fns for date selection

**Theming & Styling**
- next-themes (0.4.6) for theme management
- class-variance-authority (CVA) for component variant management
- clsx and tailwind-merge for conditional class names

**Data Management**
- TanStack React Query (5.83.0) for async state management

**Development Tools**
- Vite React SWC plugin for fast refresh
- TypeScript ESLint for linting
- React Router for navigation

**Build Configuration**
- Vite configured to serve on 0.0.0.0:5000 for network access
- Path resolution aliases for clean imports
- Development and production build modes

**Asset Management**
- Public folder for static assets (robots.txt, logos)
- Logo variants for light/dark themes (5.svg for dark, logo-light.svg for light)
- Unsplash images used as placeholder content throughout

## CMS (Content Management System)

### Database Schema
PostgreSQL database with Drizzle ORM:
- **users**: Admin users with roles (super_admin, editor, author, contributor)
- **articles**: Blog posts with categories, tags, and SEO metadata
- **categories**: Article categories (Books, Films, Events, Publishing, News, TV, Tourism)
- **tags**: Article tags with many-to-many relationship
- **media_items**: Books, films, TV shows catalog
- **team_members**: Company team members
- **events**: Company events and screenings
- **uploads**: Media library for uploaded files

### Backend API
Express.js backend running on port 5000:
- JWT authentication with role-based access control
- RESTful API endpoints for all content types
- File upload with Sharp for image processing
- Pagination and filtering support

### Admin Panel
Located at `/admin`:
- **Login**: `/admin/login` (credentials: admin/admin123)
- **Dashboard**: `/admin` - Overview with stats and quick actions
- **Articles**: `/admin/articles` - Article management with CRUD
- **Article Editor**: `/admin/articles/:id` - Rich text editing with SEO settings

### Blog Frontend
Public-facing blog pages:
- **Blog List**: `/blog` - Articles with category filters and search
- **Blog Article**: `/blog/:slug` - Full article with author info and sharing

### User Roles
- **super_admin**: Full access to all features
- **editor**: Content management, can publish articles
- **author**: Can create/edit own articles, cannot publish
- **contributor**: Limited access
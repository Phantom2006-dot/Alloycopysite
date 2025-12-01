# BAUHAUS Website

## Overview

BAUHAUS is a Nigerian cultural company operating across multiple verticals: Books, Films & Documentaries, Publishing, and Tourism. This website serves as their digital presence to showcase their catalog, promote Nigerian culture, and connect with readers, filmmakers, tourists, and content creators interested in Nigerian culture and destinations.

The project is a clean, minimalist marketing website built with React and Vite, inspired by the design aesthetic of alloyentertainment.com. It emphasizes professional presentation, intuitive navigation, mobile responsiveness, and fast loading times.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (December 2025)

### Design Overhaul
- **Header/Navbar**: Redesigned with clean, professional navigation like Alloy Entertainment
  - Animated hamburger menu for mobile with smooth transitions
  - Transparent to solid background on scroll
  - Professional uppercase typography with letter-spacing
- **HeroCarousel**: 1-second auto-slide interval with responsive layout
- **QuoteBanner**: Centered quotes with decorative quote marks and dividers
- **Footer**: Clean 4-column layout with logo, quick links, and office locations
- **About Page**: Two-column layout with gradient backgrounds and Vision/Mission cards
- **Contact Page**: Professional inquiry cards, office location cards, publishing submission section
- **TV/Films/Books Pages**: Improved carousels with centered content and news sections
- **Team Page**: Values cards with icons highlighting company culture

### Technical Improvements
- Fixed SSR compatibility by using `useState` + `useEffect` for responsive breakpoints
- Added CSS animations (fadeIn, slideIn) for smooth interactions
- Enhanced responsiveness across all screen sizes
- Improved typography with better font rendering

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 19.2.0 with functional components and hooks
- Vite 7.2.4 for fast development and optimized production builds
- React Router DOM 7.9.6 for client-side routing

**Styling Approach**
- Tailwind CSS 4.1.17 with Vite plugin for utility-first styling
- Custom CSS theme variables for consistent design tokens (colors, fonts)
- Dark theme with white accent color scheme (black/neutral-950 background, white text)
- Google Fonts integration: Inter (sans-serif) and Playfair Display (serif)
- Gradient backgrounds and glassmorphism effects for modern look

**Component Structure**
- Path aliasing configured: `@/` maps to `src/`, `@assets/` maps to `attached_assets/`
- Custom hooks for document title and meta description management
- Static data modules for content (books, films, blog posts, events, tourism destinations)

**Design System**
- Minimalist, professional aesthetic with ample white space
- Mobile-first responsive design
- Smooth scroll behavior and optimized font rendering
- Animated transitions and hover effects

### Page Architecture

The website follows a traditional multi-page structure:

1. **Home** - Hero carousel with quotes section
2. **About Us** - Company mission, vision with two-column layout
3. **Books** - Carousel + filterable book grid by category
4. **TV** - Carousel + recent news section
5. **Films** - Carousel + recent news section
6. **Team** - Leadership info with values cards
7. **Contact Us** - Inquiry cards, office locations, publishing submissions

### Data Management

**Static Content Approach**
- Content stored in JavaScript data files (`src/data/`)
- Structured data modules: `books.js`, `films.js`, `blog.js`, `events.js`, `tourism.js`
- Rich content models with images, metadata, categorization, and featured flags
- No backend database currently implemented (static data only)

**Content Structure**
- Books: title, author, cover image, description, category, year, featured status
- Films: title, type (film/documentary), poster, synopsis, status, year, director
- Blog Posts: slug-based routing, excerpts, full content, author, date, category, featured status
- Events: type-based filtering (upcoming/past), venue details, categories
- Tourism: Destination-based with highlights, practical information, images

### Development Configuration

**Server Setup**
- Development server runs on port 5000
- Configured for host `0.0.0.0` with `allowedHosts: true` for Replit compatibility
- Hot Module Replacement (HMR) enabled via Vite React plugin

**Code Quality**
- ESLint configured with React hooks and React Refresh plugins
- Custom rule: unused variables allowed if uppercase (constants pattern)
- Modern JavaScript (ES2020+) with JSX support

**Asset Management**
- External images via Unsplash URLs (placeholder approach)
- Design brief documents stored in `attached_assets/`
- Path aliasing for cleaner imports

## External Dependencies

### Third-Party Services

**Content Delivery**
- Unsplash image CDN for placeholder imagery
- Google Fonts CDN for Inter and Playfair Display typefaces

**Future Integration Considerations**
- No current backend API or database
- No authentication system implemented
- No CMS integration (content is hardcoded in data files)
- No form submission handling configured
- No analytics or tracking services integrated

### npm Packages

**Core Dependencies**
- `react` & `react-dom` - UI framework
- `react-router-dom` - Client-side routing
- `tailwindcss` & `@tailwindcss/vite` - Styling system
- `lucide-react` - Icon library

**Development Dependencies**
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React integration for Vite
- `eslint` and related plugins - Code linting
- Type definitions for React (`@types/react`, `@types/react-dom`)

### Potential Future Integrations

Based on the project structure and requirements, future development may include:
- Backend API for dynamic content management
- Database integration (Postgres/Drizzle could be added)
- Contact form email service integration
- Event registration system
- E-commerce for book/film sales
- Content Management System (CMS)
- Newsletter subscription service
- Social media sharing integrations
- Analytics platform (Google Analytics, etc.)

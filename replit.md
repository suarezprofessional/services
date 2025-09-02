# Overview

Suarez Professional Services is a static website built for GitHub Pages deployment that showcases professional notary public and bookkeeping services. The site serves as a business presence for Peter's professional services company, featuring a multi-page layout with dedicated sections for different service offerings and contact information.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The website uses a traditional multi-page static architecture built with HTML5, CSS3, and vanilla JavaScript. The design follows a mobile-first responsive approach using Bootstrap 5 as the primary CSS framework.

**Key architectural decisions:**
- **Static Site Generation**: Chosen for GitHub Pages compatibility, zero server costs, and fast loading times
- **Bootstrap 5**: Selected for responsive design consistency and rapid development
- **Vanilla JavaScript**: Used instead of frameworks to keep the site lightweight and avoid build processes
- **Font Awesome**: Integrated for consistent iconography across the site

## Page Structure
The site follows a traditional multi-page architecture with separate HTML files for each major section:
- `index.html` - Homepage with hero section and service overview
- `notary.html` - Dedicated page for notary public services
- `bookkeeping.html` - Dedicated page for bookkeeping services  
- `contact.html` - Contact information and inquiry form

## Styling Architecture
CSS is organized using custom properties (CSS variables) for consistent theming and follows a component-based approach:
- Root variables for colors, fonts, and layout constants
- Modular CSS targeting specific components (navbar, hero, forms)
- Bootstrap utility classes supplemented with custom styles
- Responsive design principles with mobile-first breakpoints

## JavaScript Architecture
Minimal JavaScript implementation focused on progressive enhancement:
- Module pattern with DOMContentLoaded initialization
- Separate functions for navbar behavior, form handling, and animations
- Event delegation for mobile menu interactions
- Form validation and submission handling

## Development Workflow
The project uses a simple HTTP server for local development with npm package management for the development server dependency.

# External Dependencies

## CSS Frameworks & Libraries
- **Bootstrap 5.3.0**: Primary CSS framework for responsive layout and components
- **Font Awesome 6.4.0**: Icon library for consistent visual elements across the site

## Development Tools
- **http-server**: Local development server for testing static files
- **npm**: Package management for development dependencies

## Browser Dependencies
The site relies on modern browser APIs and features:
- CSS Custom Properties (CSS Variables)
- ES6+ JavaScript features
- Flexbox and CSS Grid support
- Media queries for responsive design

## Hosting Platform
- **GitHub Pages**: Target deployment platform requiring static file compatibility
# Suarez Professional Services Website

## Overview
Professional services website for Suarez Professional Services, offering notary public and bookkeeping services. The site features a clean, modern design built with Bootstrap 5 and served via a Python HTTP server configured for the Replit environment.

## Project Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6)
- **UI Framework**: Bootstrap 5.3.0
- **Icons**: Font Awesome 6.4.0
- **Backend**: Python 3.11 (Simple HTTP Server)
- **Deployment**: Replit-optimized static file server

### File Structure
```
├── server.py           # Python HTTP server with Replit optimizations
├── index.html          # Home page
├── notary.html         # Notary services page
├── bookkeeping.html    # Bookkeeping services page
├── contact.html        # Contact form page
├── css/
│   └── style.css      # Custom styles
├── js/
│   └── main.js        # JavaScript functionality
└── CNAME              # Custom domain configuration
```

### Server Configuration
The `server.py` file is pre-configured for Replit with:
- Port 5000 on 0.0.0.0 (required for Replit proxy)
- CORS headers for iframe proxy compatibility
- Cache-Control headers to prevent caching issues
- Automatic index.html serving for root path

## Features

### Pages
1. **Home (index.html)** - Landing page with service overview
2. **Notary Services (notary.html)** - Detailed notary service information
3. **Bookkeeping (bookkeeping.html)** - Bookkeeping packages and Zoho Books setup
4. **Contact (contact.html)** - Contact form with Formspree integration

### JavaScript Features (main.js)
- Mobile menu click-away functionality
- Contact form auto-reset after Formspree submission
- Phone number formatting
- Smooth scrolling for anchor links
- Form validation

### Contact Form
- Integrated with Formspree (form ID: xgvnwqre)
- Auto-resets after successful submission
- Client-side validation

## Recent Changes
- **2025-01-07**: Initial Replit setup
  - Installed Python 3.11
  - Configured workflow for port 5000
  - Verified server configuration for Replit environment

## Contact Information
- **Business**: Suarez Professional Services
- **Contact Person**: Peter
- **Email**: peter@suarezprofessionalservices.com
- **Phone**: +1 (631) 372-7335

## Development Notes
- The server is already configured with proper CORS and caching headers for Replit
- No additional dependencies required - uses Python's built-in http.server
- All external resources (Bootstrap, Font Awesome) loaded via CDN

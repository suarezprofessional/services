// Main JavaScript file for Suarez Professional Services
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initNavbar();
    initContactForm();
    initSmoothScrolling();
    initAnimations();
    
    // Navbar functionality
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        // Add scroll effect to navbar
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow');
            } else {
                navbar.classList.remove('shadow');
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }
    
    // Contact form functionality with Formspree integration
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            // Add phone number formatting
            const phoneInput = document.getElementById('phone');
            if (phoneInput) {
                phoneInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 6) {
                        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                    } else if (value.length >= 3) {
                        value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
                    } else if (value.length >= 1) {
                        value = value.replace(/(\d{1,3})/, '($1');
                    }
                    e.target.value = value;
                });
            }
            
            // Simple form validation - let Formspree handle the rest
            contactForm.addEventListener('submit', function(e) {
                const phoneField = document.getElementById('phone');
                if (phoneField && phoneField.value && !phoneField.checkValidity()) {
                    e.preventDefault();
                    alert('Please enter a valid phone number in the format: (123) 456-7890');
                    phoneField.focus();
                    return false;
                }
                
                console.log('Contact form submitted to Formspree');
            });
        }
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Initialize animations
    function initAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.service-card, .feature-item, .package-card, .service-feature');
        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
    }
    
    // Utility functions
    
    // Format phone number
    function formatPhoneNumber(phoneNumber) {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phoneNumber;
    }
    
    // Add phone number formatting to phone inputs
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            this.value = formatPhoneNumber(this.value);
        });
    });
    
    // Enhanced accessibility
    
    // Add keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.service-card, .package-card');
    interactiveCards.forEach(function(card) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });
    
    // Focus management for forms
    const firstFormInput = document.querySelector('#contactForm input[type="text"]');
    if (firstFormInput) {
        // Focus first input when contact form is scrolled into view
        const contactSection = firstFormInput.closest('section');
        if (contactSection) {
            const contactObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting && window.innerWidth > 768) {
                        setTimeout(() => firstFormInput.focus(), 500);
                        contactObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            contactObserver.observe(contactSection);
        }
    }
    
    // Print functionality
    const printButton = document.querySelector('.print-button');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Enhanced error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        
        // Show user-friendly error message for form submissions
        const formMessages = document.getElementById('formMessages');
        if (formMessages && e.error && e.error.message.includes('form')) {
            formMessages.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    There was a technical issue with the form. Please try again or contact us directly.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
        }
    });
    
    // Performance optimization - lazy load images if any are added later
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    console.log('Suarez Professional Services website initialized successfully');
});

// Additional utility functions available globally

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navbarCollapse.classList.toggle('show');
}

// Copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            showNotification('Copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Copied to clipboard!');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 1050; max-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(function() {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 150);
        }
    }, 3000);
}

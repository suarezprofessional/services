// Simplified JavaScript for GitHub Pages compatibility
document.addEventListener('DOMContentLoaded', function() {
    console.log('Suarez Professional Services website loaded');
    
    // Mobile menu click-away functionality
    setupMobileMenuClickAway();
    
    // Contact form reset functionality  
    setupContactFormReset();
    
    // Phone number formatting
    setupPhoneFormatting();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
});

// Simple, reliable mobile menu click-away
function setupMobileMenuClickAway() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarToggler || !navbarCollapse) return;
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        // Only act if we're in mobile view (toggler is visible)
        if (window.innerWidth < 992) {
            // If menu is open and click is outside navbar
            if (navbarCollapse.classList.contains('show') && 
                !e.target.closest('.navbar')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
                navbarToggler.classList.add('collapsed');
            }
        }
    });
    
    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
                navbarToggler.classList.add('collapsed');
            }
        });
    });
}

// Simple contact form reset after Formspree return
function setupContactFormReset() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Check URL for success indicators or if coming from Formspree
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer || '';
    
    // Simple detection methods
    const isFormspreeReturn = referrer.includes('formspree.io') || 
                             urlParams.get('success') || 
                             urlParams.get('submitted') ||
                             window.location.hash === '#success';
    
    if (isFormspreeReturn) {
        // Reset the form
        contactForm.reset();
        
        // Clear all form fields manually  
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(function(input) {
            if (input.type !== 'submit' && input.type !== 'button' && input.type !== 'hidden') {
                input.value = '';
            }
        });
        
        // Show success message
        showSuccessMessage();
        
        // Clean the URL
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        if (window.history && window.history.replaceState) {
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }
}

// Show success message
function showSuccessMessage() {
    const formMessages = document.getElementById('formMessages');
    if (formMessages) {
        formMessages.innerHTML = 
            '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                '<i class="fas fa-check-circle me-2"></i>' +
                'Thank you! Your message has been sent successfully. We\'ll get back to you soon.' +
                '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' +
            '</div>';
    }
}

// Phone number formatting
function setupPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"], #phone');
    phoneInputs.forEach(function(input) {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = '(' + value.substring(0,3) + ') ' + value.substring(3,6) + '-' + value.substring(6,10);
            } else if (value.length >= 3) {
                value = '(' + value.substring(0,3) + ') ' + value.substring(3);
            }
            e.target.value = value;
        });
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar') ? 
                                   document.querySelector('.navbar').offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Additional simple form validation for contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const phoneField = document.getElementById('phone');
            if (phoneField && phoneField.value) {
                const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
                if (!phonePattern.test(phoneField.value)) {
                    e.preventDefault();
                    alert('Please enter a valid phone number in the format: (123) 456-7890');
                    phoneField.focus();
                    return false;
                }
            }
        });
    }
});
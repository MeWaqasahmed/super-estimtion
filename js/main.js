// SuperEstimation Website JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button if it doesn't exist
    const navbar = document.querySelector('.navbar .container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navbar && navMenu && window.innerWidth <= 768) {
        // Check if toggle button already exists
        let mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (!mobileToggle) {
            // Create toggle button
            mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = '☰';
            mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
            
            // Insert after logo
            const logo = navbar.querySelector('.logo');
            logo.parentNode.insertBefore(mobileToggle, logo.nextSibling);
        }
        
        // Toggle menu on button click
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon
            if (navMenu.classList.contains('active')) {
                mobileToggle.innerHTML = '✕';
            } else {
                mobileToggle.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '☰';
            }
        });
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default if it's not just "#"
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Form Validation (Contact Form)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name');
        const company = document.getElementById('company');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const projectType = document.getElementById('project-type');
        const bidDate = document.getElementById('bid-date');
        
        let isValid = true;
        let errorMessage = '';
        
        // Validate name
        if (name.value.trim() === '') {
            isValid = false;
            errorMessage += 'Please enter your name.\n';
            name.style.borderColor = 'red';
        } else {
            name.style.borderColor = '';
        }
        
        // Validate company
        if (company.value.trim() === '') {
            isValid = false;
            errorMessage += 'Please enter your company name.\n';
            company.style.borderColor = 'red';
        } else {
            company.style.borderColor = '';
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
            email.style.borderColor = 'red';
        } else {
            email.style.borderColor = '';
        }
        
        // Validate phone
        if (phone.value.trim() === '') {
            isValid = false;
            errorMessage += 'Please enter your phone number.\n';
            phone.style.borderColor = 'red';
        } else {
            phone.style.borderColor = '';
        }
        
        // Validate project type
        if (projectType.value === '') {
            isValid = false;
            errorMessage += 'Please select a project type.\n';
            projectType.style.borderColor = 'red';
        } else {
            projectType.style.borderColor = '';
        }
        
        // Validate bid date
        if (bidDate.value === '') {
            isValid = false;
            errorMessage += 'Please select a bid due date.\n';
            bidDate.style.borderColor = 'red';
        } else {
            bidDate.style.borderColor = '';
        }
        
        if (isValid) {
            // Form is valid - show success message
            alert('Thank you for your quote request! A SuperEstimation team member will contact you within 2 business hours.');
            contactForm.reset();
        } else {
            // Show error message
            alert('Please correct the following errors:\n\n' + errorMessage);
        }
    });
}

// Sticky Header on Scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    } else {
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.feature, .service-item, .blog-card, .testimonial, .pricing-card');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Console message
console.log('%cSuperEstimation', 'color: #f39c12; font-size: 24px; font-weight: bold;');
console.log('%cAmerica\'s Most Trusted Electrical Estimating Company', 'color: #1a1a2e; font-size: 14px;');
console.log('Website built with care for electrical contractors across all 50 US states.');


// Mobile Dropdown Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        const dropdownParents = document.querySelectorAll('.nav-menu li.has-dropdown > a');
        
        dropdownParents.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.parentElement;
                
                // Close other dropdowns
                document.querySelectorAll('.nav-menu li.has-dropdown').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                parent.classList.toggle('active');
            });
        });
    }
});

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
        
        // Handle dropdown parent clicks - toggle dropdown without closing menu
        const dropdownParents = document.querySelectorAll('.nav-menu li.has-dropdown > a');
        dropdownParents.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
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
        
        // Close menu only when clicking on dropdown submenu links
        const dropdownLinks = navMenu.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '☰';
                // Close all dropdowns
                document.querySelectorAll('.nav-menu li.has-dropdown').forEach(item => {
                    item.classList.remove('active');
                });
            });
        });
        
        // Close menu when clicking on non-dropdown links
        const regularLinks = navMenu.querySelectorAll('li:not(.has-dropdown) > a');
        regularLinks.forEach(link => {
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
                // Close all dropdowns
                document.querySelectorAll('.nav-menu li.has-dropdown').forEach(item => {
                    item.classList.remove('active');
                });
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
            entry.target.classList.add('animate-in');
            // Optional: unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', function() {
    // Animate features, services, blog cards, testimonials, pricing cards
    const animateElements = document.querySelectorAll('.feature, .service-item, .blog-card, .testimonial, .pricing-card, .team-member, .value, .industry-card, .service-detail-card, .factor-card, .project-type-card, .faq-item, .case-study, .testimonial-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Animate section headings
    const headings = document.querySelectorAll('section h2');
    headings.forEach((heading, index) => {
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(-20px)';
        heading.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(heading);
    });
    
    // Add counter animation for stats
    const stats = document.querySelectorAll('.stat h3, .stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (!isNaN(number) && number > 0) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = text;
                            clearInterval(timer);
                        } else {
                            const suffix = text.replace(/[0-9]/g, '');
                            target.textContent = Math.floor(current) + suffix;
                        }
                    }, 30);
                }
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
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

// WhatsApp Floating Button
const whatsappButton = document.createElement('a');
whatsappButton.href = 'https://wa.me/19177806183?text=Hi%20SuperEstimation,%20I%20need%20an%20electrical%20estimate';
whatsappButton.target = '_blank';
whatsappButton.rel = 'noopener noreferrer';
whatsappButton.className = 'whatsapp-float';
whatsappButton.setAttribute('aria-label', 'Contact us on WhatsApp');
whatsappButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
    <span class="whatsapp-tooltip">Chat with us on WhatsApp</span>
`;
document.body.appendChild(whatsappButton);

// Console message
console.log('%cSuperEstimation', 'color: #f39c12; font-size: 24px; font-weight: bold;');
console.log('%cAmerica\'s Most Trusted Electrical Estimating Company', 'color: #1a1a2e; font-size: 14px;');
console.log('Website built with care for electrical contractors across all 50 US states.');

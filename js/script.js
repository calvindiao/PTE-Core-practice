// Navigation menu toggle for mobile
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Animate elements when they come into view
const animateOnScroll = () => {
    const featureCards = document.querySelectorAll('.feature-card');
    const aboutContent = document.querySelector('.about-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements
    featureCards.forEach(card => {
        observer.observe(card);
    });
    
    if (aboutContent) observer.observe(aboutContent);
}

// Add CSS for animations
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .about-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .about-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .burger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .burger.toggle .line2 {
            opacity: 0;
        }
        
        .burger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    navSlide();
    animateOnScroll();
    
    // Add current year to footer copyright
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2023', new Date().getFullYear());
    }
}); 
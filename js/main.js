/* filepath: c:\Users\Johnb\Desktop\E-portfolio\js\main.js */
// Enhanced Portfolio JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Hero Image Slideshow
    const heroImage = document.getElementById("heroImage");
    const images = [
        "./images/froi.jpg",
        "./images/froi2.jpg",
        "./images/froi3.jpg"
    ];
    
    let currentImageIndex = 0;
    
    // Only start slideshow if heroImage exists and has multiple images
    if (heroImage && images.length > 1) {
        // Set initial image
        heroImage.src = images[0];
        
        setInterval(() => {
            // Fade out with smooth transition
            heroImage.style.opacity = 0;
            heroImage.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                // Change to next image
                currentImageIndex = (currentImageIndex + 1) % images.length;
                heroImage.src = images[currentImageIndex];
                
                // Fade in with smooth transition
                heroImage.style.opacity = 1;
                heroImage.style.transform = 'scale(1)';
            }, 500); // Half second for fade transition
        }, 4000); // Change image every 4 seconds
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetOffset = targetSection.offsetTop - navbarHeight - 20;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetOffset,
                    behavior: 'smooth'
                });
                
                // Special effect for contact button
                if (targetId === '#contact') {
                    setTimeout(() => {
                        targetSection.classList.add('highlight-section');
                        setTimeout(() => {
                            targetSection.classList.remove('highlight-section');
                        }, 2000);
                    }, 800);
                }
                
                // Close mobile menu if open
                const navLinksContainer = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                if (navLinksContainer?.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    hamburger?.classList.remove('active');
                }
            }
        });
    });

    // Profile Image Interactive Effects
    const imageContainer = document.querySelector('.image-container');
    
    if (imageContainer) {
        // 3D Tilt effect on mouse move
        imageContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / centerY * 8;
            const tiltY = (centerX - x) / centerX * 8;
            
            this.style.transform = `
                translateY(-10px) 
                scale(1.02) 
                rotateX(${tiltX}deg) 
                rotateY(${tiltY}deg)
                perspective(1000px)
            `;
        });
        
        imageContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        });
        
        // Add click effect
        imageContainer.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(1.05) rotateY(180deg)';
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
            }, 600);
        });
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinksContainer.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (hamburger && navLinksContainer && 
            !hamburger.contains(e.target) && 
            !navLinksContainer.contains(e.target)) {
            navLinksContainer.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger icon
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });

    // Intersection Observer for Fade Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade sections
    const fadeElements = document.querySelectorAll('.fade-section');
    fadeElements.forEach(el => fadeObserver.observe(el));

    // Active Navigation Highlighting
    const navbarLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    const navHighlightObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navbarLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-links a[href="#${currentSection}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    });

    // Observe sections for navigation highlighting
    sections.forEach(section => navHighlightObserver.observe(section));

    // Skill Progress Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                
                // Reset width then animate
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Typing Effect for Hero Title (Optional)
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            heroTitle.textContent += originalText[charIndex];
            charIndex++;
            
            if (charIndex >= originalText.length) {
                clearInterval(typingInterval);
            }
        }, 100);
    }

    // Form Submission Enhancement
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.innerHTML;
            
            // Add loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Reset after form submission (whether success or error)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Scroll to Top Button (Optional)
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--accent);
        color: white;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to scroll top button
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
    });

    console.log('Portfolio JavaScript loaded successfully! 🚀');
});

// Interactive Background Controller
class InteractiveBackground {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }

    init() {
        this.createParticleBackground();
        this.createGeometricShapes();
        this.addMouseInteraction();
        this.addScrollEffect();
    }

    createParticleBackground() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-background';
        
        // Create gradient background
        const gradientBg = document.createElement('div');
        gradientBg.className = 'gradient-background';
        particlesContainer.appendChild(gradientBg);

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${this.getRandomSize()}`;
            
            // Random position and delay
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            
            particlesContainer.appendChild(particle);
        }

        this.hero.insertBefore(particlesContainer, this.hero.firstChild);
    }

    createGeometricShapes() {
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'geometric-background';

        // Create random geometric shapes
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            const shapeType = ['triangle', 'circle', 'square'][Math.floor(Math.random() * 3)];
            shape.className = `shape ${shapeType}`;
            
            // Random positioning
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            shape.style.animationDelay = Math.random() * 5 + 's';
            
            shapesContainer.appendChild(shape);
        }

        this.hero.appendChild(shapesContainer);
    }

    addMouseInteraction() {
        let mouseX = 0;
        let mouseY = 0;

        this.hero.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;

            // Move particles based on mouse position
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const speed = (index % 3 + 1) * 0.5;
                const x = mouseX * speed * 20;
                const y = mouseY * speed * 20;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });

            // Tilt shapes based on mouse position
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const tiltX = (mouseY - 0.5) * 20;
                const tiltY = (mouseX - 0.5) * 20;
                
                shape.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
        });

        // Reset on mouse leave
        this.hero.addEventListener('mouseleave', () => {
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.transform = 'translate(0, 0)';
            });

            const shapes = document.querySelectorAll('.shape');
            shapes.forEach(shape => {
                shape.style.transform = 'rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    addScrollEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;

            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const speed = (index % 3 + 1) * 0.3;
                particle.style.transform = `translateY(${parallax * speed}px)`;
            });
        });
    }

    getRandomSize() {
        const sizes = ['small', 'medium', 'large'];
        return sizes[Math.floor(Math.random() * sizes.length)];
    }
}

// Initialize interactive background when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize interactive background
    new InteractiveBackground();
    
    // Add click effects to particles
    document.addEventListener('click', function(e) {
        createClickEffect(e.clientX, e.clientY);
    });
});

// Create ripple effect on click
function createClickEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 1000;
        animation: ripple 1s ease-out forwards;
    `;

    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            margin-left: -100px;
            margin-top: -100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

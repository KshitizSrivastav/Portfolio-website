// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Smooth scrolling for navigation links with custom easing
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Use simpler calculation with CSS scroll-margin-top doing the heavy lifting
                    const targetPosition = targetSection.offsetTop - 90; // Match scroll-margin-top value
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = Math.abs(distance) > 1000 ? 1200 : 800; // Longer duration for longer distances
                    let start = null;

                    function smoothScrollStep(timestamp) {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const percentage = Math.min(progress / duration, 1);
                        
                        // Ease-in-out cubic function for smoother animation
                        const ease = percentage < 0.5 
                            ? 4 * percentage * percentage * percentage 
                            : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
                        
                        window.scrollTo(0, startPosition + (distance * ease));
                        
                        if (progress < duration) {
                            window.requestAnimationFrame(smoothScrollStep);
                        }
                    }
                    
                    window.requestAnimationFrame(smoothScrollStep);
                }
            }
            
            // Close mobile menu when clicking on a link
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active navigation link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120; // Adjusted to match scroll positioning

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Initial check
    updateActiveLink();

    // Navbar background remains consistent (no color change on scroll)

    // Advanced scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Apply different animations based on element class or data attribute
                if (element.classList.contains('skill-category')) {
                    element.classList.add('fade-in-up');
                } else if (element.classList.contains('project-card')) {
                    element.classList.add('fade-in-scale');
                } else if (element.classList.contains('about-text')) {
                    element.classList.add('fade-in-left');
                } else if (element.classList.contains('contact-info')) {
                    element.classList.add('fade-in-left');
                } else if (element.classList.contains('contact-form')) {
                    element.classList.add('fade-in-right');
                } else if (element.classList.contains('resume-section')) {
                    element.classList.add('slide-in-bottom');
                } else {
                    element.classList.add('fade-in-up');
                }
                
                // Stop observing this element
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements for animation with staggered delays
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .about-text, .contact-info, .contact-form, .resume-section');
    animateElements.forEach((el, index) => {
        // Add staggered delay for elements in the same container
        const container = el.closest('section');
        const siblingElements = container ? container.querySelectorAll('.skill-category, .project-card') : [el];
        const siblingIndex = Array.from(siblingElements).indexOf(el);
        
        if (siblingIndex > 0) {
            el.style.animationDelay = `${siblingIndex * 0.2}s`;
        }
        
        animationObserver.observe(el);
    });

    // Animate skill tags with wave effect
    function animateSkillTags() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const tags = entry.target.querySelectorAll('.skill-tag');
                        tags.forEach((tag, index) => {
                            setTimeout(() => {
                                tag.style.transform = 'translateY(0) scale(1)';
                                tag.style.animation = 'fadeInUp 0.6s ease-out forwards';
                            }, index * 100);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            // Set initial state for skill tags - removed opacity hiding
            const tags = category.querySelectorAll('.skill-tag');
            tags.forEach(tag => {
                tag.style.transform = 'translateY(20px) scale(0.8)';
            });
            
            observer.observe(category);
        });
    }

    // Initialize skill tag animations
    animateSkillTags();

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Check if using Netlify Forms (has netlify attribute)
            const hasNetlifyAttr = this.hasAttribute('netlify');
            
            if (hasNetlifyAttr) {
                // Using Netlify Forms - add enhanced handling
                showNotification('Sending message...', 'info');
                
                // Add a timeout fallback in case redirect fails
                setTimeout(() => {
                    // Check if still on the same page after 3 seconds
                    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                        // Manually redirect to thank you page
                        window.location.href = './thank-you.html';
                    }
                }, 3000);
                
                return; // Let the form submit normally to Netlify
            }
            
            // Fallback for local testing/development
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Show message for local testing
            showNotification('Form validation passed! Deploy to Netlify to receive real emails. Check EMAIL-SETUP.md for instructions.', 'info');
            this.reset();
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // Close button styles
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            removeNotification(notification);
        }, 5000);

        // Manual close
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            removeNotification(notification);
        });
    }

    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Enhanced typing effect for hero title with smoother transitions
    function createTypewriterEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const texts = [
            "Hi, I'm <span class='highlight'>Kshitiz Srivastav</span>",
            "I'm a <span class='highlight'>Software Engineer</span>",
            "I'm a <span class='highlight'>Full Stack Developer</span>"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 70;        // Slightly faster typing
        const deleteSpeed = 35;      // Faster deletion
        const pauseDelay = 2500;     // Reduced pause to read the text
        const initialDelay = 800;    // Reduced delay before starting

        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                // Remove characters smoothly
                charIndex--;
                const displayText = currentText.substring(0, charIndex);
                heroTitle.innerHTML = displayText;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(typeWriter, 300); // Brief pause before typing next text
                } else {
                    setTimeout(typeWriter, deleteSpeed);
                }
            } else {
                // Add characters smoothly
                charIndex++;
                const displayText = currentText.substring(0, charIndex);
                heroTitle.innerHTML = displayText;
                
                if (charIndex === currentText.length) {
                    // Only delete if it's not the first text (name)
                    if (textIndex === 0) {
                        // Stay on name for a bit longer, then move to next
                        setTimeout(() => {
                            textIndex = 1;
                            charIndex = 0;
                            setTimeout(typeWriter, 200);
                        }, pauseDelay);
                    } else {
                        isDeleting = true;
                        setTimeout(typeWriter, pauseDelay);
                    }
                } else {
                    setTimeout(typeWriter, typeSpeed);
                }
            }
        }

        // Start the effect with initial delay
        setTimeout(() => {
            typeWriter();
        }, initialDelay);
    }

    // Initialize typing effect
    createTypewriterEffect();

    // Enhanced scroll parallax without tilt effects - Fixed
    let scrollY = 0;
    let mouseXNormalized = 0;
    let mouseYNormalized = 0;
    
    window.addEventListener('scroll', function() {
        scrollY = window.pageYOffset;
    });
    
    document.addEventListener('mousemove', function(e) {
        mouseXNormalized = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseYNormalized = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animateScrollParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            // Simple parallax for hero without tilt
            const scrollRate = scrollY * -0.2;
            hero.style.transform = `translateY(${scrollRate}px)`;
        }
        
        // Gentle parallax for other sections without tilt
        const sections = document.querySelectorAll('.about, .skills, .projects, .contact');
        sections.forEach((section, index) => {
            const rate = scrollY * (0.05 + index * 0.02);
            section.style.transform = `translateY(${rate * -1}px)`;
        });
        
        requestAnimationFrame(animateScrollParallax);
    }
    
    animateScrollParallax();

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill tags animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('fade-in-up');
    });

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h3');
        
        counters.forEach(counter => {
            const target = parseInt(counter.innerText.replace(/\D/g, ''));
            const suffix = counter.innerText.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 100;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.innerText = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + suffix;
                }
            };
            
            // Start animation when element comes into view
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            
            counterObserver.observe(counter.parentElement);
        });
    }

    // Initialize counter animation
    animateCounters();

    // Smooth reveal animations - Fixed to not hide content initially
    const revealElements = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'transform 0.6s ease';
        revealObserver.observe(el);
    });

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #2563eb, #7c3aed);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
        transform: translateY(100px);
        transition: transform 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.transform = 'translateY(100px)';
        }
    });

    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Resume download tracking
    const resumeLinks = document.querySelectorAll('a[download*="resume"], a[download*="Resume"]');
    resumeLinks.forEach(link => {
        link.addEventListener('click', function() {
            const fileName = this.getAttribute('download') || 'Resume';
            showNotification(`Downloading ${fileName}...`, 'info');
            
            // Optional: Track download analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'Resume',
                    'event_label': fileName
                });
            }
        });
    });

    // Check if resume file exists and show appropriate message
    function checkResumeFile() {
        const resumeLinks = document.querySelectorAll('a[href*="resume.pdf"]');
        resumeLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // You can add more sophisticated file checking here
                // For now, we'll assume the file exists if the link is clicked
                const href = this.getAttribute('href');
                if (!href || href === 'resume/resume.pdf') {
                    // Check if this is a placeholder link
                    fetch(href, { method: 'HEAD' })
                        .then(response => {
                            if (!response.ok) {
                                e.preventDefault();
                                showNotification('Resume file not found. Please add your resume.pdf file to the resume folder.', 'error');
                            }
                        })
                        .catch(() => {
                            // File check failed, but don't prevent download attempt
                            console.log('Could not verify resume file existence');
                        });
                }
            });
        });
    }

    // Initialize resume file checking
    checkResumeFile();

    // Standard cursor with pointer for interactive elements
    function setupStandardCursor() {
        // Ensure body uses default cursor
        document.body.style.cursor = 'default';
        
        // Set pointer cursor for interactive elements
        const interactiveSelectors = [
            'a', 'button', '.btn', '.skill-tag', '.project-card', '.social-link', 
            '.nav-link', '.nav-toggle', '.back-to-top', '.resume-download', 
            '.notification-close', 'input[type="submit"]', 'input[type="button"]',
            '[role="button"]', '[onclick]', '.hamburger', '.close'
        ];
        
        const interactiveElements = document.querySelectorAll(interactiveSelectors.join(', '));
        
        interactiveElements.forEach(element => {
            element.style.cursor = 'pointer';
        });
        
        // Set text cursor for text inputs
        const textElements = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
        textElements.forEach(element => {
            element.style.cursor = 'text';
        });
        
        // Add event listener for dynamically added elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        const newInteractiveElements = node.querySelectorAll ? 
                            node.querySelectorAll(interactiveSelectors.join(', ')) : [];
                        
                        newInteractiveElements.forEach(element => {
                            element.style.cursor = 'pointer';
                        });
                        
                        // Check if the node itself is interactive
                        if (node.matches && node.matches(interactiveSelectors.join(', '))) {
                            node.style.cursor = 'pointer';
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Gentle mouse-based parallax effect (no tilt)
    function createGentleMouseParallax() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });
        
        function animateGentleParallax() {
            // Very subtle parallax for hero image
            const heroImage = document.querySelector('.hero-image img');
            if (heroImage) {
                const intensity = 3; // Reduced intensity
                heroImage.style.transform = `translate(${mouseX * intensity}px, ${mouseY * intensity}px)`;
            }
            
            // Minimal parallax for floating elements only
            const socialLinks = document.querySelectorAll('.social-link');
            socialLinks.forEach((link, index) => {
                const intensity = 2;
                const offsetX = mouseX * intensity * Math.sin(index);
                const offsetY = mouseY * intensity * Math.cos(index);
                link.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
            
            requestAnimationFrame(animateGentleParallax);
        }
        
        animateGentleParallax();
    }
    
    // Mouse magnetic effect for buttons
    function createMagneticEffect() {
        const magneticElements = document.querySelectorAll('.btn, .resume-download, .social-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) * 0.15;
                const deltaY = (e.clientY - centerY) * 0.15;
                
                element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }
    
    // Ripple effect on click
    function createRippleEffect() {
        const clickableElements = document.querySelectorAll('.btn, .skill-tag, .project-card, .social-link');
        
        clickableElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                // Ensure element has relative positioning
                const originalPosition = element.style.position;
                if (getComputedStyle(element).position === 'static') {
                    element.style.position = 'relative';
                }
                element.style.overflow = 'hidden';
                
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                    if (originalPosition) {
                        element.style.position = originalPosition;
                    }
                }, 600);
            });
        });
    }
    
    // Add ripple animation to CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Initialize subtle mouse effects (desktop only)
    if (window.innerWidth > 768) {
        setupStandardCursor();
        createGentleMouseParallax();
        createMagneticEffect();
    } else {
        setupStandardCursor();
    }
    
    // Initialize ripple effect for all devices
    createRippleEffect();
    
    // Particle effect for hero section
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;
        
        hero.appendChild(particleContainer);
        
        for (let i = 0; i < 50; i++) {
            createParticle(particleContainer);
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${duration}s linear ${delay}s infinite;
        `;
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                createParticle(container);
            }
        }, (duration + delay) * 1000);
    }
    
    // Add particle animation keyframes to CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Initialize particles
    createParticles();

    // Dynamic background gradient that follows mouse
    function createDynamicBackground() {
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        
        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX / window.innerWidth;
            targetY = e.clientY / window.innerHeight;
        });
        
        function updateBackground() {
            // Smooth interpolation
            mouseX += (targetX - mouseX) * 0.02;
            mouseY += (targetY - mouseY) * 0.02;
            
            // Update hero background
            const hero = document.querySelector('.hero');
            if (hero) {
                const x = mouseX * 100;
                const y = mouseY * 100;
                hero.style.background = `
                    radial-gradient(circle at ${x}% ${y}%, 
                        rgba(102, 126, 234, 0.9) 0%, 
                        rgba(118, 75, 162, 0.8) 50%, 
                        rgba(37, 99, 235, 0.7) 100%),
                    linear-gradient(135deg, #667eea 0%, #764ba2 100%)
                `;
            }
            
            // Update other sections with subtle effects
            const aboutSection = document.querySelector('.about');
            if (aboutSection) {
                const x = mouseX * 50 + 25;
                const y = mouseY * 50 + 25;
                aboutSection.style.background = `
                    radial-gradient(ellipse at ${x}% ${y}%, 
                        rgba(248, 250, 252, 1) 0%, 
                        rgba(241, 245, 249, 0.95) 100%)
                `;
            }
            
            const projectsSection = document.querySelector('.projects');
            if (projectsSection) {
                const x = 100 - mouseX * 50;
                const y = 100 - mouseY * 50;
                projectsSection.style.background = `
                    radial-gradient(ellipse at ${x}% ${y}%, 
                        rgba(248, 250, 252, 1) 0%, 
                        rgba(241, 245, 249, 0.98) 100%)
                `;
            }
            
            requestAnimationFrame(updateBackground);
        }
        
        updateBackground();
    }
    
    // Mouse velocity-based effects
    function createVelocityEffects() {
        let lastMouseX = 0;
        let lastMouseY = 0;
        let lastTime = Date.now();
        let velocity = 0;
        
        document.addEventListener('mousemove', (e) => {
            const currentTime = Date.now();
            const deltaTime = currentTime - lastTime;
            const deltaX = e.clientX - lastMouseX;
            const deltaY = e.clientY - lastMouseY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            velocity = distance / deltaTime;
            
            // Apply velocity-based effects to skill tags
            const skillTags = document.querySelectorAll('.skill-tag');
            const maxRotation = Math.min(velocity * 10, 15);
            
            skillTags.forEach((tag, index) => {
                const direction = index % 2 === 0 ? 1 : -1;
                const rotation = maxRotation * direction;
                tag.style.transform = `rotate(${rotation}deg) scale(${1 + velocity * 0.1})`;
                
                setTimeout(() => {
                    if (!tag.matches(':hover')) {
                        tag.style.transform = 'rotate(0deg) scale(1)';
                    }
                }, 200);
            });
            
            // Apply velocity-based glow to project cards
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                const glowIntensity = Math.min(velocity * 20, 30);
                card.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.1), 0 0 ${glowIntensity}px rgba(37, 99, 235, ${velocity * 0.3})`;
                
                setTimeout(() => {
                    if (!card.matches(':hover')) {
                        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                    }
                }, 300);
            });
            
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            lastTime = currentTime;
        });
    }
    
    // Initialize advanced effects (desktop only)
    if (window.innerWidth > 768) {
        createDynamicBackground();
        createVelocityEffects();
    }
});

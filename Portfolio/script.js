  // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll animation observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple form validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });

        // Add hover effects to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-10px) scale(1)';
            });
        });

        // Add hover effects to skill cards
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                this.style.color = 'white';
                this.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.background = 'var(--card-bg)';
                this.style.color = 'var(--text-color)';
                this.style.transform = 'translateY(-10px) scale(1)';
            });
        });

        // Typing effect for hero subtitle
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Start typing effect when page loads
        window.addEventListener('load', () => {
            const subtitle = document.querySelector('.hero .subtitle');
            const originalText = subtitle.textContent;
            setTimeout(() => {
                typeWriter(subtitle, originalText, 100);
            }, 1000);
        });

        // Mobile menu toggle (basic functionality)
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            // This would typically show/hide a mobile menu
            // For this demo, we'll just show an alert
            alert('Mobile menu would open here! Add your mobile navigation logic.');
        });

        // Add particle effect to hero background
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat 15s linear infinite;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            
            return particle;
        }

        // Add CSS for particle animation
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes particleFloat {
                from {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                to {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);

        // Create particles
        function initParticles() {
            const hero = document.querySelector('.hero');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                setTimeout(() => {
                    const particle = createParticle();
                    hero.appendChild(particle);
                    
                    // Remove particle after animation
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }, 15000);
                }, i * 300);
            }
        }

        // Start particles when page loads
        window.addEventListener('load', () => {
            initParticles();
            
            // Recreate particles periodically
            setInterval(initParticles, 15000);
        });

        // Add scroll progress indicator
        function createScrollProgress() {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0;
                height: 3px;
                background: linear-gradient(90deg, #6366f1, #8b5cf6);
                z-index: 9999;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(progressBar);
            
            window.addEventListener('scroll', () => {
                const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                progressBar.style.width = scrolled + '%';
            });
        }

        createScrollProgress();

        // Add loading animation
        function showPageLoader() {
            const loader = document.createElement('div');
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease;
                color: white;
                font-size: 2rem;
                font-weight: bold;
            `;
            loader.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">👨‍💻</div>
                    <div>Loading Portfolio...</div>
                </div>
            `;
            document.body.appendChild(loader);
            
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        if (loader.parentNode) {
                            loader.parentNode.removeChild(loader);
                        }
                    }, 500);
                }, 1000);
            });
        }

        showPageLoader();

        // Easter egg: Konami code
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            konamiCode = konamiCode.slice(-10);
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                // Activate rainbow mode
                document.body.style.animation = 'rainbow 2s infinite';
                
                const rainbowStyle = document.createElement('style');
                rainbowStyle.textContent = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(rainbowStyle);
                
                setTimeout(() => {
                    document.body.style.animation = '';
                    if (rainbowStyle.parentNode) {
                        rainbowStyle.parentNode.removeChild(rainbowStyle);
                    }
                }, 4000);
                
                alert('🌈 Rainbow mode activated! You found the easter egg!');
            }
        });

        // Add dynamic greeting based on time
        function updateGreeting() {
            const hour = new Date().getHours();
            const heroTitle = document.querySelector('.hero h1');
            let greeting = '';
            
            if (hour < 12) {
                greeting = 'Good Morning! I\'m ';
            } else if (hour < 18) {
                greeting = 'Good Afternoon! I\'m ';
            } else {
                greeting = 'Good Evening! I\'m ';
            }
            
            heroTitle.textContent = greeting + 'Alex Developer';
        }

        updateGreeting();
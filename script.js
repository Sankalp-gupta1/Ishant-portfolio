document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        const lines = this.querySelectorAll('.line');
        if (this.classList.contains('active')) {
            lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            lines[0].style.transform = 'rotate(0) translate(0)';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'rotate(0) translate(0)';
        }
    });

    // Hamburger accessibility with keyboard
    hamburger.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const lines = hamburger.querySelectorAll('.line');
            lines[0].style.transform = 'rotate(0) translate(0)';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'rotate(0) translate(0)';
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (targetElement.scrollIntoView) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animate skill bars
    const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress');

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width') || '0%';
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.transition = 'width 1s ease';
                bar.style.width = targetWidth;
            }, 100);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (skillsSection) observer.observe(skillsSection);

    // Form submit
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            console.log('Form submitted:', data);

            const successMsg = document.createElement('p');
            successMsg.textContent = 'Thank you! Your message has been sent.';
            successMsg.style.color = 'green';
            successMsg.style.marginTop = '10px';
            this.appendChild(successMsg);

            setTimeout(() => {
                successMsg.remove();
            }, 5000);

            this.reset();
        });
    }

    // Initial fade-in
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// FOUC prevention
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

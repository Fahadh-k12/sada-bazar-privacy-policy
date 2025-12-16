// ===========================
// Main JavaScript for Sada Bazar Website
// ===========================

// ===========================
// Mobile Menu Toggle
// ===========================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// ===========================
// Smooth Scroll
// ===========================
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

// ===========================
// Play Store Link Handler
// ===========================
const playstoreButtons = document.querySelectorAll('[href="https://play.google.com/store"]');

playstoreButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        showPlayStoreMessage();
    });
});

function showPlayStoreMessage() {
    const message = document.createElement('div');
    message.className = 'playstore-message';
    message.innerHTML = `
        <div class="message-content">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="8" r="1" fill="currentColor"/>
            </svg>
            <p>The app will be available on Play Store soon!</p>
            <button onclick="this.parentElement.parentElement.remove()">Got it</button>
        </div>
    `;
    document.body.appendChild(message);

    setTimeout(() => {
        if (message.parentElement) {
            message.remove();
        }
    }, 5000);
}

// ===========================
// Contact Form Handler
// ===========================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simulate form submission
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');

        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            formSuccess.classList.remove('show');
        }, 5000);
    });
}

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with animation
document.querySelectorAll('.feature-card, .mv-card, .faq-item, .small-feature-card').forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(element);
});

// ===========================
// Header Scroll Effect
// ===========================
const navbar = document.querySelector('.navbar') || document.querySelector('.header');

if (navbar) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });
}

// ===========================
// Copy Email to Clipboard
// ===========================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const email = this.href.replace('mailto:', '');

        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showCopyNotification(this, 'Email copied to clipboard!');
            }).catch(err => {
                console.log('Could not copy email:', err);
            });
        }
    });
});

function showCopyNotification(element, message) {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;

    const rect = element.getBoundingClientRect();
    notification.style.position = 'fixed';
    notification.style.top = `${rect.top - 40}px`;
    notification.style.left = `${rect.left}px`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(-10px)';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ===========================
// Parallax Effect for Background Orbs
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        orb.style.transform = `translateY(${yPos}px)`;
    });
});

// ===========================
// Active Navigation Link
// ===========================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinksElements = document.querySelectorAll('.nav-link');

    navLinksElements.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'home.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Set active link on page load
setActiveNavLink();

// ===========================
// Add Dynamic Styles
// ===========================
const style = document.createElement('style');
style.textContent = `
    .playstore-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(20px);
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: messageSlideIn 0.3s ease-out;
    }
    
    .message-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        color: white;
        text-align: center;
        max-width: 300px;
    }
    
    .message-content svg {
        width: 48px;
        height: 48px;
        color: #667eea;
    }
    
    .message-content p {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
    }
    
    .message-content button {
        padding: 0.75rem 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .message-content button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
    
    @keyframes messageSlideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    .copy-notification {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        font-size: 0.875rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(0);
        transition: all 0.3s ease;
        pointer-events: none;
        z-index: 10000;
        white-space: nowrap;
    }
    
    .nav-links.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-radius: 0 0 1rem 1rem;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(style);

// ===========================
// Console Easter Egg
// ===========================
console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cSada Bazar - Fresh Groceries Delivered', 'font-size: 14px; color: #764ba2;');
console.log('%cDeveloped by Abdul Haseeb', 'font-size: 12px; color: #6b7280;');
console.log('%cInterested in working together? Contact: developfahadbest@gmail.com', 'font-size: 12px; color: #4facfe;');

// ===========================
// Initialize
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sada Bazar website loaded successfully! ✨');
    document.body.classList.add('loaded');
});

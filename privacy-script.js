// ===========================
// Smooth Scroll Enhancement
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
const playstoreLink = document.getElementById('playstore-link');

// Update this with your actual Play Store URL when available
const PLAYSTORE_URL = 'https://play.google.com/store/apps/details?id=com.sadabazar.app';

if (playstoreLink) {
    playstoreLink.addEventListener('click', function(e) {
        // Check if the URL is still the placeholder
        if (this.href === 'https://play.google.com/store') {
            e.preventDefault();
            
            // Show a friendly message
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
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (message.parentElement) {
                    message.remove();
                }
            }, 5000);
        }
        // If you have the actual URL, it will navigate normally
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

// Observe all policy sections
document.querySelectorAll('.policy-section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(section);
});

// ===========================
// Header Scroll Effect
// ===========================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 10) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===========================
// Copy Email to Clipboard
// ===========================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Allow default mailto behavior, but also copy to clipboard
        const email = this.href.replace('mailto:', '');
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showCopyNotification(this);
            }).catch(err => {
                console.log('Could not copy email:', err);
            });
        }
    });
});

function showCopyNotification(element) {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = 'Email copied to clipboard!';
    
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
// Section Number Animation
// ===========================
const sectionNumbers = document.querySelectorAll('.section-number');

const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'scaleIn 0.5s ease-out forwards';
        }
    });
}, { threshold: 0.5 });

sectionNumbers.forEach(number => {
    numberObserver.observe(number);
});

// Add scaleIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes scaleIn {
        from {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
        }
        to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
    
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
`;
document.head.appendChild(style);

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
// Performance Optimization
// ===========================
// Lazy load images if any are added later
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===========================
// Console Easter Egg
// ===========================
console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cSada Bazar Privacy Policy Page', 'font-size: 14px; color: #764ba2;');
console.log('%cDeveloped by Abdul Haseeb', 'font-size: 12px; color: #6b7280;');
console.log('%cInterested in working together? Contact: developfahadbest@gmail.com', 'font-size: 12px; color: #4facfe;');

// ===========================
// Initialize
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Privacy Policy page loaded successfully! ✨');
    
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
});

// ==================== PARALLAX EFFECT ====================
const heroBackground = document.getElementById('heroBackground');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// ==================== FLOATING HEARTS ====================
const floatingHeartsContainer = document.getElementById('floatingHearts');
const heartSVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

if (floatingHeartsContainer) {
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = heartSVG;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.width = `${Math.random() * 20 + 20}px`;
        heart.style.height = heart.style.width;
        heart.style.animationDuration = `${Math.random() * 10 + 15}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        floatingHeartsContainer.appendChild(heart);
    }
}

// ==================== AUDIO PLAYER ====================
const audioBtn = document.getElementById('audioBtn');
const audioPrompt = document.getElementById('audioPrompt');
const bgMusic = document.getElementById('bgMusic');
const playIcon = document.getElementById('playIcon');
const soundWaves = document.getElementById('soundWaves');
let isPlaying = false;

if (audioBtn && bgMusic) {
    audioBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            audioBtn.classList.remove('playing');
            playIcon.style.display = 'block';
            soundWaves.style.display = 'none';
        } else {
            bgMusic.play().catch(e => console.log('Audio play failed:', e));
            audioBtn.classList.add('playing');
            playIcon.style.display = 'none';
            soundWaves.style.display = 'flex';
            if (audioPrompt) audioPrompt.classList.add('hidden');
        }
        isPlaying = !isPlaying;
    });
}

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '-50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe timeline items, promise cards, and shayri items with delay
document.querySelectorAll('[data-animate]').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(el);
});

// ==================== CAROUSEL ====================
const carousel = document.getElementById('carousel');
const carouselDots = document.getElementById('carouselDots');

if (carousel && carouselDots) {
    const cards = carousel.querySelectorAll('.carousel-card');
    let currentIndex = 0;

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot${index === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => scrollToCard(index));
        carouselDots.appendChild(dot);
    });

    function scrollToCard(index) {
        const cardWidth = cards[0].offsetWidth + 24;
        carousel.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
    }

    function updateDots() {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 24;
        currentIndex = Math.round(scrollLeft / cardWidth);
        
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    carousel.addEventListener('scroll', updateDots);
}

// ==================== EIDI REVEAL & CONFETTI ====================
const giftBoxBtn = document.getElementById('giftBoxBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const acceptBtn = document.getElementById('acceptBtn');
const confettiContainer = document.getElementById('confetti');

// Create sparkles around the gift box
function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles');
    if (!sparklesContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 3}s`;
        sparkle.style.animationDuration = `${2 + Math.random() * 2}s`;
        sparklesContainer.appendChild(sparkle);
    }
}

// Initialize sparkles
createSparkles();

function createConfetti() {
    if (!confettiContainer) return;
    
    const colors = ['#FFE4E1', '#E91E63', '#FFD700', '#F8BBD9', '#FF69B4', '#FFC107', '#FFC0CB', '#AD1457'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = confetti.style.width;
        
        confettiContainer.appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate([
            { 
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: 1
            },
            { 
                transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 2000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            delay: Math.random() * 500
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Gift box click handler with opening animation
if (giftBoxBtn && modalOverlay) {
    giftBoxBtn.addEventListener('click', () => {
        // Add opening animation to the gift lid
        const giftLid = giftBoxBtn.querySelector('.gift-lid');
        const giftHeart = giftBoxBtn.querySelector('.gift-heart');
        
        if (giftLid) {
            giftLid.style.transform = 'translateY(-80px) rotate(-15deg)';
            giftLid.style.opacity = '0';
        }
        
        if (giftHeart) {
            giftHeart.style.transform = 'scale(2) translateY(-30px)';
            giftHeart.style.opacity = '1';
        }
        
        // Delay modal opening for dramatic effect
        setTimeout(() => {
            createConfetti();
            modalOverlay.classList.add('active');
            
            // Reset gift box after modal opens
            setTimeout(() => {
                if (giftLid) {
                    giftLid.style.transform = '';
                    giftLid.style.opacity = '';
                }
                if (giftHeart) {
                    giftHeart.style.transform = '';
                    giftHeart.style.opacity = '';
                }
            }, 500);
        }, 600);
    });
}

function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (acceptBtn) acceptBtn.addEventListener('click', closeModal);
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

// ==================== EMOJI ANIMATIONS ====================
document.querySelectorAll('.carousel-emoji').forEach((emoji, index) => {
    setInterval(() => {
        emoji.style.transform = 'rotate(10deg)';
        setTimeout(() => {
            emoji.style.transform = 'rotate(-10deg)';
            setTimeout(() => {
                emoji.style.transform = 'rotate(0deg)';
            }, 200);
        }, 200);
    }, 2000 + index * 200);
});

// ==================== INITIAL VISIBILITY CHECK ====================
setTimeout(() => {
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            section.classList.add('visible');
        }
    });
}, 100);

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

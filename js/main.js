// ==================== FLOATING PETALS ====================
function createFloatingPetals() {
    const container = document.getElementById('floatingPetals');
    if (!container) return;
    
    const colors = ['#FFE4EC', '#FBCFE8', '#F9A8D4', '#FFF0F3'];
    
    for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];
        petal.style.width = `${Math.random() * 8 + 8}px`;
        petal.style.height = petal.style.width;
        petal.style.animationDuration = `${Math.random() * 10 + 12}s`;
        petal.style.animationDelay = `${Math.random() * 8}s`;
        container.appendChild(petal);
    }
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ==================== AUDIO PLAYER ====================
const audioBtn = document.getElementById('audioBtn');
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
        }
        isPlaying = !isPlaying;
    });
}

// ==================== GIFT BOX & MODAL ====================
const giftBoxBtn = document.getElementById('giftBoxBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const acceptBtn = document.getElementById('acceptBtn');
const confettiContainer = document.getElementById('confetti');

function createConfetti() {
    if (!confettiContainer) return;
    const colors = ['#EC4899', '#F9A8D4', '#FBCFE8', '#FFE4EC', '#DB2777', '#FFB6C1'];
    
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        const size = Math.random() * 10 + 5;
        confetti.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -10px;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        `;
        confettiContainer.appendChild(confetti);
        
        confetti.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            delay: Math.random() * 400
        }).onfinish = () => confetti.remove();
    }
}

if (giftBoxBtn && modalOverlay) {
    giftBoxBtn.addEventListener('click', () => {
        createConfetti();
        modalOverlay.classList.add('active');
    });
}

function closeModal() {
    modalOverlay?.classList.remove('active');
}

modalClose?.addEventListener('click', closeModal);
acceptBtn?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ==================== FLOATING HEARTS ON CLICK ====================
function createClickHeart(x, y) {
    const hearts = ['💕', '💖', '💗', '💓', '❤️', '🌸', '✨'];
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
}

// Add hearts on click/tap anywhere
document.addEventListener('click', (e) => {
    // Create 2-3 hearts per click
    for (let i = 0; i < Math.floor(Math.random() * 2) + 2; i++) {
        setTimeout(() => {
            createClickHeart(
                e.clientX + (Math.random() - 0.5) * 40,
                e.clientY + (Math.random() - 0.5) * 40
            );
        }, i * 100);
    }
});

// ==================== SHAYRI CARD TAP INTERACTION ====================
document.querySelectorAll('.shayri-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('tapped');
        
        // Create sparkle effect
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                const rect = this.getBoundingClientRect();
                sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
                sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
                sparkle.style.background = ['#EC4899', '#F9A8D4', '#FFE4EC'][Math.floor(Math.random() * 3)];
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 800);
            }, i * 50);
        }
    });
});

// ==================== LOVE COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Counter observer
const counterSection = document.getElementById('counter');
let countersAnimated = false;

if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounter(document.getElementById('msgCounter'), 1000, 2500);
                animateCounter(document.getElementById('thoughtCounter'), 9999, 3000);
                animateCounter(document.getElementById('smileCounter'), 500, 2000);
                animateCounter(document.getElementById('duaCounter'), 100, 1500);
            }
        });
    }, { threshold: 0.3 });
    
    counterObserver.observe(counterSection);
}

// Counter items tap effect - increment on tap
document.querySelectorAll('.counter-item').forEach(item => {
    item.addEventListener('click', function() {
        const counter = this.querySelector('.counter-number');
        const currentVal = parseInt(counter.textContent.replace(/[^0-9]/g, '')) || 0;
        counter.textContent = (currentVal + 1).toLocaleString() + '+';
        
        // Pop animation
        this.style.transform = 'scale(1.1)';
        setTimeout(() => this.style.transform = '', 200);
    });
});

// ==================== SCRATCH CARD ====================
const scratchCard = document.getElementById('scratchCard');
const scratchOverlay = document.getElementById('scratchOverlay');

if (scratchCard && scratchOverlay) {
    scratchCard.addEventListener('click', () => {
        scratchOverlay.classList.add('revealed');
        
        // Create celebration effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createClickHeart(
                    scratchCard.getBoundingClientRect().left + Math.random() * scratchCard.offsetWidth,
                    scratchCard.getBoundingClientRect().top + Math.random() * scratchCard.offsetHeight
                );
            }, i * 50);
        }
    });
}

// ==================== LOVE QUIZ ====================
document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function() {
        const isCorrect = this.dataset.correct === 'true';
        
        // Remove previous selections
        document.querySelectorAll('.quiz-option').forEach(o => {
            o.classList.remove('selected', 'correct');
        });
        
        this.classList.add('selected');
        
        if (isCorrect) {
            this.classList.add('correct');
            document.getElementById('quizResult').classList.add('show');
            
            // Celebration!
            createConfetti();
        }
    });
});

// ==================== DOUBLE TAP FOR BIG HEART ====================
let lastTap = 0;
document.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 300 && tapLength > 0) {
        // Double tap detected!
        const bigHeart = document.createElement('div');
        bigHeart.className = 'big-heart-pop';
        bigHeart.textContent = '❤️';
        document.body.appendChild(bigHeart);
        setTimeout(() => bigHeart.remove(), 1000);
        
        e.preventDefault();
    }
    lastTap = currentTime;
});

// ==================== FEELING CARD SOUNDS (HAPTIC FEEDBACK) ====================
document.querySelectorAll('.feeling-card').forEach(card => {
    card.addEventListener('click', function() {
        // Visual feedback
        const icon = this.querySelector('.feeling-icon');
        if (icon) {
            icon.style.transform = 'scale(1.5) rotate(15deg)';
            setTimeout(() => icon.style.transform = '', 400);
        }
        
        // Try haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });
});

// ==================== SPARKLE TRAIL ON TOUCH MOVE ====================
let sparkleTimeout;
document.addEventListener('touchmove', (e) => {
    if (sparkleTimeout) return;
    
    sparkleTimeout = setTimeout(() => {
        const touch = e.touches[0];
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = touch.clientX + 'px';
        sparkle.style.top = touch.clientY + 'px';
        sparkle.style.width = '6px';
        sparkle.style.height = '6px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
        sparkleTimeout = null;
    }, 50);
});

// ==================== HERO SECTION TAP ANIMATION ====================
const heroHeart = document.querySelector('.hero-heart');
if (heroHeart) {
    heroHeart.addEventListener('click', () => {
        heroHeart.style.transform = 'scale(1.5)';
        heroHeart.style.transition = 'transform 0.3s';
        
        // Burst of hearts
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const rect = heroHeart.getBoundingClientRect();
                createClickHeart(
                    rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
                    rect.top + rect.height / 2 + (Math.random() - 0.5) * 100
                );
            }, i * 80);
        }
        
        setTimeout(() => heroHeart.style.transform = '', 300);
    });
}

// ==================== LETTER PAPER UNFOLD EFFECT ====================
const letterPaper = document.querySelector('.letter-paper');
if (letterPaper) {
    letterPaper.addEventListener('click', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 20px 60px rgba(236, 72, 153, 0.2)';
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '';
        }, 300);
    });
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingPetals();
    initScrollAnimations();
    
    // Add touch-friendly class to body
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});

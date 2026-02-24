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

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingPetals();
    initScrollAnimations();
});

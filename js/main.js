// ==================== FLASH CARD NAVIGATION ====================
const sections = document.querySelectorAll('.slide-card');
let currentSlide = 0;
let isAnimating = false;
const totalSlides = sections.length;

// Create navigation
function createNavDots() {
    const navContainer = document.createElement('div');
    navContainer.className = 'slide-nav';
    navContainer.innerHTML = `
        <button class="nav-arrow nav-prev" id="navPrev">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        </button>
        <div class="nav-dots" id="navDots"></div>
        <button class="nav-arrow nav-next" id="navNext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </button>
    `;
    document.body.appendChild(navContainer);

    const dotsContainer = document.getElementById('navDots');
    sections.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `nav-dot${index === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    document.getElementById('navPrev').addEventListener('click', prevSlide);
    document.getElementById('navNext').addEventListener('click', nextSlide);
}

function initSlides() {
    sections.forEach((section, index) => {
        if (index === 0) {
            section.classList.add('active', 'visible');
        }
    });
    createNavDots();
    createFloatingPetals();
    updateNavArrows();
}

function goToSlide(index) {
    if (isAnimating || index === currentSlide || index < 0 || index >= totalSlides) return;
    
    isAnimating = true;
    const direction = index > currentSlide ? 'next' : 'prev';
    const currentSection = sections[currentSlide];
    const nextSection = sections[index];

    currentSection.classList.add(`slide-out-${direction}`);
    nextSection.classList.add(`slide-in-${direction}`, 'active', 'visible');

    document.querySelectorAll('.nav-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    setTimeout(() => {
        currentSection.classList.remove('active', `slide-out-${direction}`);
        nextSection.classList.remove(`slide-in-${direction}`);
        currentSlide = index;
        isAnimating = false;
        updateNavArrows();
    }, 500);
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
}

function prevSlide() {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
}

function updateNavArrows() {
    document.getElementById('navPrev')?.classList.toggle('disabled', currentSlide === 0);
    document.getElementById('navNext')?.classList.toggle('disabled', currentSlide === totalSlides - 1);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
});

// Touch/Swipe
let touchStartX = 0, touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const diffX = touchStartX - e.changedTouches[0].screenX;
    const diffY = touchStartY - e.changedTouches[0].screenY;
    
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        diffX > 0 ? nextSlide() : prevSlide();
    } else if (Math.abs(diffY) > 50) {
        diffY > 0 ? nextSlide() : prevSlide();
    }
}, { passive: true });

// Mouse wheel
let wheelTimeout;
document.addEventListener('wheel', (e) => {
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
        e.deltaY > 30 ? nextSlide() : e.deltaY < -30 ? prevSlide() : null;
    }, 50);
}, { passive: true });

document.addEventListener('DOMContentLoaded', initSlides);

// ==================== FLOATING PETALS ====================
function createFloatingPetals() {
    const container = document.getElementById('floatingPetals');
    if (!container) return;
    
    const colors = ['#FFE4EC', '#FBCFE8', '#F9A8D4', '#FFF0F3'];
    
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];
        petal.style.width = `${Math.random() * 10 + 10}px`;
        petal.style.height = petal.style.width;
        petal.style.animationDuration = `${Math.random() * 10 + 12}s`;
        petal.style.animationDelay = `${Math.random() * 8}s`;
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(petal);
    }
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

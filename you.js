// DOM Elements
const welcomeSection = document.getElementById('getout');
const categoriesSection = document.getElementById('categories');
const startQuizBtn = document.querySelector('.start-quiz');

// Create themed backgrounds
function createThemedBackgrounds() {
    const backgroundContainer = document.querySelector('.animated-background');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'background-overlay';
    backgroundContainer.appendChild(overlay);

    // Create background elements for each category
    const categories = ['general', 'science', 'history'];
    categories.forEach(category => {
        const bg = document.createElement('div');
        bg.className = `themed-background ${category}-bg`;
        backgroundContainer.appendChild(bg);
    });
}

// Set active background
function setActiveBackground(category) {
    // Remove active class from all backgrounds
    document.querySelectorAll('.themed-background').forEach(bg => {
        bg.classList.remove('active');
    });
    
    // Add active class to selected category background
    const activeBg = document.querySelector(`.${category}-bg`);
    if (activeBg) {
        activeBg.classList.add('active');
    }
}

// Initialize backgrounds
function initializeBackgrounds() {
    createThemedBackgrounds();
    // Set default background
    setActiveBackground('general');
}

// Start quiz
function startQuiz() {
    welcomeSection.classList.remove('active');
    categoriesSection.classList.add('active');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeBackgrounds();
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

startQuizBtn.addEventListener('click', startQuiz);

// Handle category selection
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const category = e.currentTarget.getAttribute('data-category');
        setActiveBackground(category);
    });
});

// Create stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 1 + Math.random() * 3;
        star.style.setProperty('--duration', `${duration}s`);
        
        // Random delay
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starsContainer.appendChild(star);
    }
}

// Create galaxy particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random movement
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        
        // Random animation duration
        const duration = 10 + Math.random() * 20;
        particle.style.setProperty('--duration', `${duration}s`);
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Show instructions modal
function showInstructions() {
    const modal = document.getElementById('instructions-modal');
    modal.style.display = 'flex';
}

// Close instructions modal
function closeInstructions() {
    const modal = document.getElementById('instructions-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const instructionsModal = document.getElementById('instructions-modal');
    const aboutModal = document.getElementById('about-modal');
    if (event.target === instructionsModal) {
        closeInstructions();
    }
    if (event.target === aboutModal) {
        closeAbout();
    }
}

// Add floating animation to animals
document.addEventListener('DOMContentLoaded', function() {
    const animals = document.querySelectorAll('.animal');
    animals.forEach(animal => {
        animal.style.animationDelay = `${Math.random() * 2}s`;
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    createParticles();
    
    // Add hover effect to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

function showAbout() {
    const modal = document.getElementById('about-modal');
    modal.style.display = 'flex';
}

function closeAbout() {
    const modal = document.getElementById('about-modal');
    modal.style.display = 'none';
} 
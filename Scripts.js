// 1. TYPING EFFECT LOGIC
const typingText = document.getElementById("typing-text");
const phrases = ["Engineering Elite Athletes", "Master Your Mechanics", "Explosive Power Coach"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// 2. SCROLL-TO-DOCK LOGIC
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
});

// 3. THEME TOGGLE LOGIC
function toggleTheme() {
    document.body.classList.toggle("light-mode");
    
    // Optional: Add a haptic-style vibration or sound effect here if on mobile
    const dumbbell = document.querySelector('.dumbbell-icon');
    dumbbell.style.transform = document.body.classList.contains("light-mode") 
        ? "rotateY(180deg)" 
        : "rotateY(0deg)";
}

// Start typing on load
document.addEventListener("DOMContentLoaded", type);

// 1. TYPING EFFECT LOGIC
let typingText; 
const phrases = ["ene dawit ebabalew personal trainer negn"]; // Re-added the phrase
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    // Safety Check: Find the element if it's not already stored
    if (!typingText) {
        typingText = document.getElementById("typing-text");
    }

    // If the element still isn't found, stop the function to avoid errors
    if (!typingText) return;

    const currentPhrase = phrases[phraseIndex];
    
    // Logic for typing and deleting
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    // Logic for pausing and switching phrases
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end
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
    
    const dumbbell = document.querySelector('.dumbbell-icon');
    if (dumbbell) {
        dumbbell.style.transform = document.body.classList.contains("light-mode") 
            ? "rotateY(180deg)" 
            : "rotateY(0deg)";
    }
}

// Start typing on load
document.addEventListener("DOMContentLoaded", () => {
    type();
});

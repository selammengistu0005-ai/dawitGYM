// 1. TYPING EFFECT LOGIC
let typingText; 
const phrases = ["ene dawit ebabalew personal trainer negn"];
let phraseIndex = 0;
let wordIndex = 0; // Tracks the number of words shown
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
    const words = currentPhrase.split(" ");
    
    if (isDeleting) {
        typingText.textContent = words.slice(0, wordIndex - 1).join(" ");
        wordIndex--;
    } else {
        typingText.textContent = words.slice(0, wordIndex + 1).join(" ");
        wordIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    // Logic for pausing and switching phrases
   // Logic for pausing and switching phrases
    const wordsArray = currentPhrase.split(" ");
    if (!isDeleting && wordIndex === wordsArray.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && wordIndex === 0) {
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

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

// Start typing on load
document.addEventListener("DOMContentLoaded", () => {
    type();
});

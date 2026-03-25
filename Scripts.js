// 1. TYPING EFFECT LOGIC
let typingText; 
const phrases = [
    "እኔ ዳዊት እባላለሁ", 
    "የ ስፖርት አሰልታኝ ነኝ"
];
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
    const wordsArray = currentPhrase.split(" ");

    if (!isDeleting && wordIndex === wordsArray.length) {
        // If we just finished the LAST phrase in the array, STOP typing.
        if (phraseIndex === phrases.length - 1) {
            return; // This exits the function and stops the loop forever
        }
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && wordIndex === 0) {
        isDeleting = false;
        phraseIndex++; // Move to the next phrase
        typeSpeed = 500;
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
    // This flips the 'switch' on the body. 
    // The CSS variables and the dumbbell rotation will react instantly.
    document.body.classList.toggle("light-mode");
    
    // Optional: Log to console to verify the click is registering
    console.log("Theme toggled. Light mode is now:", document.body.classList.contains("light-mode"));
}

// Start typing on load
document.addEventListener("DOMContentLoaded", () => {
    type();
});

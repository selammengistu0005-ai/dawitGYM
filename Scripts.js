// 1. TYPING EFFECT LOGIC
// NEW: Boxer Typing Data
const boxerBioText = "Every punch is a calculation. Every movement is physics in motion. I don't just train bodies; I engineer champions.";
let boxerCharIndex = 0;
let typingText; 
const phrases = [
    "እኔ ዳዊት እባላለሁ.......", 
    "Personal trainer ነኝ......"
];
let phraseIndex = 0;
let wordIndex = 0; 
let isDeleting = false;

function type() {
    if (!typingText) {
        typingText = document.getElementById("typing-text");
    }

    if (!typingText) return;

    const currentPhrase = phrases[phraseIndex];
    const words = currentPhrase.split(" ");
    
    if (isDeleting) {
        typingText.textContent = words.slice(0, wordIndex - 1).join(" ");
        wordIndex--;
    } else {
        typingText.textContent = words.slice(0, wordIndex + 1).join(" ");
        wordIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 250;
    const wordsArray = currentPhrase.split(" ");

    if (!isDeleting && wordIndex === wordsArray.length) {
        if (phraseIndex === phrases.length - 1) {
            return; // Stops perfectly on the final Amharic phrase
        }
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && wordIndex === 0) {
        isDeleting = false;
        phraseIndex++; 
        typeSpeed = 500;
    }

    // THIS LINE WAS MISSING: It keeps the loop moving
    setTimeout(type, typeSpeed);
} // THIS BRACKET WAS MISSING: It closes the type function

// NEW: Boxer HUD Typing Function
function typeBoxerBio() {
    const boxerElement = document.getElementById("boxer-typing-text");
    if (boxerElement && boxerCharIndex < boxerBioText.length) {
        boxerElement.textContent += boxerBioText.charAt(boxerCharIndex);
        boxerCharIndex++;
        setTimeout(typeBoxerBio, 40); 
    }
}

// 2. SCROLL-TO-DOCK LOGIC
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
});

// 3. THEME TOGGLE
function toggleTheme() {
    document.body.classList.toggle("light-mode");
    console.log("Theme toggled. Light mode is now:", document.body.classList.contains("light-mode"));
}

// 4. 3D CAROUSEL ROTATION LOGIC
const cards = document.querySelectorAll('.plan-card');
let cardClasses = ['far-left', 'left-card', 'active-card', 'right-card', 'far-right'];

function updateCarousel() {
    cards.forEach((card, i) => {
        // Remove all possible position classes
        card.classList.remove('far-left', 'left-card', 'active-card', 'right-card', 'far-right');
        // Add the new class based on the current array state
        card.classList.add(cardClasses[i]);
    });
}

// Click to Rotate (Updated Logic)
cards.forEach((card) => {
    card.addEventListener('click', () => {
        // Find out which position this card currently has
        const currentClass = card.classList[1]; // Gets the second class (e.g., 'active-card')

        if (currentClass === 'left-card' || currentClass === 'far-left') {
            cardClasses.unshift(cardClasses.pop());
            updateCarousel();
        } else if (currentClass === 'right-card' || currentClass === 'far-right') {
            cardClasses.push(cardClasses.shift());
            updateCarousel();
        }
    });
});

// Start both typing effects on load
document.addEventListener("DOMContentLoaded", () => {
    type();          // Starts your Amharic name typing
    typeBoxerBio();  // Starts the Boxer's HUD typing
});

// 1. TYPING EFFECT LOGIC
// NEW: Boxer Typing Data
const boxerBioText = "ሰላም! ስሜ ዳዊት ይባላል.... በዚህ በስፖርቱና በሰውነት ግንባታው ዓለም ውስጥ ከአሥራ ሦስት ዓመታት በላይ በመቆየት ሰፊ ልምድን አካብቻለሁ....... በነዚህ ዓመታት ውስጥ የበርካታ ሰዎችን የጤና እና የሰውነት አቋም ግብ ለማሳካት የማሰልጠንና የማማከር ዕድል ነበረኝ ከነዚህም መካከል ከብዙ ታዋቂ የአገራችን አርቲስቶች ጋር አብሬ በመሥራት የሚፈለገውን የአካል ለውጥ ማምጣት ችያለሁ........ የትኛውንም ዓይነት የአካል ብቃት ደረጃ ላይ ብትሆን፣ ያንተን ፍላጎትና የሰውነት ሁኔታ መሠረት ያደረገ፣ ውጤታማና የጤና ጥንቃቄን የተከተለ ሥልጠና ለመስጠት ዝግጁ ነኝ....... ከእኔ ጋር በመሥራት ለውጥ ማምጣት ለምትፈልጉ ሁሉ በሩ ክፍት ነው።................ አቋምህ ማንነትህ ነው!";
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

function typeBoxerBio() {
    const boxerElement = document.getElementById("boxer-typing-text");
    const specialSentence = "አቋምህ ማንነትህ ነው!";
    const mainTextLength = boxerBioText.length - specialSentence.length;

    if (!boxerElement || boxerCharIndex >= boxerBioText.length) return;

    if (boxerCharIndex >= mainTextLength) {
        if (boxerCharIndex === mainTextLength) {
            boxerElement.innerHTML += "<br><br>"; // Using innerHTML consistently
        }
        const char = boxerBioText.charAt(boxerCharIndex);
        boxerElement.innerHTML += `<span class="final-glow">${char}</span>`;
        boxerCharIndex++;
        setTimeout(typeBoxerBio, 120);
    } else {
        const currentChar = boxerBioText.charAt(boxerCharIndex);
        boxerElement.innerHTML += currentChar;
        boxerCharIndex++;
        let nextStepDelay = (currentChar === ".") ? 300 : 80;
        setTimeout(typeBoxerBio, nextStepDelay);
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
        const currentClass = card.classList[1]; 

        // Clicking Left now pulls the carousel to the Right
        if (currentClass === 'left-card' || currentClass === 'far-left') {
            cardClasses.push(cardClasses.shift());
            updateCarousel();
        } 
        // Clicking Right now pulls the carousel to the Left
        else if (currentClass === 'right-card' || currentClass === 'far-right') {
            cardClasses.unshift(cardClasses.pop());
            updateCarousel();
        }
    });
});

let carouselInterval;

function startCarouselAutoPlay() {
    stopCarouselAutoPlay(); // Clears any old timers to prevent double-speed
    carouselInterval = setInterval(() => {
        // This line pulls the last class and puts it at the front (moving them right)
        cardClasses.unshift(cardClasses.pop());
        updateCarousel();
    }, 3000); // 3000ms = 3 seconds
}

function stopCarouselAutoPlay() {
    clearInterval(carouselInterval);
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

document.addEventListener("DOMContentLoaded", () => {
    type();
    typeBoxerBio();
    updateCarousel(); 
    
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // NEW: Start the 3-second movement
    startCarouselAutoPlay();

    // NEW: Stop movement when hovering
    const track = document.querySelector('.carousel-track');
    if (track) {
        track.addEventListener('mouseenter', stopCarouselAutoPlay);
        track.addEventListener('mouseleave', startCarouselAutoPlay);
    }
});

let boxerRotation = 0;
const boxerPrism = document.querySelector('.boxer-inner');

function autoFlipBoxer() {
    boxerRotation -= 120; // 360 / 3 faces = 120 degrees
    if (boxerPrism) {
        boxerPrism.style.transform = `rotateY(${boxerRotation}deg)`;
    }
}

// Start the 3-second auto-flip
setInterval(autoFlipBoxer, 3000);

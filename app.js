// ==========================================
// LIGHT THEME & INTERACTIVE HERO - ITERATION 10
// ==========================================

gsap.registerPlugin(ScrollTrigger);

// 1. Initial Page Load Animations
window.addEventListener('DOMContentLoaded', () => {
    
    // Reveal main layout
    gsap.from(".gs-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // 2. Vertical Scrolling Text Rotator (Left Side)
    const rotatingWords = document.querySelectorAll('.rotator-word');
    if (rotatingWords.length > 0) {
        const wordHeight = rotatingWords[0].offsetHeight;
        
        const scrollTl = gsap.timeline({ repeat: -1 });
        
        rotatingWords.forEach((word, index) => {
            if (index === rotatingWords.length - 1) {
                // Instantly reset to the top without animation
                scrollTl.set("#rolling-words", { y: 0 });
            } else {
                // Scroll up one word
                scrollTl.to("#rolling-words", {
                    y: -(wordHeight * (index + 1)),
                    duration: 0.8,
                    delay: 1.5,
                    ease: "back.inOut(1.7)"
                });
            }
        });
    }

    // 3. Right Side Video Animation
    // Subtle vertical float for the video player
    gsap.to(".hero-video", {
        y: -15,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });

});

// 4. Scroll Reveal (For other pages like lies.html, model.html)
const revealElements = document.querySelectorAll('.scroll-section .gs-reveal');

revealElements.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// 5. Navigation Bar Scroll Effect
const navbar = document.querySelector('.top-navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

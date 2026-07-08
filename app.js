// ==========================================
// ICHRA Masters — GSAP Animations v2
// Staggered reveals, counters, parallax
// Respects prefers-reduced-motion
// ==========================================

gsap.registerPlugin(ScrollTrigger);

// Check reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('DOMContentLoaded', () => {

    if (prefersReducedMotion) {
        // Just make everything visible instantly
        document.querySelectorAll('.gs-reveal').forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
        return;
    }

    // 1. Initial Hero Text Reveal
    gsap.from(".hero-text.gs-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 2. Video Showcase Reveal (slight delay)
    gsap.from(".video-showcase-wrapper.gs-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });

    // 3. Vertical Scrolling Text Rotator
    const rotatingWords = document.querySelectorAll('.rotator-word');
    if (rotatingWords.length > 0) {
        const wordHeight = rotatingWords[0].offsetHeight;
        const scrollTl = gsap.timeline({ repeat: -1 });
        
        rotatingWords.forEach((word, index) => {
            if (index === rotatingWords.length - 1) {
                scrollTl.set("#rolling-words", { y: 0 });
            } else {
                scrollTl.to("#rolling-words", {
                    y: -(wordHeight * (index + 1)),
                    duration: 0.8,
                    delay: 1.5,
                    ease: "back.inOut(1.7)"
                });
            }
        });
    }

    // 4. Subtle Video Float
    const heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
        gsap.to(heroVideo, {
            y: -15,
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    }

    // 5. Feature Bars — Staggered Scroll Reveal
    const featureBars = document.querySelectorAll('.feature-bar.gs-reveal');
    if (featureBars.length > 0) {
        featureBars.forEach((bar, index) => {
            gsap.from(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                x: -40,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out"
            });
        });
    }

    // 6. Stat Counter Animation
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const text = stat.textContent.trim();
        
        // Animate percentage values
        if (text === '100%') {
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: "top 85%"
                },
                textContent: 0,
                duration: 1.5,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function() {
                    stat.textContent = Math.round(gsap.getProperty(stat, "textContent")) + '%';
                }
            });
        } else if (text === '$0') {
            // Animate $0 from $999
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: "top 85%"
                },
                textContent: 999,
                duration: 1.2,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function() {
                    stat.textContent = '$' + Math.round(gsap.getProperty(stat, "textContent"));
                }
            });
        } else {
            // For text stats, just fade in
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: "top 85%"
                },
                opacity: 0,
                y: 15,
                duration: 0.8,
                ease: "power3.out"
            });
        }
    });

    // 7. General scroll reveals (for inner pages and other gs-reveal elements)
    const otherReveals = document.querySelectorAll('.scroll-section .gs-reveal, .lesson-section .gs-reveal, .steps-section .gs-reveal, .lies-section .gs-reveal, .container.gs-reveal, header.gs-reveal, .meeting-container.gs-reveal, .contact-info-strip.gs-reveal');
    otherReveals.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out"
        });
    });

    // 8. Section title reveals with scale
    document.querySelectorAll('.section-title.gs-reveal').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%"
            },
            y: 20,
            opacity: 0,
            scale: 0.97,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // 9. FAQ accordion reveals (if FAQ section exists)
    document.querySelectorAll('.faq-item.gs-reveal').forEach((el, i) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%"
            },
            y: 25,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out"
        });
    });
});

// Navigation Bar Scroll Effect
const navbar = document.querySelector('.top-navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

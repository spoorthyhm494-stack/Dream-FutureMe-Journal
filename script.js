document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // 2. Smooth Scroll for Navigation
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.querySelector('i').classList.add('fa-bars');
                    hamburger.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });

    // --- Core Data Storage Functions (using localStorage) ---

    function initLocalStorage() {
        if (!localStorage.getItem('savedDreams')) {
            const dummyDreams = [
                { id: 1, title: "Flying Over Cities", date: "2024-10-25", emotion: "Excited", summary: "Felt free and invigorated while soaring above skyscrapers." },
                { id: 2, title: "The Missing Key", date: "2024-10-23", emotion: "Anxious", summary: "Searching desperately for a key in a dark, unfamiliar room." }
            ];
            localStorage.setItem('savedDreams', JSON.stringify(dummyDreams));
        }

        if (!localStorage.getItem('futureMessages')) {
            localStorage.setItem('futureMessages', JSON.stringify([]));
        }
    }

    initLocalStorage();

    // 4. Fake Loading Animation Logic
    window.simulateDecoding = function(callback) {
        const loadingMessage = document.getElementById('loadingMessage');
        if (loadingMessage) {
            loadingMessage.textContent = 'Analyzing your dream...';
            loadingMessage.style.display = 'block';
        }
        
        setTimeout(() => {
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }
            if (callback) {
                callback();
            }
        }, 2500);
    }
});
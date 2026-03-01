document.addEventListener("DOMContentLoaded", function() {

    /* --- 1. PRELOADER & BOOT SEQUENCE --- */
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        
        setTimeout(() => {
            if (preloader) preloader.classList.add('loaded');
            runBootSequence(); 
        }, 1200); // 1.2s delay ensures the glowing progress bar finishes
    });

    async function runBootSequence() {
        const whoamiText = document.getElementById("whoami-text");
        const nameText = document.getElementById("name-text");
        const typewriterContainer = document.getElementById("typewriter-container");
        const typewriterSpan = document.getElementById("typewriter-text");
        const actionBtn = document.getElementById("action-btn");

        if(!whoamiText) return;

        await sleep(600); 

        const command = "whoami";
        for (let i = 0; i < command.length; i++) {
            whoamiText.innerHTML += command.charAt(i);
            await sleep(150); 
        }

        await sleep(500); 

        nameText.classList.remove("hidden-initially");
        nameText.classList.add("reveal-name");
        
        await sleep(1500); 

        whoamiText.style.opacity = "0";
        nameText.style.opacity = "0";
        
        await sleep(500); 

        whoamiText.classList.remove("neon-text-gradient");
        whoamiText.classList.add("text-white-solid");
        
        nameText.classList.remove("text-white");
        nameText.classList.add("neon-text-gradient");

        whoamiText.style.opacity = "1";
        nameText.style.opacity = "1";

        await sleep(800); 

        typewriterContainer.classList.remove("hidden-initially");
        typewriterContainer.classList.add("smooth-fade-up");
        actionBtn.classList.remove("hidden-initially");
        actionBtn.classList.add("smooth-fade-up");

        startTypewriterLoop(typewriterSpan);
    }

    /* --- 2. INFINITE TYPING LOOP --- */
    async function startTypewriterLoop(element) {
        if(!element) return;
        const roles = [
            "Computer Science Graduate",
            "Web Developer",
            "AI Enthusiast",
            "Graphic Designer",
            "Video Editor",
            "Tech Lover"
        ];
        
        let i = 0;
        while (true) {
            let currentRole = roles[i];
            for (let j = 0; j <= currentRole.length; j++) {
                element.innerText = currentRole.substring(0, j);
                await sleep(80); 
            }
            await sleep(2000);
            for (let j = currentRole.length; j >= 0; j--) {
                element.innerText = currentRole.substring(0, j);
                await sleep(40); 
            }
            await sleep(500);
            i = (i + 1) % roles.length;
        }
    }


    /* --- 3. NAVBAR, SCROLL & INTERSECTION LOGIC --- */
    const navbar = document.getElementById("navbar");
    const backToTopBtn = document.getElementById("backToTopBtn");
    const baseBg = document.querySelector(".hero-base-bg");
    const greenSweep = document.querySelector(".hero-green-sweep-bg");
    const subject = document.querySelector(".hero-subject");
    const particles = document.getElementById("particles-container");
    
    // Exact Elements for the Scroll Tracker
    const track = document.querySelector('.scroll-progress-track');
    const scrollThumb = document.getElementById("scrollThumb");

    window.addEventListener("scroll", function() {
        let scrollY = window.scrollY;

        if (scrollY > 50) navbar.classList.add("glass-nav");
        else navbar.classList.remove("glass-nav");

        if (backToTopBtn) {
            if (scrollY > window.innerHeight / 2) backToTopBtn.classList.add("show");
            else backToTopBtn.classList.remove("show");
        }

        if (baseBg) baseBg.style.transform = `translateY(${scrollY * 0.4}px)`;
        if (greenSweep) greenSweep.style.transform = `translateY(${scrollY * 0.4}px)`;
        if (particles) particles.style.transform = `translateY(${scrollY * 0.3}px)`;
        if (subject) subject.style.transform = `translateY(${scrollY * 0.15}px)`;

        // FIX: The flawless mathematical scroll tracker
        if (track && scrollThumb) {
            let rect = track.getBoundingClientRect();
            // Start filling when the top of the track hits 150px from viewport top
            let scrolledFromTop = 150 - rect.top; 
            // Total distance the user needs to scroll to reach the bottom of the track
            let totalScrollableHeight = rect.height - window.innerHeight + 250; 
            
            let progress = (scrolledFromTop / totalScrollableHeight) * 100;
            progress = Math.max(0, Math.min(100, progress));
            scrollThumb.style.height = progress + "%";
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Auto-Close Mobile Navbar on Link Click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    if(menuToggle) {
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (menuToggle.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            });
        });
    }

    // Intersection Observer for Section Titles
    const titleOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const titleObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); 
            }
        });
    }, titleOptions);

    document.querySelectorAll('.section-title').forEach(title => {
        titleObserver.observe(title);
    });

    /* --- 4. LIGHTWEIGHT PARTICLES GENERATOR --- */
    function createParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        const particleCount = 30; 
        for (let i = 0; i < particleCount; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');
            let posX = Math.random() * 100; 
            let delay = Math.random() * 10; 
            let duration = 15 + Math.random() * 20; 
            let size = Math.random() * 6 + 4; 
            let opacity = Math.random() * 0.5 + 0.2; 
            particle.style.left = posX + 'vw';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.animationDelay = delay + 's';
            particle.style.animationDuration = duration + 's';
            particle.style.opacity = opacity;
            container.appendChild(particle);
        }
    }
    createParticles();
});
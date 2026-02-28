document.addEventListener("DOMContentLoaded", function() {

    /* --- 1. GLASSMORPHIC NAVBAR SCROLL LOGIC --- */
    const navbar = document.getElementById("navbar");
    
    // Select the layers for the parallax effect
    const baseBg = document.querySelector(".hero-base-bg");
    const greenSweep = document.querySelector(".hero-green-sweep-bg");
    const subject = document.querySelector(".hero-subject");
    const particles = document.getElementById("particles-container");

    window.addEventListener("scroll", function() {
        let scrollY = window.scrollY;

        // Navbar Glass Effect
        if (scrollY > 50) navbar.classList.add("glass-nav");
        else navbar.classList.remove("glass-nav");

        // --- Parallax Math ---
        // The base image and green sweep move the slowest (furthest away)
        if (baseBg) baseBg.style.transform = `translateY(${scrollY * 0.4}px)`;
        if (greenSweep) greenSweep.style.transform = `translateY(${scrollY * 0.4}px)`;
        if (particles) particles.style.transform = `translateY(${scrollY * 0.3}px)`;
        
        // The cutout moves slightly faster (closer to camera)
        if (subject) subject.style.transform = `translateY(${scrollY * 0.15}px)`;
    });

    /* --- 2. THE HERO BOOT SEQUENCE --- */
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function runBootSequence() {
        const whoamiText = document.getElementById("whoami-text");
        const nameText = document.getElementById("name-text");
        const typewriterContainer = document.getElementById("typewriter-container");
        const typewriterSpan = document.getElementById("typewriter-text");
        const actionBtn = document.getElementById("action-btn");

        await sleep(600); 

        // Type "whoami"
        const command = "whoami";
        for (let i = 0; i < command.length; i++) {
            whoamiText.innerHTML += command.charAt(i);
            await sleep(150); 
        }

        await sleep(500); 

        // Reveal Name
        nameText.classList.remove("hidden-initially");
        nameText.classList.add("reveal-name");
        
        await sleep(1500); 

        // Smooth Color Swap
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

        // Reveal Typewriter and Button
        typewriterContainer.classList.remove("hidden-initially");
        typewriterContainer.classList.add("smooth-fade-up");
        actionBtn.classList.remove("hidden-initially");
        actionBtn.classList.add("smooth-fade-up");

        startTypewriterLoop(typewriterSpan);
    }

    runBootSequence();

    /* --- 3. INFINITE TYPING LOOP --- */
    async function startTypewriterLoop(element) {
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

    /* --- 4. LIGHTWEIGHT PARTICLES GENERATOR --- */
    /* --- 4. LIGHTWEIGHT PARTICLES GENERATOR --- */
    function createParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        const particleCount = 30; 

        for (let i = 0; i < particleCount; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');
            
            // INCREASED SIZES AND SLOWED DOWN FLOATING
            let posX = Math.random() * 100; 
            let delay = Math.random() * 10; 
            let duration = 15 + Math.random() * 20; // Slower float: 15 to 35 seconds
            let size = Math.random() * 6 + 4; // Bigger: 4px to 10px (was 1 to 4)
            let opacity = Math.random() * 0.5 + 0.2; // Slightly brighter

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
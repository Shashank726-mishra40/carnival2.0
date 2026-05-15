/* script.js */

const trainers = [
    { name: "Marcus Thorne", specialty: "Bodybuilding", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600" },
    { name: "Elena Rodriguez", specialty: "CrossFit & HIIT", image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600" },
    { name: "Sarah Chen", specialty: "Yoga & Flexibility", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=600" },
    { name: "David 'Rock' Miller", specialty: "Strength Training", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600" },
    { name: "Jessica Vales", specialty: "Pilates & Core", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600" },
    { name: "Mike Tyson Jr.", specialty: "Boxing & Self Defense", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600" }
];

const testimonials = [
    { title: "From 250lbs to a Marathon Runner", text: "I never thought I could run a mile, let alone a marathon. PowerGym gave me the strength and the community support to shed 80lbs and find my true self.", author: "James Wilson", image: "https://images.unsplash.com/photo-1486739985386-d4fae04ca6f7?q=80&w=600", category: "Weight Loss" },
    { title: "Building Muscle After 40", text: "Age is just a number. With the right program and the scientific training methodologies at PowerGym, I've gained more muscle in my 40s than I had in my 20s.", author: "Mark Evans", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?q=80&w=600", category: "Muscle Gain" },
    { title: "Finding Mental Clarity Through Yoga", text: "PowerGym isn't just about heavy lifting. The yoga sessions here provided me with the mental resilience I needed to excel in my high-stress corporate job.", author: "Emily Blunt", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600", category: "Mental Health" },
    { title: "Powerlifting Success", text: "I came for the equipment, I stayed for the technique. My deadlift has increased by 100kg since I started working with the specialized powerlifting coaches here.", author: "Michael Kors", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600", category: "Powerlifting" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Nav
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav');
    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));

    // Render Trainers
    const trainerContainer = document.getElementById('trainer-container');
    if (trainerContainer) {
        trainerContainer.innerHTML = trainers.map(t => `
            <div class="trainer-card">
                <img src="${t.image}" alt="${t.name}">
                <h3>${t.name}</h3>
                <p>${t.specialty}</p>
            </div>
        `).join('');
    }

    // Success Stories Slider
    const testimonialContent = document.getElementById('testimonial-content');
    let currentIdx = 0;

    const renderTestimonials = () => {
        if (!testimonialContent) return;
        testimonialContent.innerHTML = testimonials.map((tm, i) => `
            <div class="testimonial ${i === currentIdx ? 'active' : ''}">
                <div class="story-card">
                    <img src="${tm.image}" alt="${tm.title}">
                    <div class="story-info">
                        <span class="category">${tm.category}</span>
                        <h3>${tm.title}</h3>
                        <p>"${tm.text}"</p>
                        <h4>- ${tm.author}</h4>
                    </div>
                </div>
            </div>
        `).join('');
    };

    if (testimonialContent) {
        renderTestimonials();
        setInterval(() => {
            currentIdx = (currentIdx + 1) % testimonials.length;
            renderTestimonials();
        }, 5000);
    }

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Invalid email");
            alert("Message sent successfully!");
            contactForm.reset();
        });
    }

    const membershipForm = document.getElementById('membership-form');
    if (membershipForm) {
        membershipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Enrollment successful! Our team will contact you shortly to finalize your membership.");
            membershipForm.reset();
        });
    }

    // Shop Functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.closest('.product-card').querySelector('h3').textContent;
            alert(`${productName} added to cart!`);
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode', !isDark);
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    });

    // --- Dynamic Effects ---
    
    // Scroll Reveal Observer
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's a section with stats, trigger stats logic
                if (entry.target.id === 'home') {
                    animateStats();
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

    // Stats Animation Logic
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps approx
            let current = 0;

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current).toLocaleString() + (target > 100 ? "+" : "");
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target.toLocaleString() + (target > 100 ? "+" : "");
                }
            };
            updateCount();
        });
    }
});

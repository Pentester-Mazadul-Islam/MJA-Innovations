/* ==========================================================================
   MJA AGENCY - UPDATED JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. Modal (Enquiry Form) Logic ---
    const modal = document.getElementById("enquiryModal");
    const enquiryBtns = document.querySelectorAll(".btn-enquiry");
    const closeBtn = document.querySelector(".close-btn");

    if (modal) {
        enquiryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // Scroll বন্ধ হবে
            });
        });

        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            };
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        };
    }

    // --- 2. Unified Mobile Menu Logic (Fixed) ---
    const menuBtn = document.getElementById('mobile-menu-btn'); // CSS ID match
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // লিঙ্ক ক্লিক করলে মেনু বন্ধ হবে
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- 3. Sidebar Active Link Logic ---
    let path = window.location.pathname;
    let currentUrl = path.split("/").pop() || "index.html";

    const sidebarLinks = document.querySelectorAll(".side-nav-list li a");
    sidebarLinks.forEach(link => {
        let linkPath = link.getAttribute("href");
        if (linkPath === currentUrl) {
            const parentLi = link.parentElement;
            parentLi.classList.add("active");
            if (!link.innerText.trim().startsWith(">")) {
                link.innerHTML = "> " + link.innerText;
            }
        }
    });

    // --- 4. Testimonial Slider Logic ---
    const slides = document.querySelectorAll('.testimonial-content');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentIndex = 0;
    let autoSlideTimer;

    function showSlide(index) {
        if (!slides.length) return;
        
        slides.forEach(slide => slide.classList.remove('active'));

        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;

        slides[currentIndex].classList.add('active');
    }

    function startAutoSlide() {
        if (slides.length) {
            autoSlideTimer = setInterval(() => showSlide(currentIndex + 1), 5000);
        }
    }

    function resetTimer() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => { showSlide(currentIndex + 1); resetTimer(); });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => { showSlide(currentIndex - 1); resetTimer(); });
    }

    startAutoSlide();
});

// --- 5. Service Details Logic (Global functions) ---
function showDetails(type) {
    const viewSection = document.getElementById('service-view');
    const title = document.getElementById('view-title');
    const desc = document.getElementById('view-description');
    
    if (viewSection) {
        viewSection.style.display = 'block';
        
        if(type === 'seo') {
            title.innerText = "Professional SEO Services";
            desc.innerText = "Partner with the best SEO agency in Bangladesh. We help your website climb search engine rankings through audits, keyword research, and backlinks.";
        } else if(type === 'cyber') {
            title.innerText = "Cyber Security & VAPT";
            desc.innerText = "Protecting your digital assets with expert penetration testing and advanced vulnerability assessments (VAPT).";
        }
        viewSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToPackages() {
    const pkgSection = document.getElementById('packages');
    if (pkgSection) {
        pkgSection.scrollIntoView({ behavior: 'smooth' });
    }
}

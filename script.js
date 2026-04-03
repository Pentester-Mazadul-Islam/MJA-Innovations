/* ==========================================================================
   MJA AGENCY - UPDATED JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // --- 1. Modal (Enquiry Form) Logic ---
    const modal = document.getElementById("enquiryModal");
    const enquiryBtns = document.querySelectorAll(".btn-enquiry");
    const closeBtn = document.querySelector(".close-btn");

    if (modal) {
        enquiryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // Disable background scrolling
            });
        });

        if (closeBtn) {
            closeBtn.onclick = function () {
                modal.style.display = "none";
                document.body.style.overflow = "auto"; // Re-enable scrolling
            };
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        };
    }

    // --- 2. Unified Mobile Menu Logic ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- 3. Sidebar Active Link Logic (For Service Pages) ---
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

    // --- 5. Optimized Scroll Spy Logic (Home Page Only) ---
    const navLinks = document.querySelectorAll(".nav-menu li a");
    const sections = document.querySelectorAll("section[id], header[id]");

    function scrollSpy() {
        // Check if we are on the Home Page (index.html or root '/')
        const isHomePage = window.location.pathname.endsWith("index.html") ||
            window.location.pathname === "/" ||
            window.location.pathname.endsWith("/");

        if (!isHomePage) {
            // If NOT on home page, only highlight the link that matches the current URL
            let currentPath = window.location.pathname.split("/").pop() || "index.html";
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === currentPath) {
                    link.classList.add("active");
                }
            });
            return; // Stop scroll spy logic for service pages
        }

        // --- Scroll Spy Logic for Home Page ---
        let currentSection = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            const href = link.getAttribute("href");

            // Highlight Home if at the top
            if (window.scrollY < 200 && (href === "index.html" || href === "#home")) {
                link.classList.add("active");
            }
            // Highlight section links on scroll
            else if (currentSection && href.includes(`#${currentSection}`)) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", scrollSpy);
    scrollSpy(); // Run on load
});

// --- 6. Global Utility Functions ---

function toggleDescription() {
    var container = document.getElementById("description-container");
    var btnText = document.getElementById("toggleBtn");

    if (container.classList.contains("description-collapsed")) {
        container.classList.remove("description-collapsed");
        container.classList.add("description-expanded");
        btnText.innerHTML = "See Less";
    } else {
        container.classList.remove("description-expanded");
        container.classList.add("description-collapsed");
        btnText.innerHTML = "See More";
    }
}

function showDetails(type) {
    const viewSection = document.getElementById('service-view');
    const title = document.getElementById('view-title');
    const desc = document.getElementById('view-description');

    if (viewSection) {
        viewSection.style.display = 'block';

        if (type === 'seo') {
            title.innerText = "Professional SEO Services";
            desc.innerText = "Partner with the best SEO agency in Bangladesh. We help your website climb search engine rankings through audits, keyword research, and backlinks.";
        } else if (type === 'cyber') {
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
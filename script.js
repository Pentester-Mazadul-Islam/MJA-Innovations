/* --- Modal (Enquiry Form) Logic --- */
const modal = document.getElementById("enquiryModal");
const enquiryBtns = document.querySelectorAll(".btn-enquiry"); // Changed to querySelectorAll
const closeBtn = document.querySelector(".close-btn");

// Loop through all enquiry buttons (Hero, Contact, etc.)
enquiryBtns.forEach(btn => {
    btn.onclick = function(e) {
        e.preventDefault(); 
        if (modal) {
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent background scroll
        }
    }
});

// Function to close the popup
if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Close if user clicks outside the modal content
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

/* --- Navigation Menu Logic --- */
const navItems = document.querySelectorAll('.nav-menu li');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        const currentActive = document.querySelector('.nav-menu li.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        this.classList.add('active');
    });
});

/* --- Mobile Menu Toggle Logic --- */
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle) menuToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

/* --- Service Details Logic --- */
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

/* --- Smooth Scroll for Packages --- */
function scrollToPackages() {
    const pkgSection = document.getElementById('packages');
    if (pkgSection) {
        pkgSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* --- Sidebar & Testimonial Logic (DOM Ready) --- */
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Sidebar Active Link Logic
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

    // 2. Testimonial Slider Logic
    const slides = document.querySelectorAll('.testimonial-content');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentIndex = 0;
    let autoSlideTimer;

    function showSlide(index) {
        if (!slides.length) return; // Guard clause
        
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
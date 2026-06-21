/**
 * Explore India - Core Interactive Website Script
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Remove Preloader Screen when DOM assets finalize loading
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.style.opacity = "0";
                setTimeout(() => preloader.style.display = "none", 500);
            }, 300);
        });
    }

    // 2. Sticky Navbar Scroll Effect handler
    const navbar = document.getElementById("mainNavbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Initialize Animate On Scroll (AOS) engine
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        offset: 80
    });

    // 4. Animated Statistics Counter Configuration via Intersection Observer
    const counters = document.querySelectorAll(".counter");
    const countOptions = { threshold: 0.5, rootMargin: "0px" };

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute("data-target"), 10);
                let currentCount = 0;
                
                // Speed allocation based on the size of the target counter metrics
                const duration = 2000; 
                const increment = Math.ceil(countTo / (duration / 16));

                const updateCount = () => {
                    currentCount += increment;
                    if (currentCount >= countTo) {
                        target.innerText = countTo.toLocaleString() + "+";
                    } else {
                        target.innerText = currentCount.toLocaleString() + "+";
                        requestAnimationFrame(updateCount);
                    }
                };
                
                requestAnimationFrame(updateCount);
                observer.unobserve(target);
            }
        });
    }, countOptions);

    counters.forEach(counter => countObserver.observe(counter));

    // 5. Global Light / Dark Mode Toggle Feature Logic
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const icon = themeToggleBtn.querySelector("i");

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("light-theme")) {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        } else {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    });

    // 6. Interactive Floating Scroll-to-Top Button Toggle and Action
    const scrollTopBtn = document.getElementById("scrollToTop");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = "flex";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 7. Standard Intercept Rule for Form Enquiry Submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for choosing Explore India! Our premium travel curator will connect with you via email within 2 hours.");
            contactForm.reset();
        });
    }
});
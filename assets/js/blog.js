/* =========================================
   BLOG THƯ HIÊN
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initNewsletter();

    initPopup();

    initScrollAnimation();

    initCardEffects();

});

/* =========================================
NEWSLETTER
========================================= */

function initNewsletter() {

    const form = document.getElementById("newsletter-form");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const emailInput =
            document.getElementById("newsletter-email");

        const email =
            emailInput.value.trim();

        if (email === "") {

            alert("Vui lòng nhập email.");

            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            alert("Email không hợp lệ.");

            return;
        }

        showPopup();

        emailInput.value = "";

    });

}

/* =========================================
POPUP
========================================= */

function initPopup() {

    const popup =
        document.getElementById("blog-popup");

    const closeBtn =
        document.querySelector(".blog-popup-close");

    if (!popup || !closeBtn) return;

    closeBtn.addEventListener("click", () => {

        popup.classList.remove("show");

    });

    popup.addEventListener("click", (e) => {

        if (e.target === popup) {

            popup.classList.remove("show");

        }

    });

}

function showPopup() {

    const popup =
        document.getElementById("blog-popup");

    if (!popup) return;

    popup.classList.add("show");

}

/* =========================================
SCROLL ANIMATION
========================================= */

function initScrollAnimation() {

    const sections = document.querySelectorAll(
        ".blog-featured," +
        ".blog-news," +
        ".blog-events," +
        ".blog-rare-books," +
        ".blog-posts," +
        ".blog-newsletter"
    );

    sections.forEach(section => {

        section.classList.add("fade-up");

    });

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    sections.forEach(section => {

        observer.observe(section);

    });

}

/* =========================================
CARD HOVER EFFECT
========================================= */

function initCardEffects() {

    const cards = document.querySelectorAll(

        ".blog-news-card," +
        ".blog-post-card," +
        ".blog-rare-card," +
        ".blog-mini-card"

    );

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transition =
                "all .35s ease";

        });

    });

}

/* =========================================
FAKE ARTICLE OPEN
========================================= */

const articleCards = document.querySelectorAll(

    ".blog-news-card," +
    ".blog-post-card," +
    ".blog-featured-main"

);

articleCards.forEach(card => {

    card.addEventListener("click", () => {

        alert(
            "Tính năng xem chi tiết bài viết sẽ được phát triển trong phiên bản tiếp theo."
        );

    });

});

/* =========================================
SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) return;

        window.scrollTo({

            top:
                target.offsetTop - 70,

            behavior:
                "smooth"

        });

    });

});

/* =========================================
HEADER SHRINK (nếu có navbar)
========================================= */

window.addEventListener("scroll", () => {

    const header =
        document.querySelector(".header");

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/* =========================================
PARALLAX HERO NHẸ
========================================= */

const hero =
    document.querySelector(".blog-hero");

window.addEventListener("scroll", () => {

    if (!hero) return;

    const offset =
        window.pageYOffset;

    hero.style.backgroundPositionY =
        offset * 0.4 + "px";

});

/* =========================================
CONSOLE
========================================= */

console.log(
    " Blog Thư Hiên Loaded Successfully"
);
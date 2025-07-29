document.addEventListener("DOMContentLoaded", function () {

    // ========================
    // WELCOME HOME ANIMATION CONTROLLER
    // ========================
    const heroLetters = document.querySelectorAll('.hero h1 .letter');
    if (heroLetters.length > 0) {
        // Calculate the maximum animation duration (last letter delay + animation duration)
        const maxDelay = 1.3; // seconds (last letter delay)
        const animationDuration = 3; // seconds
        const totalAnimationTime = (maxDelay + animationDuration) * 1000; // convert to milliseconds

        // Set a timeout to stop animations after the first cycle completes
        setTimeout(() => {
            heroLetters.forEach(letter => {
                letter.classList.add('animation-complete');
            });
        }, totalAnimationTime);
    }

    // ========================
    // HAMBURGER MENU HANDLER
    // ========================
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        const toggleMenu = () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
            document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
        };

        hamburger.addEventListener("click", toggleMenu);
        hamburger.addEventListener("touchstart", (e) => {
            e.preventDefault();
            toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove("active");
                hamburger.classList.remove("active");
                document.body.style.overflow = "";
            }
        });

        // Close menu when clicking a link
        navLinks.addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                navLinks.classList.remove("active");
                hamburger.classList.remove("active");
                document.body.style.overflow = "";
            }
        });

        // Close menu when window is resized above mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove("active");
                hamburger.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }

    // ========================
    // TESTIMONIAL SLIDER
    // ========================
    const testimonialSliders = document.querySelectorAll('.testimonial-slider');
    if (testimonialSliders.length > 0) {
        let testimonialCurrent = 0;

        const showTestimonialSlider = (idx) => {
            testimonialSliders.forEach((el, i) => {
                el.style.display = (i === idx) ? 'flex' : 'none';
            });
        };

        document.querySelectorAll('.testimonial-slider .prev').forEach(btn => {
            btn.onclick = () => {
                testimonialCurrent = (testimonialCurrent - 1 + testimonialSliders.length) % testimonialSliders.length;
                showTestimonialSlider(testimonialCurrent);
            };
        });

        document.querySelectorAll('.testimonial-slider .next').forEach(btn => {
            btn.onclick = () => {
                testimonialCurrent = (testimonialCurrent + 1) % testimonialSliders.length;
                showTestimonialSlider(testimonialCurrent);
            };
        });

        showTestimonialSlider(testimonialCurrent);
    }

    // ========================
    // GALLERY SLIDER
    // ========================
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        let galleryCurrent = 0;

        const showGallery = (idx) => {
            galleryItems.forEach((el, i) => {
                el.classList.toggle('active', i === idx);
            });
        };

        const prevGalleryBtn = document.querySelector('.gallery .prev');
        const nextGalleryBtn = document.querySelector('.gallery .next');

        if (prevGalleryBtn && nextGalleryBtn) {
            prevGalleryBtn.onclick = () => {
                galleryCurrent = (galleryCurrent - 1 + galleryItems.length) % galleryItems.length;
                showGallery(galleryCurrent);
            };
            nextGalleryBtn.onclick = () => {
                galleryCurrent = (galleryCurrent + 1) % galleryItems.length;
                showGallery(galleryCurrent);
            };
        }

        showGallery(galleryCurrent);
    }

    // ========================
    // CONTACT FORM HANDLER
    // ========================
    const contactForm = document.getElementById('contactForm');
    const btnText = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    const popupNotification = document.getElementById('popupNotification');

    if (contactForm && btnText && btnLoading && popupNotification) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Tampilkan loading
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    contactForm.reset();
                    showPopupMessage('Thank you! Your message was submitted successfully. God Bless You.', true);
                } else {
                    showPopupMessage('Oops! There was a problem submitting your form', false);
                }
            } catch (error) {
                showPopupMessage('Oops! There was a problem submitting your form', false);
            } finally {
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
        });
    }

    function showPopupMessage(message, isSuccess) {
        popupNotification.textContent = message;
        popupNotification.style.backgroundColor = isSuccess ? '#af9b64ff' : '#fbe6bbff';
        popupNotification.style.display = 'block';
        popupNotification.classList.add('show');

        setTimeout(() => {
            popupNotification.classList.remove('show');
            setTimeout(() => {
                popupNotification.style.display = 'none';
            }, 300);
        }, 4000);
    }
});

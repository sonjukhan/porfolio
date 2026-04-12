document.addEventListener('DOMContentLoaded', function () {

    /* ================= PROFILE IMAGE ================= */
    const profileImage = document.getElementById('profileImage');
    const profileModal = document.getElementById('imageModal');

    if (profileImage && profileModal) {
        profileImage.addEventListener('click', function () {
            profileModal.classList.add('active');
        });

        profileModal.addEventListener('click', function () {
            profileModal.classList.remove('active');
        });

        const profileModalImg = profileModal.querySelector('.image-modal__img');
        profileModalImg.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }


    /* ================= GALLERY (UPDATED WITH JS IMAGE ARRAY) ================= */

    const galleryModal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('galleryModalImg');
    const caption = document.getElementById('galleryCaption');

    let currentImages = [];
    let currentIndex = 0;

    // 👉 ALL FOOD IMAGES (ADD YOUR 9 IMAGES HERE)
    const foodGalleryImages = [
        { src: "food_imgs/Chess-ball.jpeg", alt: "Chess Ball" },
        { src: "food_imgs/Set-menu.jpeg", alt: "Set Menu" },
        { src: "food_imgs/special-soups.jpeg", alt: "Special Soups" },
        { src: "food_imgs/Soups.jpeg", alt: "Soups" },
        { src: "food_imgs/Burgers.jpeg", alt: "Burger" },
        { src: "food_imgs/fish-finger.jpeg", alt: "Fish Finger" },
        { src: "food_imgs/Crash-nut-salad.jpeg", alt: "Crash-nut Salad" },
        { src: "food_imgs/Smocked-sandwich.jpeg", alt: "Smocked Sandwich" },
        { src: "food_imgs/Grilled-Sandwich.jpeg", alt: "Grilled Sandwich" }
    ];

    function showImage(index) {
        const img = currentImages[index];

        if (img.src) {
            modalImg.src = img.src;
            caption.textContent = img.alt || '';
        } else {
            modalImg.src = img.getAttribute('src');
            caption.textContent = img.getAttribute('alt');
        }

        currentIndex = index;
    }

    /* TARGET BOTH EXPERIENCE + CERTIFICATION */
    document.querySelectorAll('.experience__gallery, .certification__gallery').forEach(gallery => {

        const images = gallery.querySelectorAll('.gallery__img');

        images.forEach((img, index) => {
            img.addEventListener('click', () => {

                // 👉 If it's FOOD gallery → use JS array
                if (gallery.classList.contains('experience__gallery')) {
                    currentImages = foodGalleryImages;
                    currentIndex = index;
                } else {
                    // 👉 Certification (normal single image)
                    currentImages = images;
                    currentIndex = index;
                }

                galleryModal.classList.add('active');
                showImage(currentIndex);
            });
        });

        const moreBox = gallery.querySelector('.gallery__more');

        if (moreBox) {
            moreBox.addEventListener('click', () => {

                currentImages = foodGalleryImages;
                currentIndex = 2; // start from 3rd image

                galleryModal.classList.add('active');
                showImage(currentIndex);
            });
        }

    });


    /* ================= ARROWS ================= */
    const arrowRight = document.querySelector('.modal__arrow--right');
    const arrowLeft = document.querySelector('.modal__arrow--left');

    if (arrowRight && arrowLeft) {

        arrowRight.onclick = function (e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % currentImages.length;
            showImage(currentIndex);
        };

        arrowLeft.onclick = function (e) {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            showImage(currentIndex);
        };
    }


    /* ================= KEYBOARD ================= */
    document.addEventListener('keydown', function (e) {
        if (!galleryModal.classList.contains('active')) return;

        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % currentImages.length;
            showImage(currentIndex);
        }

        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            showImage(currentIndex);
        }
    });


    /* ================= CLOSE GALLERY ================= */
    if (galleryModal) {
        galleryModal.addEventListener('click', function () {
            galleryModal.classList.remove('active');
        });
    }

    if (modalImg) {
        modalImg.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

});

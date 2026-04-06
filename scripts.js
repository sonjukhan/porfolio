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


    /* ================= GALLERY ================= */
    const images = document.querySelectorAll('.gallery__img');
    const galleryModal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('galleryModalImg');
    const caption = document.getElementById('galleryCaption');

    let currentIndex = 0;

    function showImage(index) {
        const img = images[index];
        modalImg.src = img.src;
        caption.textContent = img.alt;
        currentIndex = index;
    }

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            galleryModal.classList.add('active');
            showImage(index);
        });
    });

    const moreBox = document.querySelector('.gallery__more');

    if (moreBox) {
        moreBox.addEventListener('click', () => {
            galleryModal.classList.add('active');
            showImage(2); // index of last visible image
        });
    }


    /* ================= ARROWS ================= */
    document.querySelector('.modal__arrow--right').onclick = function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    };

    document.querySelector('.modal__arrow--left').onclick = function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    };


    /* ================= KEYBOARD ================= */
    document.addEventListener('keydown', function (e) {
        if (!galleryModal.classList.contains('active')) return;

        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }
    });


    /* ================= CLOSE GALLERY ================= */
    galleryModal.addEventListener('click', function () {
        galleryModal.classList.remove('active');
    });

    modalImg.addEventListener('click', function (e) {
        e.stopPropagation();
    });

});

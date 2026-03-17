document.addEventListener('DOMContentLoaded', () => {
    // --- OBSERVERS (FADE IN) ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const fadeInItems = document.querySelectorAll('.fade-in-item');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => revealOnScroll.observe(section));
    fadeInItems.forEach(item => revealOnScroll.observe(item));

    // --- PARALLAX HERO ---
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            heroSection.style.backgroundPositionY = (scrollPos * 0.3) + 'px'; 
        });
    }

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- GALLERY MODAL ---
    const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');
    const galleryModal = document.getElementById('galleryModal');
    
    if (galleryModal) {
        const carouselInnerImg = galleryModal.querySelector('.carousel-inner img'); 
        const closeModalButton = galleryModal.querySelector('.close-button');
        const prevButton = galleryModal.querySelector('.prev-button');
        const nextButton = galleryModal.querySelector('.next-button');

        const fullImages = [
            'public/uploads/img/galery-1.png', 
            'public/uploads/img/galery-2.png',
            'public/uploads/img/galery-3.png',
            'public/uploads/img/galery-4.png',
            'public/uploads/img/galery-5.png',
            'public/uploads/img/galery-6.png',
            'public/uploads/img/galery-7.png',
            'public/uploads/img/galery-8.png'
        ];
        
        let currentImageIndex = 0; 

        function openGalleryModal(index) {
            currentImageIndex = index;
            carouselInnerImg.src = fullImages[currentImageIndex];
            carouselInnerImg.alt = `Enlarged View ${currentImageIndex + 1}`;
            galleryModal.style.display = 'flex'; 
            document.body.style.overflow = 'hidden'; 
        }

        function closeGalleryModal() {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        }

        function nextGalleryImage() {
            currentImageIndex = (currentImageIndex + 1) % fullImages.length;
            carouselInnerImg.src = fullImages[currentImageIndex];
        }

        function prevGalleryImage() {
            currentImageIndex = (currentImageIndex - 1 + fullImages.length) % fullImages.length;
            carouselInnerImg.src = fullImages[currentImageIndex];
        }

        galleryThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function(event) {
                event.preventDefault(); 
                const index = parseInt(this.getAttribute('data-index'));
                if (!isNaN(index)) openGalleryModal(index);
            });
        });

        closeModalButton?.addEventListener('click', closeGalleryModal);
        
        prevButton?.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            prevGalleryImage(); 
        });

        nextButton?.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            nextGalleryImage(); 
        });

        galleryModal.addEventListener('click', (event) => {
            if (event.target === galleryModal) closeGalleryModal();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeGalleryModal();
            if (galleryModal.style.display === 'flex') {
                if (event.key === 'ArrowRight') nextGalleryImage();
                if (event.key === 'ArrowLeft') prevGalleryImage();
            }
        });
    }
});
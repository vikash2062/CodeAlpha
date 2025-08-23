// Sample image data (replace with your own images)
        const images = [
            {
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                title: 'Mountain Landscape',
                category: 'nature'
            },
            {
                src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
                title: 'City Skyline',
                category: 'city'
            },
            {
                src: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
                title: 'Golden Retriever',
                category: 'animals'
            },
            {
                src: 'https://images.pexels.com/photos/35600/road-sun-rays-path.jpg',
                title: 'Forest Path',
                category: 'nature'
            },
            {
                src: 'https://images.adsttc.com/media/images/57b1/5df3/e58e/cedf/b300/0003/large_jpg/04_River_park.jpg?1471241706',
                title: 'Urban Architecture',
                category: 'city'
            },
            {
                src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
                title: 'Office Space',
                category: 'technology'
            },
            {
                src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=600&h=400&fit=crop',
                title: 'Ocean Waves',
                category: 'nature'
            },
            {
                src: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop',
                title: 'Cute Cat',
                category: 'animals'
            },
            {
                src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
                title: 'Tech Setup',
                category: 'technology'
            },
            {
                src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop',
                title: 'City Lights',
                category: 'city'
            },
            {
                src: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=600&h=400&fit=crop',
                title: 'Majestic Eagle',
                category: 'animals'
            },
            {
                src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop',
                title: 'Coding Screen',
                category: 'technology'
            },
            {
                src: 'https://cff2.earth.com/uploads/2022/05/26121901/Hyenas-scaled.jpg',
                title: 'Wild',
                category: 'animals'
            },
            {
                src: 'https://i.pinimg.com/originals/81/e2/8f/81e28f387359ef6791bc9aa1dbecd53d.jpg',
                title: 'Coding Setup',
                category: 'technology'
            },
        ];

        let currentImageIndex = 0;
        let filteredImages = [...images];

        // DOM elements
        const gallery = document.getElementById('gallery');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxCategory = document.getElementById('lightboxCategory');
        const closeBtn = document.getElementById('closeBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const filterBtns = document.querySelectorAll('.filter-btn');

        // Initialize gallery
        function initGallery() {
            renderGallery(images);
            setupEventListeners();
        }

        // Render gallery
        function renderGallery(imagesToRender) {
            gallery.innerHTML = '';
            imagesToRender.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img src="${image.src}" alt="${image.title}" loading="lazy">
                    <div class="overlay">
                        <div class="image-info">
                            <div class="image-title">${image.title}</div>
                            <div class="image-category">${image.category}</div>
                        </div>
                    </div>
                `;
                galleryItem.addEventListener('click', () => openLightbox(index));
                gallery.appendChild(galleryItem);
            });
        }

        // Filter functionality
        function filterImages(category) {
            filteredImages = category === 'all' ? [...images] : images.filter(img => img.category === category);
            
            // Animate out current items
            const items = document.querySelectorAll('.gallery-item');
            items.forEach(item => item.classList.add('hidden'));
            
            // Render new items after animation
            setTimeout(() => {
                renderGallery(filteredImages);
            }, 300);
        }

        // Open lightbox
        function openLightbox(index) {
            currentImageIndex = index;
            const image = filteredImages[index];
            lightboxImg.src = image.src;
            lightboxTitle.textContent = image.title;
            lightboxCategory.textContent = image.category;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Navigate images in lightbox
        function navigateImage(direction) {
            if (direction === 'next') {
                currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
            } else {
                currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
            }
            
            const image = filteredImages[currentImageIndex];
            lightboxImg.src = image.src;
            lightboxTitle.textContent = image.title;
            lightboxCategory.textContent = image.category;
        }

        // Setup event listeners
        function setupEventListeners() {
            // Filter buttons
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    filterImages(btn.dataset.filter);
                });
            });

            // Lightbox controls
            closeBtn.addEventListener('click', closeLightbox);
            prevBtn.addEventListener('click', () => navigateImage('prev'));
            nextBtn.addEventListener('click', () => navigateImage('next'));

            // Close lightbox on background click
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (lightbox.classList.contains('active')) {
                    switch(e.key) {
                        case 'Escape':
                            closeLightbox();
                            break;
                        case 'ArrowLeft':
                            navigateImage('prev');
                            break;
                        case 'ArrowRight':
                            navigateImage('next');
                            break;
                    }
                }
            });
        }

        // Initialize on page load
        initGallery();
document.addEventListener('DOMContentLoaded', function() {
    // Function to parse URL parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function initializeSwipers() {
        var swiper = new Swiper(".mySwiper", {
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
        });
    
        var swiper2 = new Swiper(".mySwiper2", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: swiper,
            },
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
        });
    }

    // Fetch and display product data
    function fetchAndDisplayProduct(productId, productName) {
        fetch('../assets/data/products.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(p => p.id == productId || p.product_name == productName);
                if (product) {
                    displayProductDetails(product);
                } else {
                    console.error('Product not found');
                    // Handle case where product is not found
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Display product details in HTML
    function displayProductDetails(product) {
        document.querySelector('h1.text-h2').textContent = product.product_name;

        document.querySelector('.breadcrumbs p.product-name').textContent = product.product_name;

        document.querySelector('.only-badge span').textContent = product.category;
        if (product.description.length != 0) {
            document.querySelector('.product-description p').innerHTML = product.description;
        }

        const notesList = document.querySelector('.product-notes ul');
        if (product.notes && Array.isArray(product.notes)) {
            notesList.innerHTML = ''; // Clear existing list items
            product.notes.forEach(note => {
                const listItem = document.createElement('li');
                listItem.className = 'text-p flex items-start gap-5';
        
                const icon = document.createElement('i');
                icon.className = 'material-icons-round';
                icon.textContent = 'info';
        
                listItem.appendChild(icon);
                listItem.appendChild(document.createTextNode(note));
        
                notesList.appendChild(listItem);
            });
        }

        const swiperWrappers = document.querySelectorAll('.swiper .swiper-wrapper');
        if (product.images && Array.isArray(product.images)) {
            swiperWrappers.forEach(swiperWrapper => {
                // Clear existing slides
                swiperWrapper.innerHTML = '';
        
                product.images.forEach(image => {
                    const listItem = document.createElement('div');
                    listItem.className = 'swiper-slide';
        
                    const img = document.createElement('img');
                    img.src = image;
        
                    listItem.appendChild(img);
                    swiperWrapper.appendChild(listItem);
                });

                            
            // Destroy existing Swiper instances if they exist
            });
            if (window.swiper && window.swiper2) {
                window.swiper.destroy(true, true);
                window.swiper2.destroy(true, true);
            }

            // Reinitialize Swipers
            initializeSwipers();

        }
        

        const benefitsList = document.querySelector('.product-strength ul');
        if (product.benefits && Array.isArray(product.benefits)) {
            benefitsList.innerHTML = ''; // Clear existing list items
            product.benefits.forEach(benefit => {
                const listItem = document.createElement('li');
                listItem.className = 'text-p flex items-start gap-5';
        
                const icon = document.createElement('i');
                icon.className = 'material-icons-round';
                icon.textContent = 'done';
        
                listItem.appendChild(icon);
                listItem.appendChild(document.createTextNode(benefit));
        
                benefitsList.appendChild(listItem);
            });
        }
        // Add more fields as needed...

        // Update image gallery if applicable
        

        // Reinitialize Swiper here if necessary
    }

    // Get product ID or name from URL
    const productId = getQueryParam('id');
    const productName = getQueryParam('name');
    fetchAndDisplayProduct(productId);
    displayProductDetails(productId);
});
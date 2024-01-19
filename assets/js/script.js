/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
            selectEl.addEventListener(type, listener)
        }
    }
}

/**
 * Easy on scroll event listener
 */
const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
}


/**
 * Toggle .header-scrolled class to #header when page is scrolled
 */
let selectHeader = select('#header')
if (selectHeader) {
    const headerScrolled = () => {
        if (window.scrollY > 80) {
            selectHeader.classList.add('header-scrolled')
        } else {
            selectHeader.classList.remove('header-scrolled')
        }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
}

/**
 * For Accordion in Landing Page
 */

const accordion = document.getElementsByClassName('container');

for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
        this.classList.toggle('active')
    })
}

// document.querySelectorAll('.product-item').forEach(item => {
//     item.addEventListener('click', function() {
//         const productId = this.getAttribute('data-product-id'); // Assuming each product has a 'data-product-id' attribute
//         window.location.href = `./details-product.html?productId=${productId}`;
//     });
// });

function fetchProducts(callback) {
    const url = "../assets/data/products.json";
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            const productsContainer = document.getElementById('all-products'); // Assuming you have a container with this ID
            data.forEach(product => {
                const productElement = createProductElement(product);
                productsContainer.appendChild(productElement);
            });

            if (callback) callback();
        })
        .catch(err => {
            console.log(err);
        });
}

function createProductElement(product) {
    const anchor = document.createElement('a');
    const encodedProductName = encodeURIComponent(product.product_name); // Encode the product name to make it URL-safe
    anchor.href = `./details-product/detail-product.html?id=${product.id}&name=${encodedProductName}`; 
    anchor.className = `product-item ${product.type_class} md:col-span-4 col-span-12 flex flex-col gap-4 border rounded-lg`;
    // anchor.dataset.category = product.type_class;

    const imageDiv = document.createElement('div');
    imageDiv.className = 'rounded-t-lg overflow-hidden w-100 h-[240px] max-h-[240px] min-h-[240px] object-fill';

    const img = document.createElement('img');
    img.src = product.images[0]; // Assuming the first image is what you want to display
    img.className = 'w-full h-full object-cover';
    img.alt = product.product_name;

    imageDiv.appendChild(img);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'px-5 py-2';

    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'categories flex gap-2';

    // const badge = document.createElement('span');
    // badge.className = 'badge-best-seller text-subtitle font-medium'; // Modify as needed
    // badge.textContent = 'Best Seller'; // Modify as needed

    const categorySpan = document.createElement('span');
    categorySpan.className = 'badge-primary text-subtitle font-medium'; // Modify as needed
    categorySpan.textContent = product.category;

    // categoryDiv.appendChild(badge);
    categoryDiv.appendChild(categorySpan);

    const productName = document.createElement('h3');
    productName.className = 'text-h3 font-semibold py-3';
    productName.textContent = product.product_name;

    contentDiv.appendChild(categoryDiv);
    contentDiv.appendChild(productName);

    anchor.appendChild(imageDiv);
    anchor.appendChild(contentDiv);

    return anchor;
}
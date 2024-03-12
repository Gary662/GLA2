document.addEventListener('DOMContentLoaded', function () {
    // Get references to HTML elements
    const productListDiv = document.getElementById('product-list');
    const fetchButton = document.getElementById('fetch-button');
    const categorySelect = document.getElementById('category');
    const sortSelect = document.getElementById('sort');

    // Event listener for the fetch button
    fetchButton.addEventListener('click', function () {
        // Fetch product data from the API
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(products => {
                // Clear previous content
                productListDiv.innerHTML = '';

                // Filter and sort products based on user input
                let filteredProducts = filterProducts(products, categorySelect.value);
                filteredProducts = sortProducts(filteredProducts, sortSelect.value);

                // Display the filtered and sorted products
                filteredProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');

                    const image = document.createElement('img');
                    image.src = product.image;

                    const title = document.createElement('h3');
                    title.textContent = product.title;

                    const price = document.createElement('p');
                    price.textContent = 'Price: $' + product.price.toFixed(2);

                    const description = document.createElement('p');
                    description.textContent = product.description;

                    productCard.appendChild(image);
                    productCard.appendChild(title);
                    productCard.appendChild(price);
                    productCard.appendChild(description);

                    productListDiv.appendChild(productCard);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    // Function to filter products based on category
    function filterProducts(products, category) {
        return category ? products.filter(product => product.category === category) : products;
    }

    // Function to sort products based on price and order
    function sortProducts(products, order) {
        return order === 'asc' ? products.sort((a, b) => a.price - b.price) : products.sort((a, b) => b.price - a.price);
    }
});

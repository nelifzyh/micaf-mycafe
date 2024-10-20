document.addEventListener('DOMContentLoaded', function () {
    // Scroll ke menu kategori
    document.getElementById('scrollMenu').addEventListener('click', function () {
        document.getElementById('menuSection').scrollIntoView({ behavior: 'smooth' });
    });

    // Ambil data kategori dari API
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => response.json())
        .then(data => {
            const categories = data.categories;
            const veganCategory = categories.find(category => category.strCategory === 'Vegan');

            // Update gambar vegan category
            if (veganCategory) {
                document.getElementById('veganImage').src = veganCategory.strCategoryThumb;
            }

            // Populate kategori makanan
            const categoryList = document.getElementById('category-list');
            categories.forEach(category => {
                const categoryItem = `
                    <div class="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onclick="goToCategoryDetail('${category.strCategory}')">
                        <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-full h-48 object-cover">
                        <h3 class="text-center p-4 text-lg font-semibold">${category.strCategory}</h3>
                    </div>
                `;
                categoryList.innerHTML += categoryItem;
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
});

// Fungsi untuk navigasi ke halaman detail kategori
function goToCategoryDetail(category) {
    window.location.href = `category_detail.html?category=${category}`;
}

document.addEventListener('DOMContentLoaded', function () {
    // Ambil nama kategori dari URL
    const params = new URLSearchParams(window.location.search);
    const categoryName = params.get('category');

    // Set judul kategori
    document.getElementById('categoryTitle').textContent = `${categoryName}`;

    // Ambil data makanan dari kategori yang dipilih
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            const mealList = document.getElementById('meal-list');

            // Tampilkan daftar makanan
            meals.forEach(meal => {
                const mealItem = `
                    <div class="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onclick="goToMealDetail('${meal.idMeal}')">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover">
                        <h3 class="text-center p-4 text-lg font-semibold">${meal.strMeal}</h3>
                    </div>
                `;
                mealList.innerHTML += mealItem;
            });
        })
        .catch(error => console.error('Error fetching meals:', error));
});

// Fungsi untuk navigasi ke halaman detail makanan
function goToMealDetail(mealId) {
    window.location.href = `meals_detail.html?mealId=${mealId}`;
}

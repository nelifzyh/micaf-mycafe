document.addEventListener('DOMContentLoaded', function () {
    // Ambil mealId dari URL
    const params = new URLSearchParams(window.location.search);
    const mealId = params.get('mealId');

    // Ambil data detail makanan dari API
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const mealDetail = document.getElementById('mealDetail');

            // Tampilkan detail makanan
            const detailContent = `
                <h2 class="text-3xl font-bold mb-4 text-center">${meal.strMeal}</h2>
                <img id="mealImage" src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-96 object-cover rounded-lg mb-6 cursor-pointer">

                <h3 class="text-2xl font-semibold mb-4">Recipe (Bahan-bahan):</h3>
                <ul class="list-disc pl-5 mb-6">
                    ${getIngredients(meal)}
                </ul>

                <h3 class="text-2xl font-semibold mb-4">Tutorial (Langkah-langkah):</h3>
                <ul class="list-disc pl-5 mb-6">
                    ${getInstructions(meal.strInstructions)}
                </ul>

                <h3 class="text-2xl font-semibold mb-4">Video Resep:</h3>
                ${getYoutubeEmbed(meal.strYoutube)}
            `;
            mealDetail.innerHTML = detailContent;

            // Tambahkan event listener untuk gambar
            const mealImage = document.getElementById('mealImage');
            const imagePopup = document.getElementById('imagePopup');
            const popupImage = document.getElementById('popupImage');
            const closePopup = document.getElementById('closePopup');

            mealImage.addEventListener('click', function() {
                popupImage.src = meal.strMealThumb; // Set sumber gambar pop-up
                imagePopup.classList.remove('hidden'); // Tampilkan pop-up
            });

            // Tutup pop-up saat tombol 'X' diklik
            closePopup.addEventListener('click', function() {
                imagePopup.classList.add('hidden'); // Sembunyikan pop-up
            });
        })
        .catch(error => console.error('Error fetching meal details:', error));
});

// Fungsi untuk mendapatkan daftar bahan-bahan makanan
function getIngredients(meal) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredients;
}

// Fungsi untuk memformat instruksi jadi list langkah-langkah
function getInstructions(instructions) {
    // Pecah instruksi menjadi paragraf lalu buat list dari setiap langkah
    return instructions
        .split('\n')
        .filter(step => step.trim() !== '')
        .map(step => step.replace(/^\d+\.\s*/, '')) // Menghapus angka di depan
        .map(step => step.replace(/^\D*\s*/, '')) // Menghapus karakter non-digit di awal jika ada
        .map(step => `<li>${step}</li>`) // Membuat elemen list
        .join('');
}


// Fungsi untuk meng-embed video YouTube
function getYoutubeEmbed(youtubeUrl) {
    if (!youtubeUrl) return '<p>Tidak ada video resep yang tersedia.</p>';

    // Ekstrak ID video dari URL
    const videoId = youtubeUrl.split('v=')[1].split('&')[0]; // Mengambil ID video
    return `
        <div class="mb-4"> <!-- Memastikan rasio aspek 16:9 -->
            <iframe class="aspect-w-16 aspect-h-9" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        </div>
    `;
}


const favoritesGrid = document.getElementById('favorites-grid');

// Función para obtener los brawlers favoritos del almacenamiento local
function getFavoriteBrawlers() {
    const favorites = localStorage.getItem('favoriteBrawlers');
    return favorites ? JSON.parse(favorites) : [];
}

// Función para mostrar los brawlers favoritos en la página
function displayFavoriteBrawlers() {
    const favoriteBrawlers = getFavoriteBrawlers();
    favoritesGrid.innerHTML = '';
    if (favoriteBrawlers.length === 0) {
        favoritesGrid.innerHTML = '<p>No tienes brawlers favoritos.</p>';
    } else {
        favoriteBrawlers.forEach(brawler => {
            const brawlerCard = document.createElement('div');
            brawlerCard.classList.add('brawler-card');
            brawlerCard.innerHTML = `
                <img src="${brawler.imageUrl}" alt="${brawler.name}">
                <h3>${brawler.name}</h3>
                <button class="remove-favorite" data-id="${brawler.id}">Eliminar</button>
            `;
            favoritesGrid.appendChild(brawlerCard);
        });

        // Agrega eventos de clic a los botones "Eliminar"
        const removeButtons = document.querySelectorAll('.remove-favorite');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeFavorite);
        });
    }
}

// Función para eliminar un brawler de favoritos
function removeFavorite(event) {
    const brawlerId = event.currentTarget.dataset.id;
    console.log('ID del brawler a eliminar:', brawlerId); // Agrega esta línea para depurar
    const favoriteBrawlers = getFavoriteBrawlers().filter(brawler => brawler.id !== brawlerId);
    localStorage.setItem('favoriteBrawlers', JSON.stringify(favoriteBrawlers));
    displayFavoriteBrawlers();
}

// Mostrar los brawlers favoritos al cargar la página
displayFavoriteBrawlers();
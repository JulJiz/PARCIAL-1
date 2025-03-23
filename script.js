const brawlersGrid = document.getElementById('brawlers-grid');
const searchInput = document.getElementById('search-input');

async function fetchBrawlers() {
    try {
        const response = await fetch('https://api.brawlapi.com/v1/brawlers');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.list; // La API de BrawlAPI devuelve los brawlers en data.list
    } catch (error) {
        console.error('Error fetching brawlers:', error);
        return []; // Retorna un array vacío en caso de error
    }
}

async function displayBrawlers() {
    const brawlers = await fetchBrawlers();
    brawlersGrid.innerHTML = '';
    brawlers.forEach(brawler => {
        const brawlerCard = document.createElement('div');
        brawlerCard.classList.add('brawler-card');
        brawlerCard.innerHTML = `
            <img src="${brawler.imageUrl}" alt="${brawler.name}">
            <h3>${brawler.name}</h3>
        `;
        brawlerCard.dataset.brawlerId = brawler.id; // Agrega el ID del brawler como un atributo de datos
        brawlersGrid.appendChild(brawlerCard);
    });

    // Agrega un evento de clic a cada tarjeta de brawler
    const brawlerCards = document.querySelectorAll('.brawler-card');
    brawlerCards.forEach(card => {
        card.addEventListener('click', showBrawlerDetails);
    });
}

async function showBrawlerDetails(event) {
    const brawlerId = event.currentTarget.dataset.brawlerId;
    const brawler = await getBrawlerById(brawlerId);

    if (brawler) {
        // Muestra la información del brawler en el modal
        const brawlerDetails = document.getElementById('brawler-details');
        brawlerDetails.innerHTML = `
            <h2>${brawler.name}</h2>
            <img src="${brawler.imageUrl}" alt="${brawler.name}">
            <p>Rarity: ${brawler.rarity}</p>
            <p>Class: ${brawler.class}</p>
            <p>Health: ${brawler.health}</p>
            <p>Attack: ${brawler.attack}</p>
            <p>Super: ${brawler.super}</p>
            <p>Star Powers: ${brawler.starPowers.map(power => power.name).join(', ')}</p>
            <p>Gadgets: ${brawler.gadgets.map(gadget => gadget.name).join(', ')}</p>
            <p>Description: ${brawler.description}</p>
        `;

        // Agrega un botón para agregar a favoritos
        const favoriteButton = document.createElement('button');
        favoriteButton.textContent = 'Agregar a Favoritos';
        favoriteButton.addEventListener('click', () => {
            addToFavorites(brawler);
        });
        brawlerDetails.appendChild(favoriteButton);

        // Muestra el modal
        const modal = document.getElementById('brawler-modal');
        modal.style.display = 'block';

        // Agrega un evento de clic al botón de cierre del modal
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    } else {
        console.error('Brawler not found');
    }
}

async function getBrawlerById(brawlerId) {
    try {
        const response = await fetch(`https://api.brawlapi.com/v1/brawlers/${brawlerId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching brawler details:', error);
        return null;
    }
}

async function filterBrawlers() {
    const brawlers = await fetchBrawlers();
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBrawlers = brawlers.filter(brawler => {
        const brawlerName = brawler.name.toLowerCase().includes(searchTerm);
        // Verifica si brawler.rarity existe y es una cadena antes de usar toLowerCase()
        const brawlerRarity = brawler.rarity && typeof brawler.rarity === 'string' && brawler.rarity.toLowerCase().includes(searchTerm);
        return brawlerName || brawlerRarity;
    });

    brawlersGrid.innerHTML = '';
    filteredBrawlers.forEach(brawler => {
        const brawlerCard = document.createElement('div');
        brawlerCard.classList.add('brawler-card');
        brawlerCard.innerHTML = `
            <img src="${brawler.imageUrl}" alt="${brawler.name}">
            <h3>${brawler.name}</h3>
        `;
        brawlersGrid.appendChild(brawlerCard);
    });
}

// Función para agregar un brawler a favoritos
function addToFavorites(brawler) {
    const favoriteBrawlers = getFavoriteBrawlers();
    favoriteBrawlers.push(brawler);
    localStorage.setItem('favoriteBrawlers', JSON.stringify(favoriteBrawlers));
}

// Función para obtener los brawlers favoritos del almacenamiento local
function getFavoriteBrawlers() {
    const favorites = localStorage.getItem('favoriteBrawlers');
    return favorites ? JSON.parse(favorites) : [];
}

displayBrawlers();
searchInput.addEventListener('input', filterBrawlers);
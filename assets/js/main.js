function renderTeamSection() {
    const teamSection = document.getElementById('team-section');
    if (!teamSection) return;

    const teamMembers = app.getTeamMembers();
    
    const isMainPage = window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
    
    if (isMainPage) {
        // En la página principal
        teamSection.innerHTML = `
            <section class="team-section">
                <div class="container">
                    <h2>Nuestro Equipo</h2>
                    <div class="team-grid">
                        ${teamMembers.map(member => `
                            <div class="team-member">
                                <img src="${member.image}" alt="${member.name}" onerror="this.src='assets/images/colt.webp'">
                                <h3>${member.name}</h3>
                                <h4>${member.role}</h4>
                                <p>${member.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    } else {
        // En about us
        teamSection.innerHTML = `
            <section class="team-section">
                <div class="container">
                    <h2>Nuestro Equipo</h2>
                    <div class="team-grid">
                        ${teamMembers.map(member => `
                            <div class="team-member">
                                <h3>${member.name}</h3>
                                <h4>${member.role}</h4>
                                <p>${member.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }
}

function renderBrawlersGrid() {
    const brawlersGrid = document.getElementById('brawlers-grid');
    if (!brawlersGrid) return;

    const brawlers = app.getAllBrawlers();
    
    brawlersGrid.innerHTML = brawlers.map(brawler => `
        <div class="brawler-card" data-brawler-id="${brawler.id}">
            <img src="${brawler.image}" alt="${brawler.name}" onerror="this.src='assets/images/colt.webp'">
            <h3>${brawler.name}</h3>
            <p class="rarity">${brawler.rarity}</p>
            <p class="type">${brawler.type}</p>
        </div>
    `).join('');

    const brawlerCards = document.querySelectorAll('.brawler-card');
    brawlerCards.forEach(card => {
        card.addEventListener('click', handleBrawlerClick);
    });
}

function handleBrawlerClick(event) {
    const brawlerId = event.currentTarget.dataset.brawlerId;
    const brawler = app.getBrawlerById(brawlerId);
    
    if (brawler) {
        localStorage.setItem('selectedBrawler', JSON.stringify(brawler));
        window.location.href = 'brawler-detail.html';
    }
}

function renderBrawlerDetail() {
    const detailContainer = document.getElementById('brawler-detail');
    if (!detailContainer) return;

    const brawlerData = localStorage.getItem('selectedBrawler');
    if (!brawlerData) {
        detailContainer.innerHTML = '<p>No se encontró información del brawler.</p>';
        return;
    }

    const brawler = JSON.parse(brawlerData);
    const currentUser = app.getCurrentUser();
    const isFavorite = currentUser.favorites.some(fav => fav.id === brawler.id);

    detailContainer.innerHTML = `
        <div class="brawler-detail-content">
            <div class="brawler-image">
                <img src="${brawler.image}" alt="${brawler.name}" onerror="this.src='../assets/images/colt.webp'">
            </div>
            <div class="brawler-info">
                <h1>${brawler.name}</h1>
                <div class="brawler-stats">
                    <div class="stat">
                        <span class="stat-label">Rareza:</span>
                        <span class="stat-value">${brawler.rarity}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Tipo:</span>
                        <span class="stat-value">${brawler.type}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Vida:</span>
                        <span class="stat-value">${brawler.health}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Daño:</span>
                        <span class="stat-value">${brawler.damage}</span>
                    </div>
                </div>
                <p class="brawler-description">${brawler.description}</p>
                <button id="favorite-btn" class="btn ${isFavorite ? 'favorited' : ''}">
                    ${isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                </button>
            </div>
        </div>
    `;

    const favoriteBtn = document.getElementById('favorite-btn');
    favoriteBtn.addEventListener('click', () => toggleFavorite(brawler));
}

function toggleFavorite(brawler) {
    const currentUser = app.getCurrentUser();
    const isFavorite = currentUser.favorites.some(fav => fav.id === brawler.id);
    
    if (isFavorite) {
        currentUser.removeFromFavorites(brawler.id);
    } else {
        currentUser.addToFavorites(brawler);
    }
    
    renderBrawlerDetail();
}

function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    if (!favoritesContainer) return;

    const currentUser = app.getCurrentUser();
    const favorites = currentUser.favorites;

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No tienes brawlers favoritos aún.</p>';
        return;
    }

    favoritesContainer.innerHTML = `
        <div class="favorites-grid">
            ${favorites.map(brawler => `
                <div class="favorite-card" data-brawler-id="${brawler.id}">
                    <img src="${brawler.image}" alt="${brawler.name}" onerror="this.src='../assets/images/colt.webp'">
                    <h3>${brawler.name}</h3>
                    <p>${brawler.rarity}</p>
                    <button class="remove-favorite" data-brawler-id="${brawler.id}">Eliminar</button>
                </div>
            `).join('')}
        </div>
    `;

    const removeButtons = document.querySelectorAll('.remove-favorite');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const brawlerId = parseInt(button.dataset.brawlerId);
            currentUser.removeFromFavorites(brawlerId);
            renderFavorites();
        });
    });

    const favoriteCards = document.querySelectorAll('.favorite-card');
    favoriteCards.forEach(card => {
        card.addEventListener('click', handleBrawlerClick);
    });
}

function renderUserProfile() {
    const profileContainer = document.getElementById('profile-container');
    if (!profileContainer) return;

    const currentUser = app.getCurrentUser();
    
    // Ajustar la ruta de la imagen según la página
    let imagePath = currentUser.profileImage;
    if (window.location.pathname.includes('/pages/')) {
        imagePath = '../' + currentUser.profileImage;
    }
    
    profileContainer.innerHTML = `
        <div class="profile-content">
            <img src="${imagePath}" alt="${currentUser.username}" class="profile-picture" onerror="this.src='../assets/images/colt.webp'">
            <div class="profile-info">
                <h2>${currentUser.username}</h2>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Brawlers Favoritos:</strong> ${currentUser.favorites.length}</p>
                <p><strong>Estado:</strong> ${currentUser.isLoggedIn ? 'Conectado' : 'Desconectado'}</p>
            </div>
        </div>
    `;
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        const filteredBrawlers = app.searchBrawlers(searchTerm);
        
        const brawlersGrid = document.getElementById('brawlers-grid');
        brawlersGrid.innerHTML = filteredBrawlers.map(brawler => `
            <div class="brawler-card" data-brawler-id="${brawler.id}">
                <img src="${brawler.image}" alt="${brawler.name}" onerror="this.src='assets/images/colt.webp'">
                <h3>${brawler.name}</h3>
                <p class="rarity">${brawler.rarity}</p>
                <p class="type">${brawler.type}</p>
            </div>
        `).join('');

        const brawlerCards = document.querySelectorAll('.brawler-card');
        brawlerCards.forEach(card => {
            card.addEventListener('click', handleBrawlerClick);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderTeamSection();
    renderBrawlersGrid();
    renderBrawlerDetail();
    renderFavorites();
    renderUserProfile();
    setupSearch();
}); 
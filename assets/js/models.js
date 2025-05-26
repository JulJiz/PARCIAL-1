class TeamMember {
    constructor(name, role, description, image) {
        this.name = name;
        this.role = role;
        this.description = description;
        this.image = image;
    }
}

class User {
    constructor(id, username, email, password, profileImage) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImage = profileImage;
        this.favorites = [];
        this.isLoggedIn = false;
    }

    addToFavorites(brawler) {
        if (!this.favorites.find(fav => fav.id === brawler.id)) {
            this.favorites.push(brawler);
        }
    }

    removeFromFavorites(brawlerId) {
        this.favorites = this.favorites.filter(fav => fav.id !== brawlerId);
    }

    login() {
        this.isLoggedIn = true;
    }

    logout() {
        this.isLoggedIn = false;
    }
}

class Brawler {
    constructor(id, name, rarity, type, health, damage, description, image) {
        this.id = id;
        this.name = name;
        this.rarity = rarity;
        this.type = type;
        this.health = health;
        this.damage = damage;
        this.description = description;
        this.image = image;
    }

    getDetails() {
        return {
            id: this.id,
            name: this.name,
            rarity: this.rarity,
            type: this.type,
            health: this.health,
            damage: this.damage,
            description: this.description,
            image: this.image
        };
    }
}

class BrawlStarsApp {
    constructor() {
        this.users = [];
        this.brawlers = [];
        this.teamMembers = [];
        this.currentUser = null;
        this.initializeData();
    }

    initializeData() {
        this.createTeamMembers();
        this.createUsers();
        this.createBrawlers();
    }

    createTeamMembers() {
        this.teamMembers = [
            new TeamMember(
                "Juliana Jiménez Delgado",
                "A00400789 - Estudiante Diseño de medios",
                "Experta en diseño interactivo y medios digitales. Enfocada en la creación de experiencias inmersivas y contenido visual impactante.",
                "assets/images/foto_juliana.jpg"
            ),
            new TeamMember(
                "Francisco Madrid",
                "A00399875 - Estudiante Diseño de medios",
                "Especialista en diseño visual y experiencia de usuario. Apasionado por crear interfaces atractivas y funcionales para videojuegos.",
                "assets/images/foto_francisco.jpg"
            )
        ];
    }

    createUsers() {
        const user1 = new User(1, "juliana_design", "juliana@email.com", "123456", "assets/images/foto_juliana.jpg");
        const user2 = new User(2, "francisco_media", "francisco@email.com", "123456", "assets/images/foto_francisco.jpg");
        
        this.users.push(user1, user2);
        this.currentUser = user1;
        this.currentUser.login();
    }

    createBrawlers() {
        const brawlersData = [
            { id: 1, name: "Shelly", rarity: "Común", type: "Luchador", health: 3600, damage: 300, description: "Shelly es una luchadora resistente con una escopeta devastadora.", image: "https://cdn.brawlify.com/brawlers/portraits/16000000.png" },
            { id: 2, name: "Colt", rarity: "Común", type: "Tirador", health: 2400, damage: 360, description: "Colt es un tirador de élite con pistolas de largo alcance.", image: "https://cdn.brawlify.com/brawlers/portraits/16000001.png" },
            { id: 3, name: "Bull", rarity: "Común", type: "Tanque", health: 5000, damage: 400, description: "Bull es un tanque poderoso que causa mucho daño a corta distancia.", image: "https://cdn.brawlify.com/brawlers/portraits/16000002.png" },
            { id: 4, name: "Jessie", rarity: "Común", type: "Tirador", health: 3000, damage: 820, description: "Jessie puede invocar una torreta que ataca automáticamente a los enemigos.", image: "https://cdn.brawlify.com/brawlers/portraits/16000003.png" },
            { id: 5, name: "Brock", rarity: "Común", type: "Tirador", health: 2400, damage: 1040, description: "Brock lanza cohetes explosivos que causan daño en área.", image: "https://cdn.brawlify.com/brawlers/portraits/16000004.png" },
            { id: 6, name: "Dynamike", rarity: "Común", type: "Lanzador", health: 2400, damage: 760, description: "Dynamike lanza dinamita que explota después de un tiempo.", image: "https://cdn.brawlify.com/brawlers/portraits/16000005.png" },
            { id: 7, name: "Bo", rarity: "Común", type: "Tirador", health: 3600, damage: 504, description: "Bo es un rastreador que puede colocar minas explosivas.", image: "https://cdn.brawlify.com/brawlers/portraits/16000006.png" },
            { id: 8, name: "El Primo", rarity: "Común", type: "Tanque", health: 6000, damage: 360, description: "El Primo es un luchador cuerpo a cuerpo muy resistente.", image: "https://cdn.brawlify.com/brawlers/portraits/16000007.png" },
            { id: 9, name: "Barley", rarity: "Común", type: "Lanzador", health: 2400, damage: 560, description: "Barley lanza botellas que crean charcos de daño.", image: "https://cdn.brawlify.com/brawlers/portraits/16000008.png" },
            { id: 10, name: "Poco", rarity: "Común", type: "Soporte", health: 3600, damage: 660, description: "Poco puede curar a sus aliados con su música.", image: "https://cdn.brawlify.com/brawlers/portraits/16000009.png" },
            { id: 11, name: "Rosa", rarity: "Raro", type: "Tanque", health: 4200, damage: 644, description: "Rosa es una botánica que puede volverse temporalmente invulnerable.", image: "https://cdn.brawlify.com/brawlers/portraits/16000010.png" },
            { id: 12, name: "Rico", rarity: "Súper Raro", type: "Tirador", health: 2400, damage: 448, description: "Rico dispara balas que rebotan en las paredes.", image: "https://cdn.brawlify.com/brawlers/portraits/16000011.png" },
            { id: 13, name: "Darryl", rarity: "Súper Raro", type: "Tanque", health: 4800, damage: 270, description: "Darryl puede rodar rápidamente hacia sus enemigos.", image: "https://cdn.brawlify.com/brawlers/portraits/16000012.png" },
            { id: 14, name: "Penny", rarity: "Súper Raro", type: "Tirador", health: 3000, damage: 872, description: "Penny puede colocar un cañón que ataca automáticamente.", image: "https://cdn.brawlify.com/brawlers/portraits/16000013.png" },
            { id: 15, name: "Carl", rarity: "Súper Raro", type: "Lanzador", health: 3800, damage: 756, description: "Carl lanza un pico que regresa como un boomerang.", image: "https://cdn.brawlify.com/brawlers/portraits/16000014.png" },
            { id: 16, name: "Jacky", rarity: "Súper Raro", type: "Tanque", health: 4800, damage: 1040, description: "Jacky usa un martillo neumático para atacar en área.", image: "https://cdn.brawlify.com/brawlers/portraits/16000015.png" },
            { id: 17, name: "Gus", rarity: "Épico", type: "Soporte", health: 3000, damage: 800, description: "Gus puede crear escudos fantasmales para proteger a su equipo.", image: "https://cdn.brawlify.com/brawlers/portraits/16000016.png" }
        ];

        brawlersData.forEach(data => {
            const brawler = new Brawler(
                data.id,
                data.name,
                data.rarity,
                data.type,
                data.health,
                data.damage,
                data.description,
                data.image
            );
            this.brawlers.push(brawler);
        });

        this.assignFavoritesToUsers();
    }

    assignFavoritesToUsers() {
        this.users[0].addToFavorites(this.brawlers[1]);
        this.users[0].addToFavorites(this.brawlers[4]);
        this.users[0].addToFavorites(this.brawlers[11]);

        this.users[1].addToFavorites(this.brawlers[0]);
        this.users[1].addToFavorites(this.brawlers[9]);
        this.users[1].addToFavorites(this.brawlers[16]);
    }

    getBrawlerById(id) {
        return this.brawlers.find(brawler => brawler.id === parseInt(id));
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getTeamMembers() {
        return this.teamMembers;
    }

    getAllBrawlers() {
        return this.brawlers;
    }

    searchBrawlers(searchTerm) {
        const term = searchTerm.toLowerCase();
        return this.brawlers.filter(brawler => 
            brawler.name.toLowerCase().includes(term) ||
            brawler.rarity.toLowerCase().includes(term) ||
            brawler.type.toLowerCase().includes(term)
        );
    }
}

const app = new BrawlStarsApp(); 
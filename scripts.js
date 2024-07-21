document.addEventListener('DOMContentLoaded', function() {
    // Initialize Fuse.js for search functionality
    const options = {
        includeScore: true,
        threshold: 0.3,
        keys: ['title']
    };

    const pages = [
        // Sports Pages
        { title: 'basketball', url: 'paiya.net/sports/basketball.html' },
        { title: 'football', url: 'paiya.net/sports/football.html' },
        { title: 'golf', url: 'paiya.net/sports/golf.html' },
        { title: 'padel', url: 'paiya.net/sports/padel.html' },
        { title: 'swimming', url: 'paiya.net/sports/swimming.html' },
        { title: 'tennis', url: 'paiya.net/sports/tennis.html' },
        // Clubs Pages
        { title: 'clubs', url: 'paiya.net/clubs/breweries.html' },
        // Museums Pages
        { title: 'art museums', url: 'paiya.net/museums/artmuseums.html' },
        { title: 'children museums', url: 'paiya.net/museums/childrenmuseums.html' },
        { title: 'history museums', url: 'paiya.net/museums/historymuseums.html' },
        { title: 'science museums', url: 'paiya.net/museums/sciencemuseums.html' },
        // Parks Pages
        { title: 'city parks', url: 'paiya.net/parks/cityparks.html' },
        { title: 'national parks', url: 'paiya.net/parks/nationalparks.html' },
        { title: 'theme parks', url: 'paiya.net/parks/themeparks.html' },
        { title: 'water parks', url: 'paiya.net/parks/waterparks.html' },
        // Restaurants Pages
        { title: 'african', url: 'paiya.net/restaurants/african.html' },
        { title: 'american', url: 'paiya.net/restaurants/american.html' },
        { title: 'asian', url: 'paiya.net/restaurants/asian.html' },
        { title: 'european', url: 'paiya.net/restaurants/european.html' },
        { title: 'indian', url: 'paiya.net/restaurants/indian.html' },
        { title: 'middle eastern', url: 'paiya.net/restaurants/middleeastern.html' }
    ];

    const fuse = new Fuse(pages, options);

    // Function to handle search
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    function handleSearch() {
        const query = searchBar.value.toLowerCase();
        const result = fuse.search(query);

        if (result.length > 0) {
            const currentPath = window.location.pathname;
            const basePath = getBasePath(currentPath);
            window.location.href = basePath + result[0].item.url;
        } else {
            alert('No matches found.');
        }
    }

    function getBasePath(currentPath) {
        // Find the depth of the current file within the directory structure
        const depth = (currentPath.match(/\//g) || []).length - 1;

        // Create the relative path to the root folder
        let basePath = '';
        for (let i = 0; i < depth; i++) {
            basePath += '../';
        }

        return basePath;
    }

    // Function to check screen size and apply scroll effect only on desktop
    function checkScroll() {
        const header = document.querySelector('header');
        if (window.innerWidth > 768) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Check scroll position on load
    checkScroll();

    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);

    const mobileMenu = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const closeMenu = document.querySelector('.close-menu');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    mobileMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    closeMenu.addEventListener('click', function() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
    });

    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const dropdown = this.querySelector('.dropdown');
                if (dropdown) {
                    const isActive = this.classList.contains('active');
                    // Slide up all other dropdowns
                    document.querySelectorAll('.menu-item .dropdown').forEach(d => {
                        d.style.maxHeight = '0';
                    });
                    // Remove active class from all other menu items
                    document.querySelectorAll('.menu-item').forEach(i => {
                        i.classList.remove('active');
                    });

                    if (isActive) {
                        // Slide up the dropdown
                        dropdown.style.maxHeight = '0';
                    } else {
                        // Slide down the dropdown
                        dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
                        // Add active class to the clicked menu item
                        this.classList.add('active');
                    }
                }
            } else {
                menuItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.menu-item') && !event.target.closest('.menu-toggle') && !event.target.closest('.close-menu')) {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            menuItems.forEach(item => {
                item.classList.remove('active');
                const dropdown = item.querySelector('.dropdown');
                if (dropdown) {
                    dropdown.style.maxHeight = '0';
                }
            });
        }
    });

    document.querySelector('nav').addEventListener('click', function(event) {
        event.stopPropagation();
    });
    
    const translations = {
        en: {
            search_placeholder: "Search for places...",
            language: "Language",
            restaurants: "Restaurants",
            european: "European",
            asian: "Asian",
            desserts: "Desserts",
            indian: "Indian",
            middleeastern: "Middle Eastern",
            fastfood: "Fast Food",
            shopping: "Shopping",
            sports: "Sports",
            football: "Football",
            basketball: "Basketball",
            tennis: "Tennis",
            golf: "Golf",
            padel: "Padel",
            swimming: "Swimming",
            clubs: "Clubs",
            museums: "Museums",
            asian_restaurants_header:"Asian Restaurants",
            european_restaurants_header:"European Restaurants",
            fastfood_restaurants_header:"Fast Food Restaurants",
            indian_restaurants_header:"Indian Restaurants",
            middleeastern_restaurants_header:"Middle Eastern Restaurants",
            welcome_message: "Welcome to Paiya.net",
            intro_message: "Find the best restaurants, bars, sports facilities, cinemas, and more.",
            top_restaurants: "Explore Top Restaurants",
            restaurant_description: "Discover the best dining experiences around you.",
            shopping_deals: "Latest Shopping Deals",
            shopping_description: "Discover the best shopping deals and discounts in stores near you.",
            sports_facilities: "Sports Facilities",
            sports_description: "Find the best places to enjoy your favorite sports.",
            nightlife_bars: "Nightlife and Bars",
            nightlife_description: "Experience the vibrant nightlife with the best bars and clubs.",
            interesting_museums: "Interesting Museums",
            museums_description: "Visit the most interesting museums and learn new things.",
            upcoming_events: "Upcoming Events",
            events_description: "Stay updated with the latest events happening in your city."
        },
        fr: {
            search_placeholder: "Rechercher des endroits...",
            language: "Langue",
            restaurants: "Restaurants",
            european: "Européen",
            asian: "Asiatique",
            desserts: "Desserts",
            indian: "Indien",
            middleeastern: "Moyen-Orient",
            fastfood: "Restauration rapide",
            shopping: "Shopping",
            sports: "Sports",
            football: "Football",
            basketball: "Basketball",
            tennis: "Tennis",
            golf: "Golf",
            padel: "Padel",
            swimming: "Natation",
            clubs: "Boites de Nuit",
            museums: "Musées",
            asian_restaurants_header:"Restaurants Asiatiques",
            european_restaurants_header:"Restaurants Européens",
            fastfood_restaurants_header:"Restaurants Fast-Food",
            indian_restaurants_header:"Restaurants Indiens",
            middleeastern_restaurants_header:"Restaurants du Moyen-Orient",
            welcome_message: "Bienvenue à Paiya.net",
            intro_message: "Trouvez les meilleurs restaurants, bars, installations sportives, cinémas, et plus encore.",
            top_restaurants: "Découvrez les meilleurs restaurants",
            restaurant_description: "Découvrez les meilleures expériences culinaires autour de vous.",
            shopping_deals: "Dernières offres de shopping",
            shopping_description: "Découvrez les meilleures offres et réductions dans les magasins près de chez vous.",
            sports_facilities: "Installations sportives",
            sports_description: "Trouvez les meilleurs endroits pour pratiquer vos sports préférés.",
            nightlife_bars: "Vie nocturne et bars",
            nightlife_description: "Découvrez la vie nocturne animée avec les meilleurs bars et clubs.",
            interesting_museums: "Musées intéressants",
            museums_description: "Visitez les musées les plus intéressants et apprenez de nouvelles choses.",
            upcoming_events: "Événements à venir",
            events_description: "Restez informé des derniers événements dans votre ville."
        },
        es: {
            search_placeholder: "Buscar lugares...",
            language: "Idioma",
            restaurants: "Restaurantes",
            european: "Europeo",
            asian: "Asiático",
            desserts: "Postres",
            indian: "Indio",
            middleeastern: "Medio Oriente",
            fastfood: "Comida rápida",
            shopping: "Compras",
            sports: "Deportes",
            football: "Fútbol",
            basketball: "Baloncesto",
            tennis: "Tenis",
            golf: "Golf",
            padel: "Pádel",
            swimming: "Natación",
            clubs: "Clubes Nocturnos",
            desserts: "Postres",
            asian_restaurants_header:"Restaurantes Asiáticos",
            european_restaurants_header:"Restaurantes Europeos",
            fastfood_restaurants_header:"Restaurantes de Comida Rápida",
            indian_restaurants_header:"Restaurantes Indios",
            middleeastern_restaurants_header:"Restaurantes de Medio Orientes",
            museums: "Museos",
            welcome_message: "Bienvenido a Paiya.net",
            intro_message: "Encuentra los mejores restaurantes, bares, instalaciones deportivas, cines y más.",
            top_restaurants: "Explora los mejores restaurantes",
            restaurant_description: "Descubre las mejores experiencias gastronómicas a tu alrededor.",
            shopping_deals: "Últimas ofertas de compras",
            shopping_description: "Descubre las mejores ofertas y descuentos en tiendas cercanas.",
            sports_facilities: "Instalaciones deportivas",
            sports_description: "Encuentra los mejores lugares para disfrutar de tus deportes favoritos.",
            nightlife_bars: "Vida nocturna y bares",
            nightlife_description: "Disfruta de la vibrante vida nocturna con los mejores bares y clubes.",
            interesting_museums: "Museos interesantes",
            museums_description: "Visita los museos más interesantes y aprende cosas nuevas.",
            upcoming_events: "Próximos eventos",
            events_description: "Mantente al tanto de los últimos eventos en tu ciudad."
        }
    };

    function applyTranslations(lang) {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            const translation = translations[lang][key];
            if (translation) {
                if (el.placeholder) {
                    el.placeholder = translation; // For placeholders
                } else {
                    el.textContent = translation;
                }
            }
        });
    }

    const languageButton = document.querySelector('.language-button');
    const languageDropdown = document.querySelector('.language-dropdown');

    languageButton.addEventListener('click', function() {
        languageDropdown.classList.toggle('active');
    });

    const languageOptions = document.querySelectorAll('.language-dropdown button');
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            if (selectedLang) {
                applyTranslations(selectedLang);
                document.documentElement.lang = selectedLang;
                languageButton.textContent = this.textContent;
                languageDropdown.classList.remove('active');
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.language-selector')) {
            languageDropdown.classList.remove('active');
        }
    });

    const savedLang = localStorage.getItem('selectedLanguage') || 'fr'; // Retrieve the saved language or default to English
    applyTranslations(savedLang);
    document.documentElement.lang = savedLang;
    languageButton.textContent = document.querySelector(`.language-dropdown button[data-lang="${savedLang}"]`).textContent;
});

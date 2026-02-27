const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");

// Hamburger menu toggle
hamburger.addEventListener("click", function() {
    sidebar.classList.toggle("open");
    hamburger.classList.toggle("open");
});

// Close sidebar when a link is clicked
const sidebarLinks = sidebar.querySelectorAll("a, button");
sidebarLinks.forEach(link => {
    link.addEventListener("click", function() {
        sidebar.classList.remove("open");
        hamburger.classList.remove("open");
    });
});

// Close sidebar when clicking outside
document.addEventListener("click", function(event) {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.classList.remove("open");
        hamburger.classList.remove("open");
    }
});

// Translation dictionary
const translations = {
    English: {
        'Home': 'Home',
        'Characters': 'Characters',
        'Weapons': 'Weapons',
        'Artifacts': 'Artifacts',
        'Achievements': 'Achievements',
        'Inventory': 'Inventory',
        'Enemy Creatures': 'Enemy Creatures',
        'Genius Invokation TCG': 'Genius Invokation TCG',
        'Spiral Abyss': 'Spiral Abyss',
        'Imaginarium Theater': 'Imaginarium Theater',
        'Stygian Onslaught': 'Stygian Onslaught',
        'Furnishings': 'Furnishings',
        'Furnishing Set': 'Furnishing Set',
        'Miliastra': 'Miliastra',
        'Wonderland': 'Wonderland',
        'Miliastra Wonderland Set': 'Miliastra Wonderland Set',
        'Miliastra Wonderland Inventory': 'Miliastra Wonderland Inventory',
        'Search': 'Search',
        'Diff': 'Diff',
        'Character Wishes': 'Character Wishes',
        'Settings': 'Settings',
        'PROJECT SKIRK': 'PROJECT SKIRK'
    },
    French: {
        'Home': 'Accueil',
        'Characters': 'Personnages',
        'Weapons': 'Armes',
        'Artifacts': 'Artefacts',
        'Achievements': 'Réalisations',
        'Inventory': 'Inventaire',
        'Enemy Creatures': 'Créatures Ennemies',
        'Genius Invokation TCG': 'Genius Invokation TCG',
        'Spiral Abyss': 'Abysses Spiralés',
        'Imaginarium Theater': 'Théâtre Imaginarium',
        'Stygian Onslaught': 'Assaut Stygien',
        'Furnishings': 'Mobilier',
        'Furnishing Set': 'Ensemble Mobilier',
        'Miliastra': 'Miliastra',
        'Wonderland': 'Pays des Merveilles',
        'Miliastra Wonderland Set': 'Ensemble Miliastra Pays des Merveilles',
        'Miliastra Wonderland Inventory': 'Inventaire Miliastra Pays des Merveilles',
        'Search': 'Rechercher',
        'Diff': 'Diff',
        'Character Wishes': 'Vœux de Personnage',
        'Settings': 'Paramètres',
        'PROJECT SKIRK': 'PROJECT SKIRK'
    },
    German: {
        'Home': 'Startseite',
        'Characters': 'Charaktere',
        'Weapons': 'Waffen',
        'Artifacts': 'Artefakte',
        'Achievements': 'Erfolge',
        'Inventory': 'Inventar',
        'Enemy Creatures': 'Feindliche Kreaturen',
        'Genius Invokation TCG': 'Genius Invokation TCG',
        'Spiral Abyss': 'Spiralabgrund',
        'Imaginarium Theater': 'Imaginarium Theater',
        'Stygian Onslaught': 'Stygischer Ansturm',
        'Furnishings': 'Einrichtung',
        'Furnishing Set': 'Einrichtungssatz',
        'Miliastra': 'Miliastra',
        'Wonderland': 'Wunderland',
        'Miliastra Wonderland Set': 'Miliastra Wunderland Set',
        'Miliastra Wonderland Inventory': 'Miliastra Wunderland Inventar',
        'Search': 'Suchen',
        'Diff': 'Diff',
        'Character Wishes': 'Charakterwünsche',
        'Settings': 'Einstellungen',
        'PROJECT SKIRK': 'PROJECT SKIRK'
    },
    Spanish: {
        'Home': 'Inicio',
        'Characters': 'Personajes',
        'Weapons': 'Armas',
        'Artifacts': 'Artefactos',
        'Achievements': 'Logros',
        'Inventory': 'Inventario',
        'Enemy Creatures': 'Criaturas Enemigas',
        'Genius Invokation TCG': 'Genius Invokation TCG',
        'Spiral Abyss': 'Abismo Espiral',
        'Imaginarium Theater': 'Teatro Imaginarium',
        'Stygian Onslaught': 'Asalto Estigio',
        'Furnishings': 'Amueblado',
        'Furnishing Set': 'Conjunto de Amueblado',
        'Miliastra': 'Miliastra',
        'Wonderland': 'País de las Maravillas',
        'Miliastra Wonderland Set': 'Conjunto Miliastra País de las Maravillas',
        'Miliastra Wonderland Inventory': 'Inventario Miliastra País de las Maravillas',
        'Search': 'Buscar',
        'Diff': 'Diff',
        'Character Wishes': 'Deseos de Personajes',
        'Settings': 'Configuración',
        'PROJECT SKIRK': 'PROJECT SKIRK'
    },
    Chinese: {
        'Home': '首页',
        'Characters': '角色',
        'Weapons': '武器',
        'Artifacts': '圣遗物',
        'Achievements': '成就',
        'Inventory': '背包',
        'Enemy Creatures': '敌人生物',
        'Genius Invokation TCG': '天才召唤卡牌游戏',
        'Spiral Abyss': '深境螺旋',
        'Imaginarium Theater': '想象剧场',
        'Stygian Onslaught': '冥想之茵梦游仙境',
        'Furnishings': '家具',
        'Furnishing Set': '家具套装',
        'Miliastra': '米莱丝特拉',
        'Wonderland': '仙境',
        'Miliastra Wonderland Set': '米莱丝特拉仙境套装',
        'Miliastra Wonderland Inventory': '米莱丝特拉仙境背包',
        'Search': '搜索',
        'Diff': '对比',
        'Character Wishes': '角色祈愿',
        'Settings': '设置',
        'PROJECT SKIRK': '天命计划'
    },
    Japanese: {
        'Home': 'ホーム',
        'Characters': 'キャラクター',
        'Weapons': '武器',
        'Artifacts': '聖遺物',
        'Achievements': '実績',
        'Inventory': 'インベントリ',
        'Enemy Creatures': '敵の生き物',
        'Genius Invokation TCG': 'ジーニアスインヴォケーション TCG',
        'Spiral Abyss': '深境螺旋',
        'Imaginarium Theater': '想像シアター',
        'Stygian Onslaught': 'スティギアン・オンスロート',
        'Furnishings': '家具',
        'Furnishing Set': '家具セット',
        'Miliastra': 'ミリアストラ',
        'Wonderland': 'ワンダーランド',
        'Miliastra Wonderland Set': 'ミリアストラ ワンダーランド セット',
        'Miliastra Wonderland Inventory': 'ミリアストラ ワンダーランド インベントリ',
        'Search': '検索',
        'Diff': '差分',
        'Character Wishes': 'キャラクターウィッシュ',
        'Settings': '設定',
        'PROJECT SKIRK': '天命計画'
    }
};

// Toggle a body class when pointer is near left edge for accessibility
document.addEventListener("mousemove", function(e) {
    if (e.clientX < 24) {
        document.documentElement.classList.add('sidebar-open');
    } else if (!sidebar.matches(':hover')) {
        document.documentElement.classList.remove('sidebar-open');
    }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.documentElement.classList.remove('sidebar-open');
});

// CHARACTER CARD IMAGE CYCLING
function initializeCharacterCardCycling() {
    const cardImg = document.getElementById('charactersCardImgBlurred');
    if (!cardImg) return;
    
    let characters = [];
    let currentCharIndex = 0;
    
    // Fetch characters data
    fetch('characters.json')
        .then(response => response.json())
        .then(data => {
            characters = data;
            if (characters.length > 0) {
                // Cycle through characters every 2 seconds
                setInterval(() => {
                    if (characters.length > 0) {
                        const character = characters[currentCharIndex];
                        // Fade out
                        cardImg.style.opacity = '0';
                        
                        setTimeout(() => {
                            cardImg.src = character.image;
                            // Fade in
                            cardImg.style.opacity = '0.6';
                        }, 250);
                        
                        currentCharIndex = (currentCharIndex + 1) % characters.length;
                    }
                }, 2000);
            }
        })
        .catch(error => console.error('Error loading characters:', error));
}

// WEAPONS AND ARTIFACTS CARD FADE ANIMATION
function initializeCardFadeAnimation() {
    const cardElements = [
        document.getElementById('weaponsCardImg'),
        document.getElementById('artifactsCardImg')
    ];
    
    // Function to create fade animation for a card
    const createFadeLoop = (cardElement) => {
        if (!cardElement) return;
        
        setInterval(() => {
            // Fade out
            cardElement.style.opacity = '0';
            
            setTimeout(() => {
                // Fade in
                cardElement.style.opacity = '0.6';
            }, 250);
        }, 2000);
    };
    
    cardElements.forEach(createFadeLoop);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeCharacterCardCycling();
        initializeCardFadeAnimation();
    });
} else {
    initializeCharacterCardCycling();
    initializeCardFadeAnimation();
}

// SETTINGS MODAL
document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.getElementById('settingsBtn');
    const topSettingsBtn = document.getElementById('topSettingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeModalBtn = document.querySelector('.modal-close');

    // Sidebar settings button
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('open');
        });
    }

    // Top navbar settings button
    if (topSettingsBtn) {
        topSettingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('open');
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            settingsModal.classList.remove('open');
        });
    }

    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('open');
            }
        });
    }

    // Load settings from localStorage
    loadSettings();

    // Apply loaded settings
    applyAllSettings();

    // Save button support
    const saveBtn = document.getElementById('saveSettingsBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveSettings();
            applyAllSettings();
        });
    }

    // Save settings when changed
    const selects = document.querySelectorAll('.settings-row select');
    const checkboxes = document.querySelectorAll('.settings-row input[type="checkbox"]');

    selects.forEach(select => {
        select.addEventListener('change', () => {
            saveSettings();
            applyAllSettings();
        });
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveSettings();
            applyAllSettings();
        });
    });
});

function saveSettings() {
    const language = document.getElementById('language')?.value || 'English';
    const region = document.getElementById('region')?.value || 'Europe';
    const twin = document.getElementById('twin')?.value || 'Male';
    const displayStyle = document.getElementById('displayStyle')?.value || 'Slider';
    const defaultLvl = document.getElementById('defaultLvl')?.value || '1';
    const defaultLvlConstellation = document.getElementById('defaultLvlConstellation')?.value || 'None';
    const defaultDecimal = document.getElementById('defaultDecimal')?.value || 'Default';
    const addConstellations = document.getElementById('addConstellations')?.checked || false;
    const unreleased = document.getElementById('unreleased')?.value || 'Disable';

    const settings = {
        language,
        region,
        twin,
        displayStyle,
        defaultLvl,
        defaultLvlConstellation,
        defaultDecimal,
        addConstellations,
        unreleased
    };

    localStorage.setItem('projectSirkSettings', JSON.stringify(settings));
}

function loadSettings() {
    const stored = localStorage.getItem('projectSirkSettings');
    if (!stored) return;

    const settings = JSON.parse(stored);
    if (document.getElementById('language')) document.getElementById('language').value = settings.language;
    if (document.getElementById('region')) document.getElementById('region').value = settings.region;
    if (document.getElementById('twin')) document.getElementById('twin').value = settings.twin;
    if (document.getElementById('displayStyle')) document.getElementById('displayStyle').value = settings.displayStyle;
    if (document.getElementById('defaultLvl')) document.getElementById('defaultLvl').value = settings.defaultLvl;
    if (document.getElementById('defaultLvlConstellation')) document.getElementById('defaultLvlConstellation').value = settings.defaultLvlConstellation;
    if (document.getElementById('defaultDecimal')) document.getElementById('defaultDecimal').value = settings.defaultDecimal;
    if (document.getElementById('addConstellations')) document.getElementById('addConstellations').checked = settings.addConstellations;
    if (document.getElementById('unreleased')) document.getElementById('unreleased').value = settings.unreleased;
}

function applyAllSettings() {
    applyLanguage();
    applyRegionSettings();
    applyTwinSettings();
    applyDisplaySettings();
    applyUnreleasedContent();
}

function applyLanguage() {
    const language = document.getElementById('language')?.value || 'English';
    const dict = translations[language] || translations['English'];

    // Translate sidebar menu items
    document.querySelectorAll('.sidebar ul li a .text, .sidebar ul li button .text').forEach(el => {
        const originalText = el.textContent.trim();
        if (dict[originalText]) {
            el.textContent = dict[originalText];
        }
    });

    // Translate nav logo
    const navLogo = document.querySelector('nav .logo');
    if (navLogo && dict[navLogo.textContent.trim()]) {
        navLogo.textContent = dict[navLogo.textContent.trim()];
    }

    // Translate any element marked with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
}

function applyRegionSettings() {
    const region = document.getElementById('region')?.value || 'Europe';
    document.documentElement.setAttribute('data-region', region);
    // Can be used for region-specific styling or content
}

function applyTwinSettings() {
    const twin = document.getElementById('twin')?.value || 'Male';
    document.documentElement.setAttribute('data-twin', twin);
    // Can be used for character pronouns or appearance
}

function applyDisplaySettings() {
    const displayStyle = document.getElementById('displayStyle')?.value || 'Slider';
    const defaultLvl = document.getElementById('defaultLvl')?.value || '1';
    const defaultDecimal = document.getElementById('defaultDecimal')?.value || 'Default';
    
    document.documentElement.setAttribute('data-display-style', displayStyle);
    document.documentElement.setAttribute('data-default-lvl', defaultLvl);
    document.documentElement.setAttribute('data-default-decimal', defaultDecimal);
}

function applyUnreleasedContent() {
    const unreleased = document.getElementById('unreleased')?.value || 'Disable';
    if (unreleased === 'Disable') {
        document.documentElement.setAttribute('data-unreleased', 'hidden');
    } else {
        document.documentElement.removeAttribute('data-unreleased');
    }
}

// -------------------- generic search support --------------------
function initializePageSearch() {
    const input = document.getElementById('pageSearchInput');
    const results = document.getElementById('pageSearchResults');
    if (!input || !results) return;
    const url = results.dataset.source;
    let items = [];

    const render = (list) => {
        results.innerHTML = '';
        if (!list || list.length === 0) {
            results.innerHTML = '<p style="grid-column:1/-1;text-align:center;opacity:0.6">No items found.</p>';
            return;
        }
        list.forEach(i => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.padding = '14px';
            card.style.minHeight = '80px';
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.justifyContent = 'center';
            card.innerText = i.name || '(unnamed)';
            results.appendChild(card);
        });
    };

    fetch(url)
        .then(r => r.json())
        .then(data => {
            items = data || [];
            render(items);
        })
        .catch(err => {
            console.error('Search data load failed', err);
            results.innerHTML = '<p style="grid-column:1/-1;text-align:center;opacity:0.6">Failed to load data.</p>';
        });

    input.addEventListener('input', () => {
        const term = input.value.trim().toLowerCase();
        if (!term) {
            render(items);
        } else {
            render(items.filter(i => (i.name || '').toLowerCase().includes(term)));
        }
    });
}

document.addEventListener('DOMContentLoaded', initializePageSearch);
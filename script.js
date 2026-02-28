const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");

// Hamburger menu toggle
hamburger.addEventListener("click", function() {
    sidebar.classList.toggle("open");
    hamburger.classList.toggle("open");
    document.body.classList.toggle("sidebar-open");
});

// SEARCH FUNCTIONALITY
function initializeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchResults = document.getElementById('searchResults');
    let charactersData = [];
    let weaponsData = [];
    let artifactsData = [];

    // Open search modal
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('open');
            searchInput.focus();
        });
    }

    // Close search modal
    const closeSearch = () => {
        searchModal.classList.remove('open');
        searchInput.value = '';
        searchResults.innerHTML = '<p style="text-align: center; color: #999; margin-top: 20px;">Start typing to search...</p>';
    };

    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', closeSearch);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('open')) {
            closeSearch();
        }
    });

    // Fetch data
    Promise.all([
        fetch('characters.json').then(r => r.json()).catch(() => []),
        fetch('weapons.json').then(r => r.json()).catch(() => []),
        fetch('artifacts.json').then(r => r.json()).catch(() => [])
    ]).then(([chars, weaps, arts]) => {
        charactersData = chars || [];
        weaponsData = weaps || [];
        artifactsData = arts || [];
    });

    // Search input functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length === 0) {
                searchResults.innerHTML = '<p style="text-align: center; color: #999; margin-top: 20px;">Start typing to search...</p>';
                return;
            }

            let results = [];

            // Search characters
            const matchingChars = charactersData.filter(c => 
                c.name.toLowerCase().includes(query) || 
                c.title?.toLowerCase().includes(query)
            ).slice(0, 5);

            matchingChars.forEach(char => {
                results.push({
                    type: 'character',
                    name: char.name,
                    description: char.title || 'Character',
                    link: `characters.html?search=${char.name}`,
                    image: char.image
                });
            });

            // Search weapons
            const matchingWeaps = weaponsData.filter(w => 
                w.name.toLowerCase().includes(query) || 
                w.type?.toLowerCase().includes(query)
            ).slice(0, 3);

            matchingWeaps.forEach(weap => {
                results.push({
                    type: 'weapon',
                    name: weap.name,
                    description: weap.type || 'Weapon',
                    link: 'weapons.html',
                    image: weap.image
                });
            });

            // Search artifacts
            const matchingArts = artifactsData.filter(a => 
                a.name.toLowerCase().includes(query)
            ).slice(0, 3);

            matchingArts.forEach(art => {
                results.push({
                    type: 'artifact',
                    name: art.name,
                    description: 'Artifact Set',
                    link: 'artifacts.html',
                    image: art.image
                });
            });

            if (results.length === 0) {
                searchResults.innerHTML = '<p style="text-align: center; color: #999; margin-top: 20px;">No results found</p>';
                return;
            }

            searchResults.innerHTML = results.map(r => `
                <a href="${r.link}" class="search-result-item" onclick="document.getElementById('searchModal').classList.remove('open');">
                    <div class="search-result-image">
                        <img src="${r.image}" alt="${r.name}" onerror="this.src='https://via.placeholder.com/60';">
                    </div>
                    <div class="search-result-info">
                        <h4>${r.name}</h4>
                        <p>${r.description}</p>
                        <span class="search-result-type">${r.type}</span>
                    </div>
                </a>
            `).join('');
        });
    }
}

// Initialize search on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
    initializeSearch();
}

// Close sidebar when a link is clicked
const sidebarLinks = sidebar.querySelectorAll("a, button");
sidebarLinks.forEach(link => {
    link.addEventListener("click", function() {
        sidebar.classList.remove("open");
        hamburger.classList.remove("open");
        document.body.classList.remove("sidebar-open");
    });
});

// Close sidebar when clicking outside
document.addEventListener("click", function(event) {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.classList.remove("open");
        hamburger.classList.remove("open");
        document.body.classList.remove("sidebar-open");
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

// WEAPONS AND ARTIFACTS CARD IMAGE CYCLING
function initializeCardFadeAnimation() {
    // Weapons card cycling
    const weaponsCardImg = document.getElementById('weaponsCardImg');
    if (weaponsCardImg) {
        let weapons = [];
        let currentWeaponIndex = 0;
        
        fetch('weapons.json')
            .then(response => response.json())
            .then(data => {
                weapons = data;
                if (weapons.length > 0) {
                    setInterval(() => {
                        if (weapons.length > 0) {
                            const weapon = weapons[currentWeaponIndex];
                            weaponsCardImg.style.opacity = '0';
                            
                            setTimeout(() => {
                                weaponsCardImg.src = `https://gi.yatta.moe/assets/UI/${weapon.icon}.png`;
                                weaponsCardImg.style.opacity = '0.6';
                            }, 250);
                            
                            currentWeaponIndex = (currentWeaponIndex + 1) % weapons.length;
                        }
                    }, 2000);
                }
            })
            .catch(error => console.error('Error loading weapons:', error));
    }
    
    // Artifacts card cycling
    const artifactsCardImg = document.getElementById('artifactsCardImg');
    if (artifactsCardImg) {
        let artifacts = [];
        let currentArtifactIndex = 0;
        
        fetch('https://api.lunaris.moe/data/latest/artifactlist.json')
            .then(response => response.json())
            .then(data => {
                // Convert Lunaris API format to array
                artifacts = Object.values(data).filter(a => a.setIcon);
                if (artifacts.length > 0) {
                    setInterval(() => {
                        if (artifacts.length > 0) {
                            const artifact = artifacts[currentArtifactIndex];
                            artifactsCardImg.style.opacity = '0';
                            
                            setTimeout(() => {
                                artifactsCardImg.src = `https://gi.yatta.moe/assets/UI/reliquary/${artifact.setIcon}.png?vh=2024123000`;
                                artifactsCardImg.style.opacity = '0.6';
                            }, 250);
                            
                            currentArtifactIndex = (currentArtifactIndex + 1) % artifacts.length;
                        }
                    }, 2000);
                }
            })
            .catch(error => console.error('Error loading artifacts:', error));
    }
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
    
    // Filter state
    let activeFilters = {
        rarity: 'all',
        type: 'all',
        stat: 'all'
    };

    const renderCard = (item) => {
        const card = document.createElement('div');
        
        if (url === 'weapons.json') {
            // Weapon card
            card.className = `weapon-card rarity-${item.rarity || 3}`;
            card.style.cursor = 'pointer';
            
            // Get icon URL with proper formatting
            const iconName = item.icon || item.name || 'weapon';
            const iconUrl = `https://gi.yatta.moe/assets/UI/${iconName}.png`;
            
            card.innerHTML = `
                <div class="weapon-image-container">
                    <img src="${iconUrl}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23333%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23666%22 text-anchor=%22middle%22 x=%2250%22 y=%2250%22%3E?%3C/text%3E%3C/svg%3E'">
                </div>
                <div class="weapon-info">
                    <div class="weapon-name">${item.name || 'Unknown Weapon'}</div>
                    <div class="weapon-stats">
                        <div class="weapon-stat-row">
                            <span class="weapon-stat-label">⚔️ <strong>ATK</strong></span>
                            <span class="weapon-stat-value">${item.atk}</span>
                        </div>
                        ${item.secondaryStat && item.secondaryStat !== '—' ? `<div class="weapon-stat-row">
                            <span class="weapon-stat-label">✦</span>
                            <span style="color: #ddd; font-size: 9px;">${item.secondaryLabel}</span>
                            <span class="weapon-stat-value" style="flex: 1; text-align: right;">${item.secondaryStat}</span>
                        </div>` : ''}
                        ${item.type ? `<div class="weapon-stat-row" style="color: #aaa; font-size: 9px; margin-top: 4px;">
                            ${item.type}
                        </div>` : ''}
                    </div>
                </div>
            `;
            
            // Add click handler to navigate to weapon detail page
            card.addEventListener('click', () => {
                window.location.href = `weapon.html?id=${item.id}`;
            });
        } else if (url === 'artifacts.json') {
            // Artifact card
            card.className = `artifact-card rarity-${item.rarity || 3}`;
            card.style.cursor = 'pointer';
            
            // Get icon URL with proper formatting - use new Lunaris API path
            const iconName = item.icon || item.name || 'artifact';
            const iconUrl = `https://gi.yatta.moe/assets/UI/reliquary/${iconName}.png?vh=2024123000`;
            
            // Generate rarity stars
            const rarityStars = '⭐'.repeat(item.rarity || 3);
            
            card.innerHTML = `
                <div class="artifact-image-container">
                    <img src="${iconUrl}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23333%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23666%22 text-anchor=%22middle%22 x=%2250%22 y=%2250%22%3E?%3C/text%3E%3C/svg%3E'">
                </div>
                <div class="artifact-info">
                    <div class="artifact-name">${item.name || 'Unknown Artifact'}</div>
                    <div class="artifact-rarity">${rarityStars}</div>
                </div>
            `;
            
            // Add click handler to navigate to artifact detail page
            card.addEventListener('click', () => {
                window.location.href = `artifact.html?id=${item.id}`;
            });
        } else if (url === 'inventory.json') {
            // Inventory/Material card
            const rankColor = [
                '#888',   // rank 1
                '#4a9eff', // rank 2 (blue)
                '#00d4ff', // rank 3 (cyan)
                '#b291dc', // rank 4 (purple)
                '#ffc107'  // rank 5 (gold)
            ][item.rank - 1] || '#888';
            
            card.className = 'inventory-card';
            card.style.cursor = 'pointer';
            card.style.padding = '12px';
            card.style.background = `linear-gradient(135deg, rgba(100,100,255,0.08) 0%, rgba(200,150,255,0.08) 100%)`;
            card.style.border = `2px solid ${rankColor}`;
            card.style.borderRadius = '8px';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.alignItems = 'center';
            card.style.gap = '8px';
            card.style.transition = 'all 0.3s ease';
            card.style.minHeight = '140px';
            card.style.justifyContent = 'center';
            
            const iconUrl = `https://gi.yatta.moe/assets/UI/${item.icon}.png`;
            
            card.innerHTML = `
                <div style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
                    <img src="${iconUrl}" alt="${item.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect fill=%22%23333%22 width=%2260%22 height=%2260%22/%3E%3Ctext fill=%22%23666%22 text-anchor=%22middle%22 x=%2230%22 y=%2235%22%3E?%3C/text%3E%3C/svg%3E'">
                </div>
                <div style="text-align: center; width: 100%;">
                    <div style="font-size: 12px; color: #999; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">${item.category}</div>
                    <div style="font-size: 13px; font-weight: 600; color: #fff; line-height: 1.2;">${item.name || 'Unknown Item'}</div>
                </div>
                <div style="display: flex; gap: 3px; font-size: 11px;">
                    ${Array(item.rank || 1).fill('★').map((s, i) => `<span style="color: ${rankColor};">${s}</span>`).join('')}
                </div>
            `;
            
            // Hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.boxShadow = `0 8px 20px ${rankColor}40`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
            
            // Click handler to navigate to item page
            card.addEventListener('click', () => {
                window.location.href = `inventory-item.html?id=${item.id}`;
            });
        } else {
            // Fallback for other item types
            card.className = 'card';
            card.style.padding = '14px';
            card.style.minHeight = '80px';
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.justifyContent = 'center';
            card.innerText = item.name || '(unnamed)';
        }
        
        return card;
    };

    const applyFilters = (list) => {
        return list.filter(item => {
            // Rarity filter
            if (activeFilters.rarity !== 'all' && String(item.rarity) !== String(activeFilters.rarity)) {
                return false;
            }
            
            // Type filter
            if (activeFilters.type !== 'all' && item.type !== activeFilters.type) {
                return false;
            }
            
            // Special stat filter
            if (activeFilters.stat !== 'all' && item.secondaryLabel !== activeFilters.stat) {
                return false;
            }
            
            return true;
        });
    };

    const render = (list) => {
        results.innerHTML = '';
        if (!list || list.length === 0) {
            results.innerHTML = '<p style="grid-column:1/-1;text-align:center;opacity:0.6">No items found.</p>';
            return;
        }
        list.forEach(i => {
            results.appendChild(renderCard(i));
        });
    };

    const updateDisplay = () => {
        const term = input.value.trim().toLowerCase();
        let filtered = items.filter(i => (i.name || '').toLowerCase().includes(term));
        filtered = applyFilters(filtered);
        render(filtered);
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

    input.addEventListener('input', updateDisplay);

    // Handle filter button clicks
    if (url === 'weapons.json' || url === 'artifacts.json' || url === 'inventory.json') {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const filterType = this.dataset.filter;
                const filterValue = this.dataset.value;
                
                // Update active state
                document.querySelectorAll(`.filter-btn[data-filter="${filterType}"]`).forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update filter state
                activeFilters[filterType] = filterValue;
                
                // Re-render
                updateDisplay();
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initializePageSearch);
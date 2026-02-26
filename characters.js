let allCharacters = [];
let activeFilters = {
  rarity: [],
  element: [],
  weapon: []
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('characters');
  if (!container) return;

  fetch('characters.json')
    .then(r => r.json())
    .then(data => {
      allCharacters = data;
      setupFilters();
      renderCharacters(data, container);
    })
    .catch(err => {
      container.innerText = 'Failed to load characters.';
      console.error(err);
    });
});

function setupFilters() {
  // Rarity filter buttons
  document.querySelectorAll('.rarity-filter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.classList.toggle('active');
      updateFilters();
    });
  });

  // Element filter buttons
  document.querySelectorAll('.element-filter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.classList.toggle('active');
      updateFilters();
    });
  });

  // Weapon filter buttons
  document.querySelectorAll('.weapon-filter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.classList.toggle('active');
      updateFilters();
    });
  });

  // Clear filters button
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      activeFilters = { rarity: [], element: [], weapon: [] };
      renderCharacters(allCharacters, document.getElementById('characters'));
    });
  }
}

function updateFilters() {
  activeFilters.rarity = Array.from(document.querySelectorAll('.rarity-filter.active')).map(b => parseInt(b.dataset.rarity));
  activeFilters.element = Array.from(document.querySelectorAll('.element-filter.active')).map(b => b.dataset.element);
  activeFilters.weapon = Array.from(document.querySelectorAll('.weapon-filter.active')).map(b => b.dataset.weapon);

  const filtered = allCharacters.filter(char => {
    const matchRarity = activeFilters.rarity.length === 0 || activeFilters.rarity.includes(char.rarity);
    const matchElement = activeFilters.element.length === 0 || activeFilters.element.includes(char.vision);
    const matchWeapon = activeFilters.weapon.length === 0 || activeFilters.weapon.includes(char.weapon);
    return matchRarity && matchElement && matchWeapon;
  });

  renderCharacters(filtered, document.getElementById('characters'));
}

function renderCharacters(chars, container) {
  container.innerHTML = '';
  if (chars.length === 0) {
    container.innerHTML = '<p style="grid-column:1/-1;text-align:center;opacity:0.6">No characters match the selected filters.</p>';
    return;
  }

  chars.forEach(c => {
    const card = document.createElement('div');
    card.className = 'char-card';

    // Version badge
    const versionBadge = document.createElement('div');
    versionBadge.className = 'version-badge';
    versionBadge.innerText = c.version || '';

    // Rarity badge
    const rarityBadge = document.createElement('div');
    rarityBadge.className = 'rarity-badge';
    rarityBadge.innerText = '⭐'.repeat(c.rarity);

    // Character image
    const img = document.createElement('img');
    img.src = c.image || 'https://via.placeholder.com/220x280?text=No+Image';
    img.alt = c.name;

    // Character name
    const title = document.createElement('h3');
    title.style.margin = '10px 0 4px 0';
    title.style.fontSize = '16px';
    title.innerText = c.name;

    // Character title/constellation
    const constellation = document.createElement('p');
    constellation.style.margin = '0 0 8px 0';
    constellation.style.fontSize = '12px';
    constellation.style.opacity = '0.7';
    constellation.innerText = c.title || '';

    // Element and weapon icons
    const meta = document.createElement('div');
    meta.style.display = 'flex';
    meta.style.gap = '8px';
    meta.style.marginTop = '8px';
    meta.style.justifyContent = 'center';

    // Element icon
    const elementIcon = document.createElement('img');
    elementIcon.src = c.icon || '';
    elementIcon.alt = c.vision;
    elementIcon.style.width = '24px';
    elementIcon.style.height = '24px';
    elementIcon.title = c.vision;

    // Weapon icon (using emoji placeholders)
    const weaponIcon = document.createElement('span');
    weaponIcon.style.fontSize = '20px';
    weaponIcon.title = c.weapon;
    const weaponEmojis = {
      'Sword': '⚔️',
      'Polearm': '🔱',
      'Bow': '🏹',
      'Claymore': '🔨',
      'Catalyst': '📖'
    };
    weaponIcon.innerText = weaponEmojis[c.weapon] || '❓';

    meta.appendChild(elementIcon);
    meta.appendChild(weaponIcon);

    card.appendChild(versionBadge);
    card.appendChild(rarityBadge);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(constellation);
    card.appendChild(meta);
    container.appendChild(card);
  });
}

#!/usr/bin/env python3
import json
import os
import urllib.request
import urllib.error

# Try to fetch artifacts from Lunaris API
artifact_data_from_api = {}
print("Attempting to fetch artifact data from Lunaris API...")
try:
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    req = urllib.request.Request('https://api.lunaris.moe/data/latest/artifactlist.json', headers=headers)
    with urllib.request.urlopen(req, timeout=10) as response:
        artifact_data_from_api = json.loads(response.read().decode('utf-8'))
    print(f"✓ Fetched {len(artifact_data_from_api)} artifacts from Lunaris API")
except Exception as e:
    print(f"⚠ Could not fetch from Lunaris API: {e}")
    print("  Using artifacts.json only")

# Load artifacts.json
with open('artifacts.json', 'r', encoding='utf-8') as f:
    artifacts_list = json.load(f)

# Create artifacts directory
os.makedirs('artifacts', exist_ok=True)

print(f"Generating {len(artifacts_list)} artifact detail pages...")
print("=" * 70)

def sanitize_filename(name):
    """Convert artifact name to valid filename"""
    filename = name.replace('/', '_').replace('\\', '_').replace(':', '_')
    filename = filename.replace('*', '_').replace('?', '_').replace('"', '_')
    filename = filename.replace('<', '_').replace('>', '_').replace('|', '_')
    return filename

def get_rarity_color(rarity):
    """Get color based on rarity"""
    if rarity == 4:
        return '#b291dc'
    elif rarity == 5:
        return '#ffc107'
    elif rarity == 3:
        return '#4a9eff'
    return '#ccc'

def get_pieces_html(artifact_id, artifact_name):
    """Get HTML for artifact pieces stats from Lunaris API data"""
    pieces_html = ''
    
    # Try to get pieces from API data
    if str(artifact_id) in artifact_data_from_api:
        api_artifact = artifact_data_from_api[str(artifact_id)]
        pieces = api_artifact.get('pieces', {})
        
        if pieces:
            pieces_info = [
                ('Flower of Life', pieces.get('flower', {})),
                ('Plume of Death', pieces.get('plume', {})),
                ('Sands of Time', pieces.get('sands', {})),
                ('Goblet of Eonothem', pieces.get('goblet', {})),
                ('Circlet of Logos', pieces.get('circlet', {}))
            ]
            
            pieces_html = '<div class="pieces-grid">'
            for piece_type, piece_data in pieces_info:
                piece_name = piece_data.get('enName', piece_type)
                piece_icon = piece_data.get('icon', '')
                icon_url = f"https://gi.yatta.moe/assets/UI/reliquary/{piece_icon}.png?vh=2024123000" if piece_icon else "about:blank"
                
                pieces_html += f'''
                <div class="piece-card">
                    <div class="piece-image">
                        <img src="{icon_url}" alt="{piece_name}" onerror="this.style.display='none'">
                    </div>
                    <div class="piece-info">
                        <div class="piece-type">{piece_type}</div>
                        <div class="piece-name">{piece_name}</div>
                    </div>
                </div>
                '''
            pieces_html += '</div>'
    
    # Fallback if no pieces data
    if not pieces_html:
        pieces_html = '''
        <div class="pieces-grid">
            <div class="piece-card">
                <div class="piece-type">Flower of Life</div>
                <div class="piece-name">Healing Power</div>
            </div>
            <div class="piece-card">
                <div class="piece-type">Plume of Death</div>
                <div class="piece-name">Attack</div>
            </div>
            <div class="piece-card">
                <div class="piece-type">Sands of Time</div>
                <div class="piece-name">Main Stat Varies</div>
            </div>
            <div class="piece-card">
                <div class="piece-type">Goblet of Eonothem</div>
                <div class="piece-name">Main Stat Varies</div>
            </div>
            <div class="piece-card">
                <div class="piece-type">Circlet of Logos</div>
                <div class="piece-name">Main Stat Varies</div>
            </div>
        </div>
        '''
    
    return pieces_html

def create_artifact_page(artifact):
    """Create a complete HTML page for an artifact"""
    name = artifact.get('name', 'Unknown')
    artifact_id = artifact.get('id', '')
    rarity = artifact.get('rarity', 3)
    rarity_stars = '⭐' * rarity
    rarity_color = get_rarity_color(rarity)
    
    # Get bonuses
    bonus_2pc = artifact.get('setBonus2pc', 'N/A')
    bonus_4pc = artifact.get('setBonus4pc', 'N/A')
    
    # Get icon URL - use reliquary path
    icon_file = artifact.get('icon', 'UI_RelicIcon_10001_4')
    icon_url = f"https://gi.yatta.moe/assets/UI/reliquary/{icon_file}.png?vh=2024123000"
    
    # Get pieces HTML
    pieces_html = get_pieces_html(artifact_id, name)
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} - Project Skirk</title>
    <link rel="icon" href="https://ik.imagekit.io/gukc1okbd/Crystallina_Shape.webp" type="image/webp">
    <link rel="stylesheet" href="../styles.css">
    <style>
        .artifact-detail-wrapper {{
            min-height: calc(100vh - 200px);
            padding: 24px;
        }}

        .artifact-hero {{
            display: grid;
            grid-template-columns: 100px 1fr;
            gap: 24px;
            margin-bottom: 40px;
            align-items: flex-start;
        }}

        .artifact-image {{
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(100,100,255,0.1) 0%, rgba(200,150,255,0.1) 100%);
            border: 2px solid {rarity_color};
            border-radius: 8px;
            padding: 8px;
        }}

        .artifact-image img {{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }}

        .artifact-info {{
            display: flex;
            flex-direction: column;
            gap: 12px;
        }}

        .artifact-name {{
            font-size: 28px;
            font-weight: bold;
            color: #fff;
        }}

        .artifact-rarity {{
            font-size: 16px;
            color: {rarity_color};
            font-weight: 600;
        }}

        .bonus-section {{
            padding: 16px;
            background: linear-gradient(135deg, rgba(100,100,255,0.05) 0%, rgba(200,150,255,0.05) 100%);
            border-left: 4px solid {rarity_color};
            border-radius: 8px;
            margin-top: 12px;
        }}

        .bonus-title {{
            font-size: 14px;
            font-weight: 600;
            color: {rarity_color};
            margin-bottom: 6px;
        }}

        .bonus-text {{
            font-size: 13px;
            color: #e0e0e0;
            line-height: 1.5;
        }}

        .bonus-grid {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-top: 16px;
        }}

        .stats-section {{
            margin-top: 40px;
            padding: 20px;
            background: rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
        }}

        .stats-title {{
            font-size: 20px;
            font-weight: bold;
            color: #fff;
            margin-bottom: 20px;
        }}

        .pieces-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 16px;
        }}

        .piece-card {{
            padding: 12px;
            background: linear-gradient(135deg, rgba(100,100,255,0.08) 0%, rgba(200,150,255,0.08) 100%);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            text-align: center;
        }}

        .piece-image {{
            width: 80px;
            height: 80px;
            margin: 0 auto 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }}

        .piece-image img {{
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }}

        .piece-type {{
            font-size: 12px;
            color: #999;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}

        .piece-name {{
            font-size: 13px;
            color: #fff;
            font-weight: 600;
        }}
    </style>
</head>
<body>
<!-- Mobile Sidebar (hidden by default) -->
<div class="sidebar" id="sidebar">
    <ul>
        <li><a href="../index.html"><img src="../icons/home.png" class="icon"><span class="text">Home</span></a></li>
        <li><a href="../characters.html"><img src="../icons/characters.png" class="icon"><span class="text">Characters</span></a></li>
        <li><a href="../weapons.html"><img src="../icons/weapons.png" class="icon"><span class="text">Weapons</span></a></li>
        <li><a href="../artifacts.html"><img src="../icons/artifacts.png" class="icon"><span class="text">Artifacts</span></a></li>
        <li><a href="../achievements.html"><img src="../icons/achievements.png" class="icon"><span class="text">Achievements</span></a></li>
        <li><a href="../inventory.html"><img src="../icons/inventory.png" class="icon"><span class="text">Inventory</span></a></li>
        <li><a href="../enemy.html"><img src="../icons/enemy.png" class="icon"><span class="text">Enemy Creatures</span></a></li>
        <li><a href="../tcg.html"><img src="../icons/tcg.png" class="icon"><span class="text">Genius Invokation TCG</span></a></li>
        <li><a href="../abyss.html"><img src="../icons/abyss.png" class="icon"><span class="text">Spiral Abyss</span></a></li>
        <li><a href="../theater.html"><img src="../icons/theater.png" class="icon"><span class="text">Imaginarium Theater</span></a></li>
        <li><a href="../stygian.html"><img src="../icons/wishes.png" class="icon"><span class="text">Stygian Onslaught</span></a></li>
        <li><a href="../furnishings.html"><img src="../icons/furnishings.png" class="icon"><span class="text">Furnishings</span></a></li>
        <li><a href="../furnishing-set.html"><img src="../icons/furnishing-set.png" class="icon"><span class="text">Furnishing Set</span></a></li>
        <li><a href="../miliastra.html"><img src="../icons/miliastra.png" class="icon"><span class="text">Miliastra</span></a></li>
        <li><a href="../wonderland.html"><img src="../icons/wonderland.png" class="icon"><span class="text">Wonderland</span></a></li>
        <li><a href="../mw-set.html"><img src="../icons/mw-set.png" class="icon"><span class="text">Miliastra Wonderland Set</span></a></li>
        <li><a href="../mw-inventory.html"><img src="../icons/mw-inventory.png" class="icon"><span class="text">Miliastra Wonderland Inventory</span></a></li>
        <li><a href="../search.html"><img src="../icons/search.png" class="icon"><span class="text">Search</span></a></li>
        <li><a href="../diff.html"><img src="../icons/diff.png" class="icon"><span class="text">Diff</span></a></li>
        <li><a href="../wishes.html"><img src="../icons/wishes.png" class="icon"><span class="text">Character Wishes</span></a></li>
        <li class="settings-menu-item"><button id="settingsBtn" class="settings-menu-btn"><img src="../icons/settings.png" class="icon"><span class="text">Settings</span></button></li>
    </ul>
</div>
<div id="settingsModal" class="modal">
  <div class="modal-content">
    <div class="modal-header"><h2>Settings</h2><button class="modal-close">&times;</button></div>
    <div class="modal-body">
      <div class="settings-section"><h3>Main</h3><div class="settings-row"><label>Language</label><select id="language"><option>English</option><option>French</option><option>German</option><option>Spanish</option><option>Chinese</option><option>Japanese</option></select></div><div class="settings-row"><label>Region</label><select id="region"><option>Europe</option><option>North America</option><option>Asia</option><option>South America</option></select></div><div class="settings-row"><label>Twin</label><select id="twin"><option>Male</option><option>Female</option></select></div></div>
      <div class="settings-section"><h3>Talent</h3><div class="settings-row"><label>Display Style</label><select id="displayStyle"><option>Slider</option><option>Input</option><option>Dropdown</option></select></div><div class="settings-row"><label>Default LVL</label><select id="defaultLvl"><option>1</option><option>5</option><option>10</option><option>15</option><option>20</option></select></div><div class="settings-row"><label>Default LVL (constellation)</label><select id="defaultLvlConstellation"><option>None</option><option>+1</option><option>+2</option><option>+3</option></select></div><div class="settings-row"><label>Default Decimal</label><select id="defaultDecimal"><option>Default</option><option>0</option><option>1</option><option>2</option><option>3</option></select></div><div class="settings-row"><label>Add constellations info</label><input type="checkbox" id="addConstellations"></div></div>
      <div class="settings-section"><h3>Other</h3><div class="settings-row"><label>Unreleased Content</label><select id="unreleased"><option>Disable</option><option>Enable</option></select></div><div class="settings-info"><strong>Note:</strong> Unreleased content includes characters and weapons not yet available.</div></div>
    </div>
    <div class="modal-footer">
        <button id="saveSettingsBtn" class="save-btn">Save</button>
      </div>
  </div>
</div>
<div class="main-content">
  <nav>
    <button class="hamburger" id="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="logo">PROJECT SKIRK</div>
    <div class="nav-links">
      <a href="../index.html">Home</a>
      <a href="../characters.html">Characters</a>
      <a href="../weapons.html">Weapons</a>
      <a href="../artifacts.html">Artifacts</a>
      <a href="../achievements.html">Achievements</a>
      <a href="../inventory.html">Inventory</a>
      <button class="nav-search-btn" id="searchBtn" title="Search">
        <img src="../icons/search.png" alt="Search" class="search-icon">
      </button>
      <button class="nav-settings-btn" id="topSettingsBtn" title="Settings">
        <img src="../icons/settings.png" alt="Settings" class="settings-icon">
      </button>
    </div>
  </nav>

  <section style="padding:24px">
    <div class="artifact-detail-wrapper">
      <div class="artifact-hero">
        <div class="artifact-image">
          <img src="{icon_url}" alt="{name}" loading="lazy">
        </div>
        <div class="artifact-info">
          <div class="artifact-name">{name}</div>
          <div class="artifact-rarity">{rarity_stars}</div>
          
          <div class="bonus-grid">
            <div class="bonus-section">
              <div class="bonus-title">2-Piece Bonus</div>
              <div class="bonus-text">{bonus_2pc}</div>
            </div>
            <div class="bonus-section">
              <div class="bonus-title">4-Piece Bonus</div>
              <div class="bonus-text">{bonus_4pc}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="stats-section">
        <div class="stats-title">Artifact Pieces</div>
        {pieces_html}
      </div>
    </div>
  </section>

  <div class="footer">
    <div class="footer-content">
      <h2>PROJECT SKIRK</h2>
      <p class="footer-credit">Created by <strong>Raj Roy</strong></p>
      <p class="footer-memorial">In memory of <strong>homdgcat</strong> and <strong>hakush.in</strong></p>
      <div class="footer-divider"></div>
      <p class="footer-copyright">&copy; 2024 Project Skirk. All rights reserved.</p>
    </div>
  </div>
</div>
<script src="../script.js"></script>
</body>
</html>
"""
    return html

# Generate pages for each artifact
count = 0
for artifact in artifacts_list:
    name = artifact.get('name', 'Unknown')
    filename = sanitize_filename(name) + '.html'
    filepath = os.path.join('artifacts', filename)
    
    try:
        html_content = create_artifact_page(artifact)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"[{count+1}] ✓ {name}")
        count += 1
    except Exception as e:
        print(f"[{count+1}] ✗ {name} - Error: {e}")

print("=" * 70)
print(f"SUCCESS: Generated {count}/{len(artifacts_list)} artifact pages!")
print(f"API data available: {len(artifact_data_from_api)} artifacts")

import json
from pathlib import Path

# Load characters.json
print("Loading character data...")
try:
    with open("characters.json", "r", encoding="utf-8") as f:
        characters = json.load(f)
    print(f"✓ Loaded {len(characters)} characters")
except Exception as e:
    print(f"✗ Error loading characters.json: {e}")
    exit(1)

# Create mapping with larger artwork images
print("\nGenerating larger artwork image URLs...")
character_images = {}

for char in characters:
    char_id = str(char.get("id"))
    name = char.get("name", "Unknown")
    
    # Use different image patterns for larger artwork
    # gi.yatta.moe has gacha splash art and card images
    gacha_image = f"https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_{name.replace(' ', '')}.png?vh=2024123000"
    
    # Fallback to icon image if gacha doesn't work
    icon_image = char.get("image", "")
    
    character_images[char_id] = {
        "name": name,
        "gacha_image": gacha_image,
        "icon_image": icon_image,
        "vision": char.get("vision", "Unknown"),
        "weapon": char.get("weapon", "Unknown")
    }

print(f"✓ Generated image URLs for {len(character_images)} characters")

# Update character_appearances.json with larger images
output_dir = Path("banners-data")
try:
    with open(output_dir / "character_appearances.json", "r", encoding="utf-8") as f:
        character_appearances = json.load(f)
    
    for char_name in character_appearances:
        char_id = str(character_appearances[char_name]["id"])
        if char_id in character_images:
            # Use gacha image (larger artwork)
            character_appearances[char_name]["image"] = character_images[char_id]["gacha_image"]
            character_appearances[char_name]["icon"] = character_images[char_id]["icon_image"]
        
    with open(output_dir / "character_appearances.json", "w", encoding="utf-8") as f:
        json.dump(character_appearances, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Updated character_appearances.json with gacha artwork images")
except Exception as e:
    print(f"✗ Error: {e}")
    exit(1)

# Update banners_processed.json with larger images
try:
    with open(output_dir / "banners_processed.json", "r", encoding="utf-8") as f:
        banners_processed = json.load(f)
    
    for version in banners_processed:
        for char_info in banners_processed[version]:
            char_id = str(char_info["id"])
            if char_id in character_images:
                # Use gacha image (larger artwork)
                char_info["image"] = character_images[char_id]["gacha_image"]
                char_info["icon"] = character_images[char_id]["icon_image"]
    
    with open(output_dir / "banners_processed.json", "w", encoding="utf-8") as f:
        json.dump(banners_processed, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Updated banners_processed.json with gacha artwork images")
except Exception as e:
    print(f"✗ Error: {e}")
    exit(1)

print("\n" + "="*50)
print("GACHA ARTWORK IMAGES ADDED!")
print("="*50)
print("Character cards now display:")
print("  - Large gacha splash art (primary)")
print("  - Small icon image (fallback)")
print("  - Vision element")
print("  - Weapon type")
print("\nReload wishes.html to see the changes!")

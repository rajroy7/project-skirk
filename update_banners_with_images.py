import json
from pathlib import Path

# Load characters.json to get images
print("Loading character images from characters.json...")
try:
    with open("characters.json", "r", encoding="utf-8") as f:
        characters = json.load(f)
    
    # Create ID to image mapping
    id_to_image = {}
    for char in characters:
        char_id = str(char.get("id"))
        image = char.get("image", "")
        if image:
            id_to_image[char_id] = {
                "image": image,
                "name": char.get("name", "Unknown"),
                "vision": char.get("vision", "Unknown"),
                "weapon": char.get("weapon", "Unknown")
            }
    
    print(f"✓ Loaded {len(id_to_image)} characters with images")
except Exception as e:
    print(f"✗ Error loading characters.json: {e}")
    exit(1)

# Load and update character_appearances.json
output_dir = Path("banners-data")
try:
    with open(output_dir / "character_appearances.json", "r", encoding="utf-8") as f:
        character_appearances = json.load(f)
    
    # Add images to character appearances
    for char_name in character_appearances:
        char_id = str(character_appearances[char_name]["id"])
        if char_id in id_to_image:
            character_appearances[char_name]["image"] = id_to_image[char_id]["image"]
            character_appearances[char_name]["vision"] = id_to_image[char_id].get("vision", "Unknown")
            character_appearances[char_name]["weapon"] = id_to_image[char_id].get("weapon", "Unknown")
        else:
            print(f"⚠ Warning: Image not found for {char_name} (ID: {char_id})")
            character_appearances[char_name]["image"] = ""
            character_appearances[char_name]["vision"] = "Unknown"
            character_appearances[char_name]["weapon"] = "Unknown"
    
    # Save updated character_appearances.json
    with open(output_dir / "character_appearances.json", "w", encoding="utf-8") as f:
        json.dump(character_appearances, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Updated character_appearances.json with images and element info")
except Exception as e:
    print(f"✗ Error updating character_appearances.json: {e}")
    exit(1)

# Also update banners_processed.json with images
try:
    with open(output_dir / "banners_processed.json", "r", encoding="utf-8") as f:
        banners_processed = json.load(f)
    
    # Add images to banners
    for version in banners_processed:
        for char_info in banners_processed[version]:
            char_id = str(char_info["id"])
            if char_id in id_to_image:
                char_info["image"] = id_to_image[char_id]["image"]
                char_info["vision"] = id_to_image[char_id].get("vision", "Unknown")
                char_info["weapon"] = id_to_image[char_id].get("weapon", "Unknown")
    
    with open(output_dir / "banners_processed.json", "w", encoding="utf-8") as f:
        json.dump(banners_processed, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Updated banners_processed.json with images and element info")
except Exception as e:
    print(f"✗ Error updating banners_processed.json: {e}")
    exit(1)

print("\n" + "="*50)
print("IMAGES ADDED SUCCESSFULLY!")
print("="*50)
print("Character cards now include:")
print("  - Character images")
print("  - Vision element")
print("  - Weapon type")
print("\nReload wishes.html to see the changes!")

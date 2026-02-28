import json
import requests
from pathlib import Path

# Fetch banners data
print("Fetching banners data from gi.lunaris.moe...")
try:
    response = requests.get("https://gi.lunaris.moe/data/banners.json")
    response.raise_for_status()
    banners_data = response.json()
    print("✓ Successfully fetched banners data")
except Exception as e:
    print(f"✗ Error fetching banners data: {e}")
    exit(1)

# Load character map
print("Loading character map...")
try:
    with open("character_map.json", "r") as f:
        character_map = json.load(f)
    print("✓ Successfully loaded character map")
except Exception as e:
    print(f"✗ Error loading character map: {e}")
    exit(1)

# Create output directory
output_dir = Path("banners-data")
output_dir.mkdir(exist_ok=True)

# Process banners data to include character names
processed_banners = {}

for version, character_ids in banners_data["version"].items():
    character_names = []
    for char_id in character_ids:
        char_id_str = str(char_id)
        if char_id_str in character_map:
            character_names.append({
                "id": char_id,
                "name": character_map[char_id_str]["name"]
            })
        else:
            print(f"⚠ Warning: Character ID {char_id} not found in character map")
            character_names.append({
                "id": char_id,
                "name": f"Unknown (ID: {char_id})"
            })
    
    processed_banners[version] = character_names

# Save raw banners data
with open(output_dir / "banners_raw.json", "w", encoding="utf-8") as f:
    json.dump(banners_data, f, indent=2, ensure_ascii=False)
print(f"✓ Saved raw banners data to banners-data/banners_raw.json")

# Save processed banners with character names
with open(output_dir / "banners_processed.json", "w", encoding="utf-8") as f:
    json.dump(processed_banners, f, indent=2, ensure_ascii=False)
print(f"✓ Saved processed banners with character names to banners-data/banners_processed.json")

# Create a character-centric view (which versions each character appeared in)
character_appearances = {}
for version, characters in processed_banners.items():
    for char_info in characters:
        char_name = char_info["name"]
        if char_name not in character_appearances:
            character_appearances[char_name] = {
                "id": char_info["id"],
                "versions": []
            }
        character_appearances[char_name]["versions"].append(version)

# Sort versions in descending order for each character
for char_name in character_appearances:
    # Custom sort to handle version numbers properly (6.4, 6.3, ... 1.0)
    versions = character_appearances[char_name]["versions"]
    versions.sort(key=lambda x: float(x), reverse=True)
    character_appearances[char_name]["versions"] = versions

with open(output_dir / "character_appearances.json", "w", encoding="utf-8") as f:
    json.dump(character_appearances, f, indent=2, ensure_ascii=False)
print(f"✓ Saved character appearances data to banners-data/character_appearances.json")

# Create summary statistics
total_versions = len(processed_banners)
unique_characters = len(character_appearances)
total_appearances = sum(len(char["versions"]) for char in character_appearances.values())

summary = {
    "total_versions": total_versions,
    "unique_characters": unique_characters,
    "total_character_appearances": total_appearances,
    "average_appearances_per_character": round(total_appearances / unique_characters, 2),
    "versions": list(processed_banners.keys())
}

with open(output_dir / "summary.json", "w", encoding="utf-8") as f:
    json.dump(summary, f, indent=2, ensure_ascii=False)
print(f"✓ Saved summary statistics to banners-data/summary.json")

print("\n" + "="*50)
print("PROCESSING COMPLETE!")
print("="*50)
print(f"Total Versions: {summary['total_versions']}")
print(f"Unique Characters: {summary['unique_characters']}")
print(f"Total Appearances: {summary['total_character_appearances']}")
print(f"Average Appearances per Character: {summary['average_appearances_per_character']}")
print("\nFiles created in banners-data/:")
print("  - banners_raw.json (original data from API)")
print("  - banners_processed.json (with character names)")
print("  - character_appearances.json (which versions each character appeared in)")
print("  - summary.json (statistics)")

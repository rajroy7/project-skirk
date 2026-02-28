#!/usr/bin/env python3
"""
Consolidate banners data files into a single JSON for GitHub compatibility
"""
import json

# Load the three banners data files
with open('banners-data/banners_processed.json', 'r') as f:
    banners = json.load(f)

with open('banners-data/character_appearances.json', 'r') as f:
    characters = json.load(f)

with open('banners-data/summary.json', 'r') as f:
    summary = json.load(f)

# Create consolidated data structure
consolidated_data = {
    "banners": banners,
    "characters": characters,
    "summary": summary
}

# Write to root directory
with open('banners-data.json', 'w') as f:
    json.dump(consolidated_data, f, indent=2)

print("✓ Created banners-data.json in root directory")
print(f"  - Banners: {len(banners)} versions")
print(f"  - Characters: {len(characters)} unique characters")
print(f"  - Summary: {summary['total_versions']} total versions")

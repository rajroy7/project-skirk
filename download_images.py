import os
import json
import requests

os.makedirs("images", exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0"
}

base_site = "https://gi.yatta.moe"

for filename in os.listdir("data"):
    if filename.endswith(".json"):

        filepath = os.path.join("data", filename)

        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        character = data.get("data", {})

        name = character.get("name", filename.replace(".json", ""))

        # Change these if your JSON uses different keys
        image_fields = ["icon", "sideIcon", "gachaIcon"]

        for field in image_fields:
            img_url = character.get(field)

            if img_url:
                if img_url.startswith("/"):
                    img_url = base_site + img_url

                try:
                    img_data = requests.get(img_url, headers=headers).content

                    extension = img_url.split(".")[-1]
                    save_path = f"images/{name}_{field}.{extension}"

                    with open(save_path, "wb") as img_file:
                        img_file.write(img_data)

                    print("Downloaded:", save_path)

                except Exception as e:
                    print("Error downloading image:", e)
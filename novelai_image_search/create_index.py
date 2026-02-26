
import os
import json
from PIL import Image

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_JSON = "index.json"

def extract_metadata(png_path):

    if not hasattr(extract_metadata, "id_countup"):
        extract_metadata.id_countup = 0
    extract_metadata.id_countup += 1

    img = Image.open(png_path)
    info = img.info

    prompt = ""
    isLegacy = False

    img_info_dict = json.loads(info.get("Comment", ""))

    if "v4_prompt" in img_info_dict:
        prompt = img_info_dict["v4_prompt"]["caption"]["base_caption"]
        char_prompt_list = img_info_dict["v4_prompt"]["caption"]["char_captions"]
        for char_prompt in char_prompt_list:
            prompt += ","
            prompt += char_prompt["char_caption"]

    else:
        prompt = img_info_dict.get("prompt","")
        isLegacy = True

    stat = os.stat(png_path)
    timestamp = int(stat.st_mtime)  # 更新時刻

    return {
        "id": extract_metadata.id_countup,
        "path": os.path.relpath(png_path, ROOT_DIR),
        "timestamp": timestamp,
        "prompt": prompt,
        "isLegacy": isLegacy
    }

index = []

for root, _, files in os.walk(ROOT_DIR):
    for name in files:
        if not name.lower().endswith(".png"):
            continue

        path = os.path.join(root, name)
        try:
            data = extract_metadata(path)
            index.append(data)
        except Exception as e:
            print(f"skip: {path} ({e})")

# タイムスタンプ降順ソート
index.sort(key=lambda x: x["timestamp"], reverse=True)

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(index, f, ensure_ascii=False, indent=2)

print(f"indexed {len(index)} images")
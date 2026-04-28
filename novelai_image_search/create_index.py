
import os
import json
import re
from PIL import Image
from collections import Counter

counter = Counter()
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_JSON = "index.json"
OUTPUT_JSON_TAG_COUNT = "tag_count.json"


def process_prompt(prompt: str) -> str:
    try:
        original = prompt

        # 1. 重み構文のチェック（開閉が一致しているか）
        if prompt.count("::") % 2 != 0:
            return original

        # 2. 負の重み → 丸ごと削除
        # 例: -1.2::tag1, tag2::
        prompt = re.sub(
            r'-\d+(?:\.\d+)?::.*?::',
            '',
            prompt
        )

        # 3. 正の重み → 構文だけ除去（中身は残す）
        # 例: 2.5::tag1, tag2:: → tag1, tag2
        prompt = re.sub(
            r'\d+(?:\.\d+)?::(.*?)::',
            r'\1',
            prompt
        )

        # 4. カッコ除去（中身は残す）
        prompt = re.sub(r'[{}\[\]]', '', prompt)

        # 5. カンマ周りを軽く整形
        prompt = re.sub(r'\s*,\s*', ', ', prompt)
        prompt = re.sub(r',\s*,+', ',', prompt)  # 連続カンマ削除
        prompt = prompt.strip(', ').strip()

        return prompt

    except Exception:
        return original

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

    prompt = process_prompt(prompt)

    # タグカウント
    tags = prompt.split(",")

    for tag in tags:
        tag = tag.strip()
        if tag:
            counter[tag] += 1

    stat = os.stat(png_path)
    timestamp = int(stat.st_mtime)  # 更新時刻

    rel_path = os.path.relpath(png_path, ROOT_DIR)
    top_folder = rel_path.split(os.sep)[0]

    return {
        "id": extract_metadata.id_countup,
        "path": rel_path,
        "top_folder": top_folder,
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

# 辞書 → 辞書の配列に変換
counter_list = [{"name": k, "value": v} for k, v in counter.items()]

# valueで降順ソート
counter_list.sort(key=lambda x: x["value"], reverse=True)

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(index, f, ensure_ascii=False, indent=2)

with open(OUTPUT_JSON_TAG_COUNT, "w", encoding="utf-8") as f:
    json.dump(counter_list, f, ensure_ascii=False, indent=2)

print(f"indexed {len(index)} images")
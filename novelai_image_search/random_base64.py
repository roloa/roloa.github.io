
import json
import random
import base64
from pathlib import Path
from io import BytesIO
from PIL import Image

MAX_SIZE = (128, 128)

# index.json の読み込み
with open("index.json", "r", encoding="utf-8") as f:
    index_data = json.load(f)

# ランダムに1件選択
item = random.choice(index_data)

# 画像パス
image_path = Path(item["path"])

# 画像読み込み
with Image.open(image_path) as img:
    # アスペクト比を維持して320x320以内に縮小
    img.thumbnail(MAX_SIZE, Image.LANCZOS)

    # メモリに保存
    buffer = BytesIO()
    format = img.format if img.format else "PNG"
    img.save(buffer, format=format)

    # base64エンコード
    encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")

# 出力
print(encoded)

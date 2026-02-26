
# NovelAI Image Search

- pythonスクリプトでディレクトリ内の画像のメタデータに含まれるプロンプトから検索インデックスを作り、htmlのインターフェイスから検索することができます。

- create_index.pyを実行します。pillowが必要です。
```
cd novelai_image_search
pip install pillow -t .
python create_index.py
```

- このディレクトリでhttpサーバを立てます。
```
cd novelai_image_search
python -m http.server 8000
```

- ブラウザでアクセスします。
```
http://localhost.127.0.0.1:/novelai.html
```

- index.htmlは誤アクセスの軽減のため白紙になっています。

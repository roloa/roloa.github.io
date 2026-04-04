

const input_field = document.getElementById("query");

input_field.addEventListener("keydown", query_on_key_down);

function query_on_key_down(e) {
    if (e.key === "Enter") {
        search_button();
    }
    return false;
}

let indexData = [];

// index.json を読み込む
fetch("index.json")
    .then(res => res.json())
    .then(data => {
        indexData = data;

        automatic_search_from_get_parameter();
    });

function automatic_search_from_get_parameter() {
    const params = new URLSearchParams(window.location.search);

    // 検索結果の並びタイプを取得して指定
    const resultType = params.get("result_type");

    if (resultType) {
        const radio = document.getElementById(resultType);
        if (radio) {
            radio.checked = true;
        }
    }

    // 検索枚数
    const resultCount = params.get("result_count");
    if (resultCount) {
        const select = document.getElementById("result_count");
        select.value = resultCount;
    }

    // 個別に取得
    const q = params.get("query");

    if (q) {
        document.getElementById("query").value = q;
        search(q);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function summarizeArray(arr, target) {

    if (arr.length < target) {
        return arr;
    }

    const step = (arr.length - 1) / (target - 1);
    const selected = [];

    for (let i = 0; i < target; i++) {
        let base = i * step;

        // 先頭と末尾は固定
        if (i !== 0 && i !== target - 1) {
            const jitter = (Math.random() - 0.5) * step; // ±step/2
            base += jitter;
        }

        let index = Math.round(base);

        // 範囲補正
        index = Math.max(0, Math.min(arr.length - 1, index));

        selected.push(arr[index]);
    }

    arr.splice(0, arr.length, ...selected);
    return arr;
}

function splitTerms(q) {
    const rawTerms = q.split(/\s+/);

    const includeTerms = [];
    const excludeTerms = [];

    for (const term of rawTerms) {
        if (term.startsWith("-") && term.length > 1) {
            excludeTerms.push(term.slice(1).toLowerCase());
        } else {
            includeTerms.push(term.toLowerCase());
        }
    }

    return { includeTerms, excludeTerms };
}

function matchText(text, includeTerms, excludeTerms) {
    // 通常検索：すべて含まれているか
    if (!includeTerms.every(term => text.includes(term))) {
        return false;
    }

    // マイナス検索：一つでも含まれていたら除外
    if (excludeTerms.some(term => text.includes(term))) {
        return false;
    }

    return true;
}

function matchItem(item, query, is_search_v3, is_search_v4) {

    const match = query.match(/^id:(\d+)$/);
    // id:で始まる文字列なら特殊処理
    if (match) {
        const id = Number(match[1]);

        // console.log(item);

        // ここに処理を書く
        if (item.id == id) {
            return true;
        }
        return false;
    }

    const { includeTerms, excludeTerms } = splitTerms(query);

    const text = (item.prompt + " " + item.character_prompt + " " + item.top_folder).toLowerCase();

    if (!matchText(text, includeTerms, excludeTerms)) {
        return false;
    }

    if ((item.isLegacy === true && is_search_v3) ||
        (item.isLegacy === false && is_search_v4)) {
        return true;
    }

    return false;
}

function search_button() {
    const q = document.getElementById("query").value;
    search(q);
}

function search(q) {

    if (!q) { q = ""; }

    q = q.toLowerCase().trim();
    const is_result_latest = document.getElementById("result_latest").checked;
    const is_result_random = document.getElementById("result_random").checked;
    const is_result_timeline = document.getElementById("result_timeline").checked;
    const is_result_near_id = document.getElementById("result_near_id").checked;

    const is_search_v3 = document.getElementById("check_v3").checked;
    const is_search_v4 = document.getElementById("check_v4").checked;
    const result_count = document.getElementById("result_count").value;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";


    let matches = [];

    // 最新表示
    if (is_result_latest) {
        for (const item of indexData) {
            if (matchItem(item, q, is_search_v3, is_search_v4)) {
                matches.push(item);
            }
        }
    }

    // ランダム表示
    if (is_result_random) {
        for (const item of indexData) {
            if (matchItem(item, q, is_search_v3, is_search_v4)) {
                matches.push(item);
            }
        }
        shuffle(matches);
    }

    // タイムライン表示
    if (is_result_timeline) {
        for (const item of indexData) {
            if (matchItem(item, q, is_search_v3, is_search_v4)) {
                matches.push(item);
            }
        }
        summarizeArray(matches, result_count);
    }

    // 近傍ID表示
    if (is_result_near_id) {
        let firstMatchIndex = -1;

        for (let i = 0; i < indexData.length; i++) {
            const item = indexData[i];

            if (matchItem(item, q, is_search_v3, is_search_v4)) {
                firstMatchIndex = i;
                break;
            }
        }

        if (firstMatchIndex !== -1) {

            const half = Math.floor(result_count / 2);

            let start = firstMatchIndex - half;
            let end = start + Number(result_count);

            // 配列の範囲を超えないよう調整
            if (start < 0) {
                start = 0;
                end = Math.min(result_count, indexData.length);
            }

            if (end > indexData.length) {
                end = indexData.length;
                start = Math.max(0, end - result_count);
            }
            console.log(`${firstMatchIndex}iscenter, ${start}-${end}`);
            matches = indexData.slice(start, end);
        }
    }

    // 最大15件表示
    for (const item of matches.slice(0, result_count)) {
        const a = document.createElement("a");
        a.href = `image.html?id=${item.id}`;
        //a.target = "_blank";

        const img = document.createElement("img");
        img.src = item.path;

        a.appendChild(img);
        resultsDiv.appendChild(a);
    }
}

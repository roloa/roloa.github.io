const IMAGE_PATHS = {
  mink1: "./image/mink1.png",
  mink2: "./image/mink2.png",
  mink3: "./image/mink3.png",
  mink4: "./image/mink4.png",
  mink5: "./image/mink5.png",
};

const story = {
  start: {
    image: "mink1",
    text: "くっ……私に何をするつもりだな！",
    next: "mainChoices",
  },
  mainChoices: {
    image: "mink1",
    text: "……じろじろ見るな。用があるなら、さっさと選べ。",
    choices: [
      { label: "頭をなでる", next: "petReaction" },
      { label: "頬に触れる", next: "pokeReaction" },
      { label: "頬を叩く", next: "slapReaction" },
    ],
  },
  petReaction: {
    image: "mink2",
    text: "なっ……！？　急に触るな……調子が狂うだろ。",
    next: "petAfter",
  },
  petAfter: {
    image: "mink1",
    text: "……もう一度やったら、今度こそ噛むからな。",
    next: "mainChoices",
  },
  pokeReaction: {
    image: "mink3",
    text: "やめろと言ってるだろ！　いい加減にしろ！",
    next: "mainChoices",
  },
  slapReaction: {
    image: "mink4",
    text: "っ……！？",
    next: "slapChoices",
  },
  slapChoices: {
    image: "mink3",
    text: "き、貴様……今、何をしたかわかっているのか？",
    choices: [
      { label: "やめて様子を見る", next: "coolDown" },
      { label: "さらに強く叩く", next: "hardSlap" },
    ],
  },
  hardSlap: {
    image: "mink5",
    text: "――っ！！",
    next: "hardSlapAfter",
  },
  hardSlapAfter: {
    image: "mink3",
    text: "……絶対に許さないからな。",
    next: "mainChoices",
  },
  coolDown: {
    image: "mink1",
    text: "ふん……最初からそうしていればいいんだ。",
    next: "mainChoices",
  },
};

const line = document.querySelector("#line");
const continueMark = document.querySelector("#continue-mark");
const choicePanel = document.querySelector("#choice-panel");
const advanceLayer = document.querySelector("#advance-layer");
const resetButton = document.querySelector("#reset-button");
const loading = document.querySelector("#loading");
const imageLayers = [
  document.querySelector("#character-a"),
  document.querySelector("#character-b"),
];

let currentNodeId = "start";
let activeLayer = 0;
let visibleImage = "mink1";
let typingTimer = null;
let typingText = "";
let typingIndex = 0;
let isTyping = false;
let choicesVisible = false;

function preloadImages() {
  return Promise.all(
    Object.values(IMAGE_PATHS).map(
      (src) =>
        new Promise((resolve) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = resolve;
          image.src = src;
        }),
    ),
  );
}

function setImage(imageId) {
  if (imageId === visibleImage) return;

  const nextLayer = activeLayer === 0 ? 1 : 0;
  imageLayers[nextLayer].src = IMAGE_PATHS[imageId];
  imageLayers[nextLayer].classList.add("is-visible");
  imageLayers[activeLayer].classList.remove("is-visible");
  activeLayer = nextLayer;
  visibleImage = imageId;
}

function finishTyping() {
  if (!isTyping) return;
  window.clearInterval(typingTimer);
  line.textContent = typingText;
  isTyping = false;
  showNodeControls();
}

function typeLine(text) {
  window.clearInterval(typingTimer);
  typingText = text;
  typingIndex = 0;
  isTyping = true;
  choicesVisible = false;
  line.textContent = "";
  continueMark.classList.remove("is-visible");
  choicePanel.replaceChildren();

  typingTimer = window.setInterval(() => {
    typingIndex += 1;
    line.textContent = typingText.slice(0, typingIndex);
    if (typingIndex >= typingText.length) {
      window.clearInterval(typingTimer);
      isTyping = false;
      showNodeControls();
    }
  }, 42);
}

function showNodeControls() {
  const node = story[currentNodeId];
  if (node.choices) {
    choicesVisible = true;
    node.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.type = "button";
      button.textContent = choice.label;
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        goTo(choice.next);
      });
      choicePanel.append(button);
    });
    choicePanel.querySelector("button")?.focus({ preventScroll: true });
    return;
  }

  continueMark.classList.add("is-visible");
}

function goTo(nodeId) {
  const node = story[nodeId];
  if (!node) return;
  currentNodeId = nodeId;
  choicesVisible = false;
  setImage(node.image);
  typeLine(node.text);
}

function advance() {
  if (isTyping) {
    finishTyping();
    return;
  }

  if (choicesVisible) return;
  const next = story[currentNodeId].next;
  if (next) goTo(next);
}

function resetStory() {
  currentNodeId = "start";
  setImage("mink1");
  typeLine(story.start.text);
}

advanceLayer.addEventListener("click", advance);
resetButton.addEventListener("click", resetStory);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  if (event.target instanceof HTMLButtonElement && choicesVisible) return;
  event.preventDefault();
  advance();
});

preloadImages().then(() => {
  loading.classList.add("is-hidden");
  typeLine(story.start.text);
});

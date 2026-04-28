const MAX_LOG_ENTRIES = 14;
const HAND_SIZE = 5;

const cardLibrary = {
  strike: {
    id: "strike",
    name: "Strike",
    type: "attack",
    cost: 1,
    text: "敵に6ダメージを与える。",
    flavor: "基本の攻撃カード。",
    play(state) {
      dealDamage(state.enemy, 6, state, "Strikeで6ダメージ");
    },
  },
  defend: {
    id: "defend",
    name: "Defend",
    type: "skill",
    cost: 1,
    text: "ブロックを5得る。",
    flavor: "基本の防御カード。",
    play(state) {
      gainBlock(state.player, 5);
      addLog(state, "Defendでブロックを5獲得");
    },
  },
  bash: {
    id: "bash",
    name: "Bash",
    type: "attack",
    cost: 2,
    text: "敵に8ダメージを与える。",
    flavor: "重めだが頼れる一撃。",
    play(state) {
      dealDamage(state.enemy, 8, state, "Bashで8ダメージ");
    },
  },
};

const initialDeck = [
  "strike",
  "strike",
  "strike",
  "strike",
  "strike",
  "defend",
  "defend",
  "defend",
  "defend",
  "bash",
];

const state = {
  player: null,
  enemy: null,
  drawPile: [],
  discardPile: [],
  hand: [],
  log: [],
  turn: 1,
  gameOver: false,
};

const elements = {
  playerHp: document.getElementById("playerHp"),
  playerBlock: document.getElementById("playerBlock"),
  playerEnergy: document.getElementById("playerEnergy"),
  drawPileCount: document.getElementById("drawPileCount"),
  discardPileCount: document.getElementById("discardPileCount"),
  handCount: document.getElementById("handCount"),
  enemyName: document.getElementById("enemyName"),
  enemyHp: document.getElementById("enemyHp"),
  enemyBlock: document.getElementById("enemyBlock"),
  enemyIntent: document.getElementById("enemyIntent"),
  handArea: document.getElementById("handArea"),
  logArea: document.getElementById("logArea"),
  endTurnButton: document.getElementById("endTurnButton"),
  drawButton: document.getElementById("drawButton"),
  restartButton: document.getElementById("restartButton"),
};

function createPlayer() {
  return {
    name: "Iron Vanguard",
    maxHp: 40,
    hp: 40,
    block: 0,
    energy: 3,
    maxEnergy: 3,
  };
}

function createEnemy() {
  return {
    name: "Training Slime",
    maxHp: 36,
    hp: 36,
    block: 0,
    intent: {
      type: "attack",
      value: randomBetween(6, 10),
      label: "",
    },
  };
}

function createCardInstance(cardId) {
  return {
    uid: `${cardId}-${Math.random().toString(36).slice(2, 10)}`,
    ...cardLibrary[cardId],
  };
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addLog(currentState, message) {
  currentState.log.push(message);
  if (currentState.log.length > MAX_LOG_ENTRIES) {
    currentState.log.shift();
  }
}

function gainBlock(target, amount) {
  target.block += amount;
}

function takeDamage(target, amount) {
  const blocked = Math.min(target.block, amount);
  target.block -= blocked;
  const remaining = amount - blocked;
  target.hp = Math.max(0, target.hp - remaining);

  return {
    blocked,
    remaining,
  };
}

function dealDamage(target, amount, currentState, logPrefix) {
  const result = takeDamage(target, amount);
  const parts = [`${logPrefix}`];

  if (result.blocked > 0) {
    parts.push(`(${result.blocked}ブロックで軽減)`);
  }

  if (result.remaining > 0) {
    parts.push(`HPに${result.remaining}通った`);
  } else {
    parts.push("すべてブロックされた");
  }

  addLog(currentState, parts.join(" "));
}

function refillDrawPileIfNeeded() {
  if (state.drawPile.length === 0 && state.discardPile.length > 0) {
    state.drawPile = shuffle([...state.discardPile]);
    state.discardPile = [];
    addLog(state, "捨て札をシャッフルして山札を再構築");
  }
}

function drawCards(amount) {
  let drawn = 0;

  for (let count = 0; count < amount; count += 1) {
    refillDrawPileIfNeeded();
    if (state.drawPile.length === 0) {
      return drawn;
    }
    state.hand.push(state.drawPile.pop());
    drawn += 1;
  }

  return drawn;
}

function discardHand() {
  state.discardPile.push(...state.hand);
  state.hand = [];
}

function rollEnemyIntent() {
  const nextValue = randomBetween(6, 10);
  state.enemy.intent = {
    type: "attack",
    value: nextValue,
    label: `${nextValue}ダメージ攻撃`,
  };
}

function startPlayerTurn() {
  state.player.block = 0;
  state.enemy.block = 0;
  state.player.energy = state.player.maxEnergy;
  const drawn = drawCards(HAND_SIZE);
  addLog(state, `ターン${state.turn}開始: エナジーを回復し、カードを${drawn}枚引いた`);
  render();
}

function endTurn() {
  if (state.gameOver) {
    return;
  }

  discardHand();
  enemyTurn();
}

function enemyTurn() {
  const damage = state.enemy.intent.value;
  const result = takeDamage(state.player, damage);
  const parts = [`${state.enemy.name}の攻撃で${damage}ダメージ`];

  if (result.blocked > 0) {
    parts.push(`(${result.blocked}ブロックで軽減)`);
  }

  if (result.remaining > 0) {
    parts.push(`HPに${result.remaining}通った`);
  } else {
    parts.push("完全防御");
  }

  addLog(state, parts.join(" "));

  if (checkBattleEnd()) {
    render();
    return;
  }

  state.turn += 1;
  rollEnemyIntent();
  startPlayerTurn();
}

function playCard(uid) {
  if (state.gameOver) {
    return;
  }

  const cardIndex = state.hand.findIndex((card) => card.uid === uid);
  if (cardIndex === -1) {
    return;
  }

  const card = state.hand[cardIndex];

  if (card.cost > state.player.energy) {
    addLog(state, `${card.name}を使うにはエナジーが足りない`);
    render();
    return;
  }

  state.player.energy -= card.cost;
  state.hand.splice(cardIndex, 1);
  card.play(state);
  state.discardPile.push(card);

  if (checkBattleEnd()) {
    render();
    return;
  }

  render();
}

function checkBattleEnd() {
  if (state.enemy.hp <= 0) {
    state.gameOver = true;
    addLog(state, "勝利! 敵を倒した");
    return true;
  }

  if (state.player.hp <= 0) {
    state.gameOver = true;
    addLog(state, "敗北... プレイヤーのHPが0になった");
    return true;
  }

  return false;
}

function renderStats() {
  elements.playerHp.textContent = `${state.player.hp} / ${state.player.maxHp}`;
  elements.playerBlock.textContent = String(state.player.block);
  elements.playerEnergy.textContent = `${state.player.energy} / ${state.player.maxEnergy}`;
  elements.drawPileCount.textContent = String(state.drawPile.length);
  elements.discardPileCount.textContent = String(state.discardPile.length);
  elements.handCount.textContent = String(state.hand.length);

  elements.enemyName.textContent = state.enemy.name;
  elements.enemyHp.textContent = `${state.enemy.hp} / ${state.enemy.maxHp}`;
  elements.enemyBlock.textContent = String(state.enemy.block);
  elements.enemyIntent.textContent = state.enemy.intent.label;

  elements.endTurnButton.disabled = state.gameOver;
  elements.drawButton.disabled = state.gameOver;
}

function renderHand() {
  elements.handArea.innerHTML = "";

  if (state.hand.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-hand";
    empty.textContent = state.gameOver
      ? "戦闘終了。リセットでもう一度遊べます。"
      : "手札がありません。ターンを終了してください。";
    elements.handArea.appendChild(empty);
    return;
  }

  state.hand.forEach((card) => {
    const cardButton = document.createElement("button");
    const playable = card.cost <= state.player.energy && !state.gameOver;
    cardButton.className = `card ${card.type} ${playable ? "" : "unplayable"}`.trim();
    cardButton.disabled = !playable;
    cardButton.innerHTML = `
      <span class="card-cost">${card.cost}</span>
      <span class="card-type">${card.type}</span>
      <h4>${card.name}</h4>
      <p class="card-text">${card.text}</p>
      <p class="card-flavor">${card.flavor}</p>
    `;
    cardButton.addEventListener("click", () => playCard(card.uid));
    elements.handArea.appendChild(cardButton);
  });
}

function renderLog() {
  elements.logArea.innerHTML = "";

  state.log.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "log-entry";
    row.innerHTML = `<strong>${entry}</strong>`;
    elements.logArea.appendChild(row);
  });
}

function render() {
  renderStats();
  renderHand();
  renderLog();
}

function setupBattle() {
  state.player = createPlayer();
  state.enemy = createEnemy();
  state.drawPile = shuffle(initialDeck.map(createCardInstance));
  state.discardPile = [];
  state.hand = [];
  state.log = [];
  state.turn = 1;
  state.gameOver = false;
  rollEnemyIntent();
  addLog(state, "戦闘開始: Training Slime が現れた");
  startPlayerTurn();
}

elements.endTurnButton.addEventListener("click", endTurn);
elements.drawButton.addEventListener("click", () => {
  if (state.gameOver) {
    return;
  }

  if (state.hand.length >= 10) {
    addLog(state, "手札が多すぎるため、これ以上引けない");
    render();
    return;
  }

  const drawn = drawCards(1);
  addLog(state, drawn === 1 ? "カードを1枚引いた" : "山札がなく、カードを引けなかった");
  render();
});
elements.restartButton.addEventListener("click", setupBattle);

setupBattle();

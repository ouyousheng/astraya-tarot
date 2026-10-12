"use strict";

const canvas = document.querySelector("#starfield");
const context = canvas.getContext("2d");
const gatewayCanvas = document.querySelector("#cosmicGateway");
const gatewayContext = gatewayCanvas.getContext("2d", { alpha: true });
const splash = document.querySelector("#splash");
const app = document.querySelector("#app");
const enterExperience = document.querySelector("#enterExperience");
const enterExperienceText = enterExperience.querySelector(".splash__enter-text");
const enterSilently = document.querySelector("#enterSilently");
const soundToggle = document.querySelector("#soundToggle");
const soundToggleLabel = soundToggle.querySelector(".sound-toggle__label");
const brandHome = document.querySelector("#brandHome");
const heroScene = document.querySelector("#heroScene");
const questionScene = document.querySelector("#questionScene");
const cardScene = document.querySelector("#cardScene");
const readingScene = document.querySelector("#readingScene");
const beginButton = document.querySelector("#beginButton");
const backToStart = document.querySelector("#backToStart");
const questionPanel = document.querySelector(".question-panel");
const questionTitle = document.querySelector("#questionTitle");
const questionIntro = document.querySelector("#questionIntro");
const wisdomQuote = document.querySelector("#wisdomQuote");
const wisdomSource = document.querySelector("#wisdomSource");
const wisdomReflection = document.querySelector("#wisdomReflection");
const refreshWisdom = document.querySelector("#refreshWisdom");
const questionInput = document.querySelector("#questionInput");
const questionCount = document.querySelector("#questionCount");
const questionSuggestions = document.querySelectorAll("[data-question]");
const questionReady = document.querySelector("#questionReady");
const backToQuestion = document.querySelector("#backToQuestion");
const cardTitle = document.querySelector("#cardTitle");
const cardDeck = document.querySelector("#cardDeck");
const selectedCount = document.querySelector("#selectedCount");
const spreadSlots = document.querySelectorAll("#spreadSlots li");
const cardStatus = document.querySelector("#cardStatus");
const confirmSelection = document.querySelector("#confirmSelection");
const backToCards = document.querySelector("#backToCards");
const backToCardsInline = document.querySelector("#backToCardsInline");
const readingTitle = document.querySelector("#readingTitle");
const revealedCards = document.querySelector("#revealedCards");
const readingLoading = document.querySelector("#readingLoading");
const readingError = document.querySelector("#readingError");
const readingErrorMessage = document.querySelector("#readingErrorMessage");
const retryReading = document.querySelector("#retryReading");
const readingContent = document.querySelector("#readingContent");
const oracleReadingTitle = document.querySelector("#oracleReadingTitle");
const readingSummary = document.querySelector("#readingSummary");
const readingPositions = document.querySelector("#readingPositions");
const readingGuidance = document.querySelector("#readingGuidance");
const readingReflection = document.querySelector("#readingReflection");
const readingReminder = document.querySelector("#readingReminder");
const readingActions = document.querySelector("#readingActions");
const restartReading = document.querySelector("#restartReading");
const progressItems = document.querySelectorAll(".progress__item");
const lessonToast = document.querySelector("#lessonToast");
const closeToast = document.querySelector("#closeToast");
const toastTitle = document.querySelector("#toastTitle");
const toastMessage = document.querySelector("#toastMessage");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const confucianWisdoms = [
  {
    title: "静而后能安",
    intro: "先让纷乱的念头慢下来，再把问题放在心中。心有所定，思考才会从焦虑走向清明。",
    quote: "“知止而后有定，定而后能静，静而后能安。”",
    source: "《礼记·大学》",
    reflection: "你真正想安定下来的，究竟是事情的结果，还是自己的内心？"
  },
  {
    title: "君子求诸己",
    intro: "面对关系与选择，先把目光收回自身。你能调整的态度与行动，往往比猜测别人更接近答案。",
    quote: "“君子求诸己，小人求诸人。”",
    source: "《论语·卫灵公》",
    reflection: "这件事里，有什么是你可以先从自己开始改变的？"
  },
  {
    title: "心之官则思",
    intro: "问题不必急着得到结论，认真想过，本身就是靠近答案。让直觉出现，也让理性为它照明。",
    quote: "“心之官则思，思则得之，不思则不得也。”",
    source: "《孟子·告子上》",
    reflection: "此刻最值得你认真分辨的事实是什么？"
  },
  {
    title: "见贤而自省",
    intro: "他人的优点可以成为方向，他人的不足也能成为镜子。把比较化作学习，心就不会困在得失里。",
    quote: "“见贤思齐焉，见不贤而内自省也。”",
    source: "《论语·里仁》",
    reflection: "你从这段经历里，看见了自己想成为怎样的人？"
  },
  {
    title: "吾日三省吾身",
    intro: "自省不是责备自己，而是诚实地整理初心、承诺与行动。看清偏离之处，才能重新选择方向。",
    quote: "“吾日三省吾身：为人谋而不忠乎？与朋友交而不信乎？传不习乎？”",
    source: "《论语·学而》",
    reflection: "若只检视一件事，你最想问自己什么？"
  },
  {
    title: "学与思并行",
    intro: "只接受答案容易迷惘，只凭想象也可能失据。把经验与思考放在一起，才有更稳妥的判断。",
    quote: "“学而不思则罔，思而不学则殆。”",
    source: "《论语·为政》",
    reflection: "你还缺少哪些事实，又有哪些感受值得认真听见？"
  },
  {
    title: "择善而从",
    intro: "每一次相遇都可能带来一面镜子。取其所长，察其所失，经历便不再只是经历。",
    quote: "“三人行，必有我师焉。择其善者而从之，其不善者而改之。”",
    source: "《论语·述而》",
    reflection: "这件事正在教你什么？"
  },
  {
    title: "知过而能改",
    intro: "真正的过失不是曾经走错，而是看见之后仍不愿改变。允许自己修正，是清醒，也是一种勇气。",
    quote: "“过而不改，是谓过矣。”",
    source: "《论语·卫灵公》",
    reflection: "你已经看见什么需要停止重复？"
  },
  {
    title: "推己以及人",
    intro: "把自己的感受放在心上，也把他人的边界当作真实。善意不是委屈自己，而是在彼此之间守住分寸。",
    quote: "“己所不欲，勿施于人。”",
    source: "《论语·卫灵公》",
    reflection: "若位置互换，你希望对方如何选择？"
  },
  {
    title: "慎思而明辨",
    intro: "面对重要选择，不妨依次去了解、发问、思考、辨别，再落实行动。答案会在一步步求证中变得清楚。",
    quote: "“博学之，审问之，慎思之，明辨之，笃行之。”",
    source: "《礼记·中庸》",
    reflection: "你现在最需要补上的，是了解、发问，还是行动？"
  },
  {
    title: "反求诸己",
    intro: "事情不如意时，先检视自己的位置，并不等于把责任全揽在身上，而是先找到仍可掌握的部分。",
    quote: "“行有不得者，皆反求诸己。”",
    source: "《孟子·离娄上》",
    reflection: "此刻还有什么力量，仍然握在你的手中？"
  },
  {
    title: "以诚问心",
    intro: "真诚不是迎合一个漂亮答案，而是不欺骗自己的感受与动机。问题越诚实，方向越容易浮现。",
    quote: "“诚者，天之道也；思诚者，人之道也。”",
    source: "《孟子·离娄上》",
    reflection: "抛开期待与害怕，你真正想问的是什么？"
  }
];

const majorArcanaDeck = [
  { index: 0, roman: "0", zh: "愚者", en: "The Fool" },
  { index: 1, roman: "I", zh: "魔术师", en: "The Magician" },
  { index: 2, roman: "II", zh: "女祭司", en: "The High Priestess" },
  { index: 3, roman: "III", zh: "皇后", en: "The Empress" },
  { index: 4, roman: "IV", zh: "皇帝", en: "The Emperor" },
  { index: 5, roman: "V", zh: "教皇", en: "The Hierophant" },
  { index: 6, roman: "VI", zh: "恋人", en: "The Lovers" },
  { index: 7, roman: "VII", zh: "战车", en: "The Chariot" },
  { index: 8, roman: "VIII", zh: "力量", en: "Strength" },
  { index: 9, roman: "IX", zh: "隐者", en: "The Hermit" },
  { index: 10, roman: "X", zh: "命运之轮", en: "Wheel of Fortune" },
  { index: 11, roman: "XI", zh: "正义", en: "Justice" },
  { index: 12, roman: "XII", zh: "倒吊人", en: "The Hanged Man" },
  { index: 13, roman: "XIII", zh: "死神", en: "Death" },
  { index: 14, roman: "XIV", zh: "节制", en: "Temperance" },
  { index: 15, roman: "XV", zh: "恶魔", en: "The Devil" },
  { index: 16, roman: "XVI", zh: "高塔", en: "The Tower" },
  { index: 17, roman: "XVII", zh: "星星", en: "The Star" },
  { index: 18, roman: "XVIII", zh: "月亮", en: "The Moon" },
  { index: 19, roman: "XIX", zh: "太阳", en: "The Sun" },
  { index: 20, roman: "XX", zh: "审判", en: "Judgement" },
  { index: 21, roman: "XXI", zh: "世界", en: "The World" }
];

const majorArcanaImageFiles = [
  "00-fool.jpg",
  "01-magician.jpg",
  "02-high-priestess.jpg",
  "03-empress.jpg",
  "04-emperor.jpg",
  "05-hierophant.jpg",
  "06-lovers.jpg",
  "07-chariot.jpg",
  "08-strength.jpg",
  "09-hermit.jpg",
  "10-wheel-of-fortune.jpg",
  "11-justice.jpg",
  "12-hanged-man.jpg",
  "13-death.jpg",
  "14-temperance.jpg",
  "15-devil.jpg",
  "16-tower.jpg",
  "17-star.jpg",
  "18-moon.jpg",
  "19-sun.jpg",
  "20-judgement.jpg",
  "21-world.jpg"
];

const spreadMeanings = ["根源", "当下", "阻力", "提醒", "方向"];
const spreadNumerals = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ"];

let stars = [];
let animationFrame;
let gatewayStars = [];
let gatewayAnimationFrame;
let gatewayAnimationStartedAt = 0;
let gatewayPreviousFrame = 0;
let gatewayActive = false;
let viewportResizeTimer;
let shootingTimer;
let audioContext;
let volumeControl;
let soundEnabled = true;
let openingSoundStarted = false;
let siteEntering = false;
let splashFinished = false;
let currentStep = 1;
let currentWisdomIndex = -1;
let wisdomChanging = false;
let dealtCards = [];
let selectedSpread = Array(5).fill(null);
let deckDealt = false;
let cachedReading = null;
let cachedReadingSignature = "";
let activeReadingSignature = "";
let readingRequestController = null;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomWholeNumber(maximum) {
  if (window.crypto && window.crypto.getRandomValues) {
    const randomValue = new Uint32Array(1);
    window.crypto.getRandomValues(randomValue);
    return randomValue[0] % maximum;
  }

  return Math.floor(Math.random() * maximum);
}

function readPreviousWisdom() {
  try {
    const storedValue = window.sessionStorage.getItem("astraya-last-wisdom");

    if (storedValue === null) {
      return -1;
    }

    const storedIndex = Number(storedValue);
    return Number.isInteger(storedIndex) ? storedIndex : -1;
  } catch (error) {
    return -1;
  }
}

function rememberWisdom(index) {
  try {
    window.sessionStorage.setItem("astraya-last-wisdom", String(index));
  } catch (error) {
    // 本地文件模式可能禁用存储；不影响随机展示。
  }
}

function chooseWisdomIndex() {
  const excludedIndex = currentWisdomIndex >= 0 ? currentWisdomIndex : readPreviousWisdom();
  const availableIndexes = confucianWisdoms
    .map((wisdom, index) => index)
    .filter((index) => index !== excludedIndex);

  return availableIndexes[randomWholeNumber(availableIndexes.length)];
}

function applyWisdom(index) {
  const wisdom = confucianWisdoms[index];
  questionTitle.textContent = wisdom.title;
  questionIntro.textContent = wisdom.intro;
  wisdomQuote.textContent = wisdom.quote;
  wisdomSource.textContent = wisdom.source;
  wisdomReflection.textContent = wisdom.reflection;
  currentWisdomIndex = index;
  rememberWisdom(index);
}

function showRandomWisdom(animate = true) {
  if (wisdomChanging) {
    return;
  }

  const nextIndex = chooseWisdomIndex();

  if (!animate || reduceMotion) {
    applyWisdom(nextIndex);
    return;
  }

  wisdomChanging = true;
  refreshWisdom.disabled = true;
  questionPanel.classList.add("is-changing");

  setTimeout(() => {
    applyWisdom(nextIndex);
    questionPanel.classList.remove("is-changing");

    setTimeout(() => {
      refreshWisdom.disabled = false;
      wisdomChanging = false;
    }, 180);
  }, 170);
}

function shuffleCards(cards) {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = randomWholeNumber(index + 1);
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function selectedCardCount() {
  return selectedSpread.filter(Boolean).length;
}

function updateSpreadDisplay() {
  const totalSelected = selectedCardCount();
  const selectionComplete = totalSelected === selectedSpread.length;
  selectedCount.textContent = String(totalSelected);
  cardDeck.classList.toggle("is-complete", selectionComplete);
  confirmSelection.disabled = !selectionComplete;

  spreadSlots.forEach((slot, slotIndex) => {
    const hasCard = Boolean(selectedSpread[slotIndex]);
    slot.classList.toggle("is-filled", hasCard);
    slot.setAttribute(
      "aria-label",
      `第${slotIndex + 1}位：${spreadMeanings[slotIndex]}，${hasCard ? "已放入牌" : "尚未选牌"}`
    );
  });

  cardDeck.querySelectorAll(".tarot-card").forEach((button) => {
    const deckPosition = Number(button.dataset.deckPosition);
    const slotIndex = selectedSpread.findIndex((card) => card && card.deckPosition === deckPosition);
    const isSelected = slotIndex >= 0;
    const orderBadge = button.querySelector(".tarot-card__order");

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    button.disabled = selectionComplete && !isSelected;
    orderBadge.textContent = isSelected ? String(slotIndex + 1) : "";
    button.setAttribute(
      "aria-label",
      isSelected
        ? `第${deckPosition + 1}张牌，已选择，对应第${slotIndex + 1}位：${spreadMeanings[slotIndex]}`
        : `第${deckPosition + 1}张牌，未选择`
    );
  });
}

function toggleTarotCard(deckPosition) {
  invalidateCachedReading();
  const existingSlot = selectedSpread.findIndex((card) => card && card.deckPosition === deckPosition);

  if (existingSlot >= 0) {
    selectedSpread[existingSlot] = null;
    updateSpreadDisplay();
    cardStatus.textContent = `已收回第${existingSlot + 1}位“${spreadMeanings[existingSlot]}”的牌，可以重新选择。`;
    return;
  }

  const openSlot = selectedSpread.findIndex((card) => card === null);

  if (openSlot < 0) {
    cardStatus.textContent = "五张牌已经选满。如需更换，请先取消其中一张。";
    return;
  }

  selectedSpread[openSlot] = {
    ...dealtCards[deckPosition],
    deckPosition
  };
  updateSpreadDisplay();

  const totalSelected = selectedCardCount();
  cardStatus.textContent = totalSelected === 5
    ? "五张牌已经归位。确认后，下一关将揭晓牌面。"
    : `已选择第${openSlot + 1}张，对应“${spreadMeanings[openSlot]}”。还需选择${5 - totalSelected}张。`;
}

function dealTarotCards() {
  if (deckDealt) {
    return;
  }

  dealtCards = shuffleCards(majorArcanaDeck)
    .slice(0, 12)
    .map((card) => ({ ...card, reversed: randomWholeNumber(2) === 1 }));
  cardDeck.replaceChildren();

  const tiltPattern = [-1.2, 0.7, -0.5, 1, -0.8, 0.4, 0.9, -0.6, 0.5, -1, 0.8, -0.3];

  dealtCards.forEach((card, deckPosition) => {
    const button = document.createElement("button");
    button.className = "tarot-card";
    button.type = "button";
    button.dataset.deckPosition = String(deckPosition);
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", `第${deckPosition + 1}张牌，未选择`);
    button.style.setProperty("--deal-order", String(deckPosition));
    button.style.setProperty("--tilt", `${tiltPattern[deckPosition]}deg`);
    button.innerHTML = `
      <span class="tarot-card__order" aria-hidden="true"></span>
      <span class="tarot-card__frame" aria-hidden="true">
        <span class="tarot-card__orbit"></span>
        <span class="tarot-card__sigil">✦</span>
        <span class="tarot-card__name">ASTRAYA</span>
      </span>
    `;
    button.addEventListener("click", () => toggleTarotCard(deckPosition));
    cardDeck.appendChild(button);
  });

  deckDealt = true;
  updateSpreadDisplay();
}

function resetReadingPanels() {
  readingLoading.hidden = false;
  readingError.hidden = true;
  readingContent.hidden = true;
  restartReading.hidden = true;
  retryReading.disabled = false;
}

function invalidateCachedReading() {
  cachedReading = null;
  cachedReadingSignature = "";
  activeReadingSignature = "";

  if (readingRequestController) {
    readingRequestController.abort();
    readingRequestController = null;
  }

  resetReadingPanels();
}

function buildReadingPayload() {
  return {
    version: 1,
    locale: "zh-CN",
    question: questionInput.value.trim(),
    cards: selectedSpread.map((card, index) => ({
      position: spreadMeanings[index],
      arcana: card.index,
      orientation: card.reversed ? "reversed" : "upright"
    }))
  };
}

function buildReadingSignature(payload) {
  return JSON.stringify(payload);
}

function renderRevealedCards() {
  revealedCards.replaceChildren();

  selectedSpread.forEach((card, index) => {
    const item = document.createElement("li");
    const position = document.createElement("span");
    const flip = document.createElement("span");
    const flipper = document.createElement("span");
    const back = document.createElement("span");
    const backOrbit = document.createElement("span");
    const backSigil = document.createElement("span");
    const face = document.createElement("span");
    const artwork = document.createElement("span");
    const fallback = document.createElement("span");
    const image = document.createElement("img");
    const roman = document.createElement("span");
    const sigil = document.createElement("span");
    const faceName = document.createElement("span");
    const name = document.createElement("strong");
    const orientation = document.createElement("span");
    const orientationText = card.reversed ? "逆位" : "正位";

    item.className = "revealed-card";
    item.classList.toggle("is-reversed", card.reversed);
    item.setAttribute("aria-label", `${spreadMeanings[index]}：${card.zh}，${orientationText}`);
    item.style.setProperty("--reveal-order", String(index));

    position.className = "revealed-card__position";
    position.textContent = `${spreadNumerals[index]} · ${spreadMeanings[index]}`;

    flip.className = "revealed-card__flip";
    flip.setAttribute("aria-hidden", "true");
    flipper.className = "revealed-card__flipper";
    back.className = "revealed-card__back";
    backOrbit.className = "revealed-card__back-orbit";
    backSigil.className = "revealed-card__back-sigil";
    backSigil.textContent = "✦";
    back.append(backOrbit, backSigil);

    face.className = "revealed-card__face";
    artwork.className = "revealed-card__artwork";
    fallback.className = "revealed-card__fallback";
    roman.className = "revealed-card__roman";
    roman.textContent = card.roman;
    sigil.className = "revealed-card__sigil";
    sigil.textContent = "✦";
    faceName.className = "revealed-card__face-name";
    faceName.textContent = card.zh;
    fallback.append(roman, sigil, faceName);

    image.className = "revealed-card__image";
    image.alt = "";
    image.width = 500;
    image.height = 839;
    image.loading = "eager";
    image.decoding = "async";
    image.addEventListener("load", () => face.classList.add("has-image"), { once: true });
    image.addEventListener("error", () => {
      image.remove();
      face.classList.add("image-failed");
    }, { once: true });
    image.src = `assets/cards/${majorArcanaImageFiles[card.index]}`;

    artwork.append(fallback, image);
    face.appendChild(artwork);
    flipper.append(back, face);
    flip.appendChild(flipper);

    name.className = "revealed-card__name";
    name.textContent = card.zh;
    orientation.className = "revealed-card__orientation";
    orientation.textContent = orientationText;

    item.append(position, flip, name, orientation);
    revealedCards.appendChild(item);
  });
}

function setReadingLoading() {
  readingLoading.hidden = false;
  readingError.hidden = true;
  readingContent.hidden = true;
  restartReading.hidden = true;
  retryReading.disabled = false;
}

function showReadingError(message) {
  readingLoading.hidden = true;
  readingContent.hidden = true;
  restartReading.hidden = true;
  readingErrorMessage.textContent = message;
  readingError.hidden = false;
}

function renderReadingResult(result) {
  readingSummary.textContent = result.summary;
  readingPositions.replaceChildren();

  result.positions.forEach((position, index) => {
    const item = document.createElement("li");
    const heading = document.createElement("div");
    const label = document.createElement("span");
    const card = document.createElement("strong");
    const interpretation = document.createElement("p");

    item.className = "reading-position";
    heading.className = "reading-position__heading";
    label.textContent = `${spreadNumerals[index]} · ${position.position}`;
    card.textContent = position.card;
    interpretation.textContent = position.interpretation;
    heading.append(label, card);
    item.append(heading, interpretation);
    readingPositions.appendChild(item);
  });

  readingGuidance.replaceChildren();
  result.guidance.forEach((guidance) => {
    const item = document.createElement("li");
    item.textContent = guidance;
    readingGuidance.appendChild(item);
  });

  readingReflection.textContent = result.reflectionQuestion;
  readingReminder.textContent = result.gentleReminder;
  readingLoading.hidden = true;
  readingError.hidden = true;
  readingContent.hidden = false;
  restartReading.hidden = false;
}

function responseMessage(responseData, status) {
  if (responseData && typeof responseData.error === "string" && responseData.error.trim()) {
    return responseData.error.trim().slice(0, 160);
  }

  if (status === 429) {
    return "此刻请求较多，请稍等一分钟再试。";
  }

  return "AI 暂时没有回应，请稍后再试。";
}

async function requestReading({ force = false } = {}) {
  if (selectedCardCount() !== 5) {
    showReadingError("牌阵还没有完成，请返回选满五张牌。");
    return;
  }

  const payload = buildReadingPayload();
  const signature = buildReadingSignature(payload);

  if (!force && cachedReading && cachedReadingSignature === signature) {
    renderReadingResult(cachedReading);
    return;
  }

  if (readingRequestController) {
    readingRequestController.abort();
  }

  const controller = new AbortController();
  readingRequestController = controller;
  activeReadingSignature = signature;
  setReadingLoading();

  if (window.location.protocol === "file:") {
    readingRequestController = null;
    showReadingError("本地打开只能预览牌面。把网站部署到 Netlify 并填写密钥后，AI 解读才会启用。");
    return;
  }

  try {
    const response = await fetch("/api/tarot-reading", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    let responseData = null;

    try {
      responseData = await response.json();
    } catch (error) {
      responseData = null;
    }

    if (!response.ok) {
      throw { publicMessage: responseMessage(responseData, response.status) };
    }

    if (!responseData || !responseData.reading) {
      throw { publicMessage: "AI 返回的内容暂时无法读取，请重新连接。" };
    }

    if (activeReadingSignature !== signature) {
      return;
    }

    cachedReading = responseData.reading;
    cachedReadingSignature = signature;
    renderReadingResult(cachedReading);
  } catch (error) {
    if (error && error.name === "AbortError") {
      return;
    }

    if (activeReadingSignature !== signature) {
      return;
    }

    const message = error && typeof error.publicMessage === "string"
      ? error.publicMessage
      : "AI 暂时没有回应，请检查网络后再试。";
    showReadingError(message);
  } finally {
    if (readingRequestController === controller) {
      readingRequestController = null;
    }
  }
}

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * pixelRatio);
  canvas.height = Math.floor(window.innerHeight * pixelRatio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  createStars();
}

function createStars() {
  const starCount = Math.min(190, Math.max(75, Math.floor(window.innerWidth / 7)));

  stars = Array.from({ length: starCount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: randomBetween(0.35, 1.45),
    alpha: randomBetween(0.16, 0.86),
    speed: randomBetween(0.04, 0.2),
    phase: randomBetween(0, Math.PI * 2),
    twinkle: randomBetween(0.006, 0.025)
  }));
}

function drawStars(time = 0) {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const star of stars) {
    star.y -= star.speed;

    if (star.y < -4) {
      star.y = window.innerHeight + 4;
      star.x = Math.random() * window.innerWidth;
    }

    const shimmer = Math.sin(time * star.twinkle + star.phase) * 0.22;
    const opacity = Math.max(0.08, star.alpha + shimmer);

    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(244, 229, 196, ${opacity})`;
    context.fill();

    if (star.radius > 1.15) {
      context.beginPath();
      context.moveTo(star.x - 4, star.y);
      context.lineTo(star.x + 4, star.y);
      context.moveTo(star.x, star.y - 4);
      context.lineTo(star.x, star.y + 4);
      context.strokeStyle = `rgba(242, 215, 154, ${opacity * 0.34})`;
      context.lineWidth = 0.6;
      context.stroke();
    }
  }

  if (!reduceMotion) {
    animationFrame = requestAnimationFrame(drawStars);
  }
}

function resetGatewayStar(star, initial = false) {
  const palette = [
    [255, 251, 235],
    [244, 218, 157],
    [198, 168, 255],
    [112, 197, 255],
    [255, 137, 226]
  ];

  star.angle = randomBetween(0, Math.PI * 2);
  star.distance = initial
    ? Math.pow(Math.random(), 1.45) * 0.82 + 0.01
    : randomBetween(0.006, 0.045);
  star.speed = randomBetween(0.095, 0.235);
  star.width = randomBetween(0.55, 1.35);
  star.alpha = randomBetween(0.42, 0.96);
  star.color = palette[Math.floor(Math.random() * palette.length)];
}

function createGatewayStars() {
  const isCompactScreen = window.innerWidth <= 720;
  const areaBasedCount = Math.floor((window.innerWidth * window.innerHeight) / 7200);
  const starCount = isCompactScreen
    ? Math.min(110, Math.max(72, areaBasedCount))
    : Math.min(270, Math.max(160, areaBasedCount));

  gatewayStars = Array.from({ length: starCount }, () => {
    const star = {};
    resetGatewayStar(star, true);
    return star;
  });
}

function updateGatewayOrigin() {
  const originX = window.innerWidth / 2;
  const originY = window.innerHeight / 2;
  splash.style.setProperty("--gateway-origin-x", `${originX}px`);
  splash.style.setProperty("--gateway-origin-y", `${originY}px`);
}

function resizeGatewayCanvas() {
  const pixelRatioLimit = window.innerWidth <= 720 ? 1.5 : 2;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, pixelRatioLimit);
  gatewayCanvas.width = Math.floor(window.innerWidth * pixelRatio);
  gatewayCanvas.height = Math.floor(window.innerHeight * pixelRatio);
  gatewayCanvas.style.width = `${window.innerWidth}px`;
  gatewayCanvas.style.height = `${window.innerHeight}px`;
  gatewayContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  updateGatewayOrigin();
  createGatewayStars();
}

function drawGatewayFrame(time) {
  if (!gatewayActive) {
    return;
  }

  if (!gatewayAnimationStartedAt) {
    gatewayAnimationStartedAt = time;
    gatewayPreviousFrame = time;
  }

  const elapsed = time - gatewayAnimationStartedAt;
  const progress = Math.min(1, elapsed / 2300);
  const deltaSeconds = Math.min(0.04, Math.max(0.001, (time - gatewayPreviousFrame) / 1000));
  gatewayPreviousFrame = time;

  const originX = window.innerWidth / 2;
  const originY = window.innerHeight / 2;
  const horizontalReach = Math.max(originX, window.innerWidth - originX);
  const verticalReach = Math.max(originY, window.innerHeight - originY);
  const maximumRadius = Math.hypot(horizontalReach, verticalReach) * 1.16;
  const acceleration = 0.7 + Math.pow(progress, 1.45) * 4.2;

  gatewayContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
  gatewayContext.save();
  gatewayContext.globalCompositeOperation = "lighter";

  const coreGlow = gatewayContext.createRadialGradient(originX, originY, 0, originX, originY, 145 + progress * 95);
  coreGlow.addColorStop(0, `rgba(255, 249, 222, ${0.34 * (1 - progress * 0.48)})`);
  coreGlow.addColorStop(0.16, `rgba(218, 190, 255, ${0.16 * (1 - progress * 0.36)})`);
  coreGlow.addColorStop(1, "rgba(74, 43, 117, 0)");
  gatewayContext.fillStyle = coreGlow;
  gatewayContext.fillRect(0, 0, window.innerWidth, window.innerHeight);

  for (let ringIndex = 0; ringIndex < 3; ringIndex += 1) {
    const ringProgress = (progress * 1.34 + ringIndex * 0.31) % 1;
    const ringRadius = Math.pow(ringProgress, 0.7) * maximumRadius * 0.72;
    const ringOpacity = Math.pow(1 - ringProgress, 1.8) * 0.2;
    gatewayContext.beginPath();
    gatewayContext.arc(originX, originY, ringRadius, 0, Math.PI * 2);
    gatewayContext.strokeStyle = `rgba(232, 211, 255, ${ringOpacity})`;
    gatewayContext.lineWidth = 0.7 + ringProgress * 1.2;
    gatewayContext.stroke();
  }

  for (const star of gatewayStars) {
    star.distance += star.speed * deltaSeconds * acceleration;

    if (star.distance > 1.12) {
      resetGatewayStar(star);
    }

    const projectedDistance = Math.pow(star.distance, 1.13);
    const radius = projectedDistance * maximumRadius;
    const trailLength = (4 + progress * 54) * (0.58 + star.speed * 2.2);
    const trailRadius = Math.max(0, radius - trailLength);
    const cosine = Math.cos(star.angle);
    const sine = Math.sin(star.angle);
    const x = originX + cosine * radius;
    const y = originY + sine * radius;
    const trailX = originX + cosine * trailRadius;
    const trailY = originY + sine * trailRadius;
    const edgeFade = Math.min(1, (1.12 - star.distance) * 6);
    const centerFade = Math.min(1, star.distance * 7);
    const opacity = star.alpha * edgeFade * centerFade * (0.5 + progress * 0.5);
    const [red, green, blue] = star.color;

    gatewayContext.beginPath();
    gatewayContext.moveTo(trailX, trailY);
    gatewayContext.lineTo(x, y);
    gatewayContext.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    gatewayContext.lineWidth = star.width * (0.8 + star.distance * 2.2);
    gatewayContext.stroke();

    gatewayContext.beginPath();
    gatewayContext.arc(x, y, star.width * (0.8 + star.distance), 0, Math.PI * 2);
    gatewayContext.fillStyle = `rgba(${red}, ${green}, ${blue}, ${Math.min(1, opacity * 1.2)})`;
    gatewayContext.fill();
  }

  gatewayContext.restore();
  gatewayAnimationFrame = requestAnimationFrame(drawGatewayFrame);
}

function startCosmicExpansion() {
  if (reduceMotion || gatewayActive) {
    return;
  }

  gatewayActive = true;
  gatewayAnimationStartedAt = 0;
  gatewayPreviousFrame = 0;
  resizeGatewayCanvas();
  gatewayAnimationFrame = requestAnimationFrame(drawGatewayFrame);
}

function stopCosmicExpansion() {
  gatewayActive = false;
  cancelAnimationFrame(gatewayAnimationFrame);
  gatewayContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
  gatewayStars = [];
}

function createShootingStar() {
  if (reduceMotion || document.hidden) {
    scheduleShootingStar();
    return;
  }

  const shootingStar = document.createElement("span");
  shootingStar.className = "shooting-star";
  shootingStar.style.top = `${randomBetween(8, 42)}%`;
  document.body.appendChild(shootingStar);
  shootingStar.addEventListener("animationend", () => shootingStar.remove(), { once: true });
  scheduleShootingStar();
}

function scheduleShootingStar() {
  clearTimeout(shootingTimer);
  shootingTimer = setTimeout(createShootingStar, randomBetween(5000, 9500));
}

function finishSplash() {
  if (splashFinished) {
    return;
  }

  splashFinished = true;
  app.removeAttribute("inert");
  app.removeAttribute("aria-hidden");
  splash.classList.add("is-leaving");
  app.classList.add("is-ready");
  setTimeout(() => {
    splash.setAttribute("hidden", "");
    stopCosmicExpansion();
    beginButton.focus({ preventScroll: true });
  }, 950);
}

function createReverb(context, seconds = 3.2, decay = 2.8) {
  const sampleRate = context.sampleRate;
  const impulse = context.createBuffer(2, sampleRate * seconds, sampleRate);

  for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
    const data = impulse.getChannelData(channel);

    for (let index = 0; index < data.length; index += 1) {
      const fade = Math.pow(1 - index / data.length, decay);
      data[index] = (Math.random() * 2 - 1) * fade;
    }
  }

  const convolver = context.createConvolver();
  convolver.buffer = impulse;
  return convolver;
}

function prepareAudio() {
  if (audioContext) {
    return true;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return false;
  }

  audioContext = new AudioContextClass();
  volumeControl = audioContext.createGain();
  volumeControl.gain.value = soundEnabled ? 1 : 0.0001;
  volumeControl.connect(audioContext.destination);
  return true;
}

function connectWithReverb(source, dryGain, reverb, wetGain) {
  source.connect(dryGain);
  source.connect(reverb);
  reverb.connect(wetGain);
}

function addPadTone(sceneBus, frequency, startTime, duration, level, detune = 0) {
  const oscillator = audioContext.createOscillator();
  const toneGain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  oscillator.detune.value = detune;
  filter.type = "lowpass";
  filter.frequency.value = 1200;
  filter.Q.value = 0.5;

  toneGain.gain.setValueAtTime(0.0001, startTime);
  toneGain.gain.exponentialRampToValueAtTime(level, startTime + 1.5);
  toneGain.gain.exponentialRampToValueAtTime(level * 0.55, startTime + duration - 1.5);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(toneGain);
  toneGain.connect(filter);
  filter.connect(sceneBus);
  oscillator.addEventListener("ended", () => {
    oscillator.disconnect();
    toneGain.disconnect();
    filter.disconnect();
  }, { once: true });
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.05);
}

function addChime(sceneBus, frequency, startTime, duration, level) {
  const partials = [
    { ratio: 1, level: 1 },
    { ratio: 2.01, level: 0.22 },
    { ratio: 3.98, level: 0.07 }
  ];

  partials.forEach((partial) => {
    const oscillator = audioContext.createOscillator();
    const toneGain = audioContext.createGain();
    const peak = level * partial.level;

    oscillator.type = "sine";
    oscillator.frequency.value = frequency * partial.ratio;
    oscillator.detune.value = randomBetween(-3, 3);

    toneGain.gain.setValueAtTime(0.0001, startTime);
    toneGain.gain.exponentialRampToValueAtTime(peak, startTime + 0.025);
    toneGain.gain.exponentialRampToValueAtTime(peak * 0.3, startTime + 0.7);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(toneGain);
    toneGain.connect(sceneBus);
    oscillator.addEventListener("ended", () => {
      oscillator.disconnect();
      toneGain.disconnect();
    }, { once: true });
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.05);
  });
}

async function playOpeningSound() {
  if (openingSoundStarted || !prepareAudio()) {
    return;
  }

  openingSoundStarted = true;
  await audioContext.resume();

  const now = audioContext.currentTime + 0.04;
  const sceneBus = audioContext.createGain();
  const dryGain = audioContext.createGain();
  const wetGain = audioContext.createGain();
  const reverb = createReverb(audioContext);

  sceneBus.gain.setValueAtTime(0.0001, now);
  sceneBus.gain.exponentialRampToValueAtTime(0.34, now + 0.65);
  sceneBus.gain.setValueAtTime(0.34, now + 5.3);
  sceneBus.gain.exponentialRampToValueAtTime(0.0001, now + 8.7);
  dryGain.gain.value = 0.56;
  wetGain.gain.value = 0.44;

  connectWithReverb(sceneBus, dryGain, reverb, wetGain);
  dryGain.connect(volumeControl);
  wetGain.connect(volumeControl);

  addPadTone(sceneBus, 130.81, now, 8.5, 0.052, -5);
  addPadTone(sceneBus, 196, now + 0.1, 8.2, 0.038, 4);
  addPadTone(sceneBus, 261.63, now + 0.22, 7.9, 0.025, -2);

  [
    [523.25, 0.08, 4.8, 0.12],
    [659.25, 0.72, 4.5, 0.09],
    [783.99, 1.48, 4.4, 0.08],
    [987.77, 2.42, 4.1, 0.06],
    [783.99, 4.35, 4.2, 0.05]
  ].forEach(([frequency, delay, duration, level]) => {
    addChime(sceneBus, frequency, now + delay, duration, level);
  });
}

function updateSoundControl() {
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  soundToggle.setAttribute("aria-label", soundEnabled ? "关闭音效" : "开启音效");
  soundToggleLabel.textContent = soundEnabled ? "音效开" : "音效关";
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  updateSoundControl();

  if (!volumeControl || !audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  volumeControl.gain.cancelScheduledValues(now);
  volumeControl.gain.setTargetAtTime(soundEnabled ? 1 : 0.0001, now, 0.045);
}

function enterSite(withSound) {
  if (siteEntering) {
    return;
  }

  siteEntering = true;
  enterExperience.disabled = true;
  enterSilently.disabled = true;
  enterExperienceText.textContent = withSound ? "正在聆听星河…" : "正在进入星河…";
  startCosmicExpansion();
  splash.classList.add("is-opening");
  setTimeout(finishSplash, reduceMotion ? 120 : 2300);

  if (withSound) {
    playOpeningSound().catch((error) => {
      console.warn("浏览器没有启动音效，但网站仍可正常进入。", error);
    });
  } else {
    soundEnabled = false;
    updateSoundControl();
  }
}

function setProgress(step) {
  currentStep = step;

  progressItems.forEach((item) => {
    const isCurrent = Number(item.dataset.step) === step;
    item.classList.toggle("is-active", isCurrent);

    if (isCurrent) {
      item.setAttribute("aria-current", "step");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

function openQuestionScene() {
  hideLessonToast(false);
  setProgress(2);
  heroScene.classList.add("is-leaving");
  heroScene.setAttribute("inert", "");
  heroScene.setAttribute("aria-hidden", "true");
  questionScene.removeAttribute("inert");
  questionScene.setAttribute("aria-hidden", "false");
  questionScene.classList.add("is-active");

  setTimeout(() => {
    questionTitle.focus({ preventScroll: true });
  }, reduceMotion ? 20 : 520);
}

function openCardScene() {
  hideLessonToast(false);
  dealTarotCards();
  setProgress(3);
  questionScene.classList.remove("is-active");
  questionScene.setAttribute("inert", "");
  questionScene.setAttribute("aria-hidden", "true");
  cardScene.removeAttribute("inert");
  cardScene.setAttribute("aria-hidden", "false");
  cardScene.classList.add("is-active");

  setTimeout(() => {
    cardTitle.focus({ preventScroll: true });
  }, reduceMotion ? 20 : 520);
}

function openReadingScene() {
  if (selectedCardCount() !== 5) {
    cardStatus.textContent = "请先选满五张牌，再开启解读。";
    return;
  }

  hideLessonToast(false);
  renderRevealedCards();
  setProgress(4);
  cardScene.classList.remove("is-active");
  cardScene.setAttribute("inert", "");
  cardScene.setAttribute("aria-hidden", "true");
  readingScene.removeAttribute("inert");
  readingScene.setAttribute("aria-hidden", "false");
  readingScene.classList.add("is-active");
  readingScene.scrollTop = 0;

  setTimeout(() => {
    readingTitle.focus({ preventScroll: true });
  }, reduceMotion ? 20 : 520);

  requestReading();
}

function returnToCards() {
  hideLessonToast(false);

  if (readingRequestController) {
    activeReadingSignature = "";
    readingRequestController.abort();
    readingRequestController = null;
  }

  setProgress(3);
  readingScene.classList.remove("is-active");
  readingScene.setAttribute("inert", "");
  readingScene.setAttribute("aria-hidden", "true");
  cardScene.removeAttribute("inert");
  cardScene.setAttribute("aria-hidden", "false");
  cardScene.classList.add("is-active");

  setTimeout(() => {
    confirmSelection.focus({ preventScroll: true });
  }, reduceMotion ? 20 : 520);
}

function returnToQuestion() {
  hideLessonToast(false);
  setProgress(2);
  cardScene.classList.remove("is-active");
  cardScene.setAttribute("inert", "");
  cardScene.setAttribute("aria-hidden", "true");
  questionScene.removeAttribute("inert");
  questionScene.setAttribute("aria-hidden", "false");
  questionScene.classList.add("is-active");

  setTimeout(() => {
    questionReady.focus({ preventScroll: true });
  }, reduceMotion ? 20 : 520);
}

function returnToStart() {
  hideLessonToast(false);
  setProgress(1);
  questionScene.classList.remove("is-active");
  questionScene.setAttribute("inert", "");
  questionScene.setAttribute("aria-hidden", "true");
  cardScene.classList.remove("is-active");
  cardScene.setAttribute("inert", "");
  cardScene.setAttribute("aria-hidden", "true");
  readingScene.classList.remove("is-active");
  readingScene.setAttribute("inert", "");
  readingScene.setAttribute("aria-hidden", "true");
  heroScene.removeAttribute("inert");
  heroScene.removeAttribute("aria-hidden");
  heroScene.classList.remove("is-leaving");

  setTimeout(() => {
    beginButton.focus({ preventScroll: true });
  }, reduceMotion ? 20 : 520);
}

function startNewReading() {
  invalidateCachedReading();
  dealtCards = [];
  selectedSpread = Array(5).fill(null);
  deckDealt = false;
  cardDeck.replaceChildren();
  cardStatus.textContent = "凭第一感觉，选择你的第一张牌。";
  questionInput.value = "";
  updateQuestionCount();
  updateSpreadDisplay();
  showRandomWisdom(true);

  setProgress(2);
  heroScene.classList.add("is-leaving");
  heroScene.setAttribute("inert", "");
  heroScene.setAttribute("aria-hidden", "true");
  cardScene.classList.remove("is-active");
  cardScene.setAttribute("inert", "");
  cardScene.setAttribute("aria-hidden", "true");
  readingScene.classList.remove("is-active");
  readingScene.setAttribute("inert", "");
  readingScene.setAttribute("aria-hidden", "true");
  questionScene.removeAttribute("inert");
  questionScene.setAttribute("aria-hidden", "false");
  questionScene.classList.add("is-active");

  setTimeout(() => {
    questionTitle.focus({ preventScroll: true });
  }, reduceMotion ? 20 : 520);
}

function updateQuestionCount() {
  questionCount.textContent = String(questionInput.value.length);
}

function showLessonToast() {
  toastTitle.textContent = "第三关完成";
  toastMessage.textContent = "五张牌已经归位。下一关将揭晓牌面并进行解读。";
  lessonToast.classList.add("is-visible");
}

function hideLessonToast(restoreFocus = true) {
  lessonToast.classList.remove("is-visible");

  if (restoreFocus) {
    const focusTarget = currentStep === 4
      ? readingTitle
      : currentStep === 3
        ? confirmSelection
        : currentStep === 2
          ? questionReady
          : beginButton;
    focusTarget.focus({ preventScroll: true });
  }
}

showRandomWisdom(false);
resizeCanvas();
drawStars();
scheduleShootingStar();

window.addEventListener("resize", () => {
  clearTimeout(viewportResizeTimer);
  viewportResizeTimer = setTimeout(() => {
    resizeCanvas();

    if (gatewayActive) {
      resizeGatewayCanvas();
    }
  }, 120);
});
window.addEventListener("load", () => {
  setTimeout(() => {
    if (!splash.hidden && !siteEntering) {
      enterExperience.focus({ preventScroll: true });
    }
  }, reduceMotion ? 60 : 1500);
});

enterExperience.addEventListener("click", () => enterSite(true));
enterSilently.addEventListener("click", () => enterSite(false));
soundToggle.addEventListener("click", toggleSound);
brandHome.addEventListener("click", (event) => {
  event.preventDefault();

  if (currentStep !== 1) {
    returnToStart();
  } else {
    beginButton.focus({ preventScroll: true });
  }
});
beginButton.addEventListener("click", openQuestionScene);
backToStart.addEventListener("click", returnToStart);
backToQuestion.addEventListener("click", returnToQuestion);
backToCards.addEventListener("click", returnToCards);
backToCardsInline.addEventListener("click", returnToCards);
questionInput.addEventListener("input", () => {
  updateQuestionCount();
  invalidateCachedReading();
});
questionSuggestions.forEach((suggestion) => {
  suggestion.addEventListener("click", () => {
    questionInput.value = suggestion.dataset.question;
    updateQuestionCount();
    invalidateCachedReading();
    questionInput.focus();
  });
});
questionReady.addEventListener("click", openCardScene);
refreshWisdom.addEventListener("click", () => showRandomWisdom(true));
confirmSelection.addEventListener("click", openReadingScene);
retryReading.addEventListener("click", () => requestReading({ force: true }));
restartReading.addEventListener("click", startNewReading);
closeToast.addEventListener("click", hideLessonToast);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (lessonToast.classList.contains("is-visible")) {
    hideLessonToast();
  } else if (currentStep === 4) {
    returnToCards();
  } else if (currentStep === 3) {
    returnToQuestion();
  } else if (currentStep === 2) {
    returnToStart();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(animationFrame);
    cancelAnimationFrame(gatewayAnimationFrame);
  } else if (!reduceMotion) {
    animationFrame = requestAnimationFrame(drawStars);

    if (gatewayActive) {
      gatewayPreviousFrame = 0;
      gatewayAnimationFrame = requestAnimationFrame(drawGatewayFrame);
    }
  }
});

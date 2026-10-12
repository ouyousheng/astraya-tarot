import assert from "node:assert/strict";
import tarotReading from "../netlify/functions/tarot-reading.mjs";

const positions = ["根源", "当下", "阻力", "提醒", "方向"];
const cards = positions.map((position, index) => ({
  position,
  arcana: index,
  orientation: index % 2 === 0 ? "upright" : "reversed"
}));

const requestBody = {
  version: 1,
  locale: "zh-CN",
  question: "面对现在的选择，我需要留意什么？",
  cards
};

const modelReading = {
  summary: "这组牌邀请你在行动前看清自己的真正动机，并给变化留出空间。",
  positions: positions.map((position) => ({
    position,
    interpretation: `${position}位置的温和解读。`
  })),
  guidance: ["写下一个今天就能完成的小行动。", "在决定前给自己十分钟安静时间。"],
  reflectionQuestion: "如果不急着证明自己，你会怎样选择？",
  gentleReminder: "牌面提供的是观察角度，最终决定始终属于你。"
};

function makeRequest(body = requestBody) {
  return new Request("https://astraya.example/api/tarot-reading", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": "https://astraya.example"
    },
    body: JSON.stringify(body)
  });
}

function makeDeepSeekResponse(content) {
  return new Response(JSON.stringify({
    choices: [{ message: { content } }]
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

process.env.DEEPSEEK_API_KEY = "unit-test-key";

let fetchCalls = 0;
globalThis.fetch = async (url, options) => {
  fetchCalls += 1;
  assert.equal(url, "https://api.deepseek.com/chat/completions");
  assert.equal(options.headers.Authorization, "Bearer unit-test-key");
  return makeDeepSeekResponse(JSON.stringify(modelReading));
};

const successResponse = await tarotReading(makeRequest());
const successData = await successResponse.json();
assert.equal(successResponse.status, 200);
assert.equal(fetchCalls, 1);
assert.equal(successData.reading.positions.length, 5);
assert.equal(successData.reading.positions[0].card, "愚者（正位）");
assert.equal(successResponse.headers.get("cache-control"), "no-store, max-age=0");

const duplicateCards = cards.map((card) => ({ ...card }));
duplicateCards[4].arcana = duplicateCards[0].arcana;
const invalidResponse = await tarotReading(makeRequest({ ...requestBody, cards: duplicateCards }));
assert.equal(invalidResponse.status, 400);
assert.equal(fetchCalls, 1);

fetchCalls = 0;
globalThis.fetch = async () => {
  fetchCalls += 1;
  return fetchCalls === 1
    ? makeDeepSeekResponse("")
    : makeDeepSeekResponse(JSON.stringify(modelReading));
};

const retryResponse = await tarotReading(makeRequest());
assert.equal(retryResponse.status, 200);
assert.equal(fetchCalls, 2);

delete process.env.DEEPSEEK_API_KEY;
const unconfiguredResponse = await tarotReading(makeRequest());
assert.equal(unconfiguredResponse.status, 503);

console.log("tarot-reading function tests passed");

import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";

const html = await readFile(new URL("../public/index.html", import.meta.url), "utf8");
const script = await readFile(new URL("../public/script.js", import.meta.url), "utf8");
const stylesheet = await readFile(new URL("../public/style.css", import.meta.url), "utf8");

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const uniqueIds = new Set(ids);
assert.equal(uniqueIds.size, ids.length, "HTML contains duplicate ids");

const queriedIds = [...script.matchAll(/querySelector\("#([^"\s]+)"\)/g)].map((match) => match[1]);
for (const id of queriedIds) {
  assert.ok(uniqueIds.has(id), `script queries missing HTML id: ${id}`);
}

const labelTargets = [...html.matchAll(/<label[^>]*\bfor="([^"]+)"/g)].map((match) => match[1]);
for (const target of labelTargets) {
  assert.ok(uniqueIds.has(target), `label points to missing id: ${target}`);
}

assert.ok(html.includes('id="readingScene"'), "reading scene is missing");
assert.ok(html.includes('id="cosmicGateway"'), "opening cosmic gateway canvas is missing");
assert.ok(html.includes('class="splash__cosmos"'), "opening galaxy image layer is missing");
assert.ok(html.includes('aria-hidden="true" inert'), "hidden scenes need inert state");
assert.ok(script.includes('fetch("/api/tarot-reading"'), "AI endpoint is not wired");
assert.ok(!script.includes("DEEPSEEK_API_KEY"), "client script must never reference the secret key");
assert.ok(script.includes("startCosmicExpansion"), "opening cosmic expansion is not wired");
assert.ok(stylesheet.includes(".splash.is-opening .cosmic-gateway"), "cosmic gateway opening style is missing");

const cardDirectory = new URL("../public/assets/cards/", import.meta.url);
const cardImages = (await readdir(cardDirectory)).filter((file) => file.endsWith(".jpg"));
assert.equal(cardImages.length, 22, "all 22 Major Arcana images must be present");
for (const file of cardImages) {
  const details = await stat(new URL(file, cardDirectory));
  assert.ok(details.size > 20_000, `card image looks incomplete: ${file}`);
}

const cosmicImage = await stat(new URL("../public/assets/cosmic-gateway-v2.jpg", import.meta.url));
assert.ok(cosmicImage.size > 100_000, "opening galaxy image looks incomplete");
assert.ok(cosmicImage.size < 1_500_000, "opening galaxy image is too large for web delivery");
const mobileCosmicImage = await stat(new URL("../public/assets/cosmic-gateway-mobile-v2.jpg", import.meta.url));
assert.ok(mobileCosmicImage.size > 100_000, "mobile opening galaxy image looks incomplete");
assert.ok(mobileCosmicImage.size < 1_500_000, "mobile opening galaxy image is too large for web delivery");

const openingBraces = (stylesheet.match(/{/g) || []).length;
const closingBraces = (stylesheet.match(/}/g) || []).length;
assert.equal(openingBraces, closingBraces, "CSS braces are unbalanced");

console.log("static structure tests passed");

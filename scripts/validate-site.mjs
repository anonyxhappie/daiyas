import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const fail = [];
const read = (name) => readFileSync(path.join(root, name), "utf8");
const html = read("index.html");
const css = read("src/style.css");
const ui = read("src/js/ui.js");

const requiredIds = [
  "main", "home", "products", "process", "partnership", "quality", "about",
  "menu-toggle", "primary-nav", "business-form", "business-type",
  "business-city", "product-interest", "form-status"
];
const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((m) => m[1]));
for (const id of requiredIds) {
  if (!ids.has(id)) fail.push(`Missing required page id: #${id}`);
}

for (const [, target] of html.matchAll(/\bhref=["']#([^"']+)["']/g)) {
  if (!ids.has(target)) fail.push(`Broken internal anchor: #${target}`);
}

const assetRefs = [];
for (const [, raw] of html.matchAll(/\b(?:src|href)=["'](\/assets\/[^"']+)["']/g)) assetRefs.push(raw);
for (const [, raw] of css.matchAll(/url\(["']?(\/assets\/[^)"']+)/g)) assetRefs.push(raw);
for (const raw of new Set(assetRefs)) {
  const localPath = path.join(root, "public", decodeURIComponent(raw.slice(1)));
  if (!existsSync(localPath)) fail.push(`Missing local asset: ${raw}`);
}

for (const pathName of ["public/privacy.html", "public/terms.html"]) {
  if (!existsSync(path.join(root, pathName))) fail.push(`Missing published legal page: ${pathName}`);
}
if (!html.includes('rel="canonical" href="https://daiyas.in/"')) fail.push("Missing canonical URL");
if (html.includes('id="loader"') || html.includes('id="hero-canvas"')) fail.push("Old blocking cinematic loader/canvas still present");
if (!ui.includes('const WHATSAPP_NUMBER = "919462334899"')) fail.push("WhatsApp business number is missing or has changed");
if (!ui.includes("encodeURIComponent(messageLines.join")) fail.push("WhatsApp message is not safely URL-encoded");
if (!css.includes("prefers-reduced-motion:reduce")) fail.push("Reduced-motion CSS rule is missing");

if (fail.length) {
  console.error("Site validation failed:");
  for (const item of fail) console.error(" - " + item);
  process.exitCode = 1;
} else {
  console.log(`Site validation passed: ${requiredIds.length} required IDs, internal anchors, local assets, legal pages and WhatsApp setup checked.`);
}

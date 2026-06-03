import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const sourceFile = path.join(repoRoot, "database", "sources.json");
const imageRoot = path.join(repoRoot, "database", "images", "imported");
const manifestFile = path.join(repoRoot, "database", "images", "manifest.json");
const repoRawBase = "https://raw.githubusercontent.com/pcarrasqueira/Elite-Badges/main";

function parseJson(text, allowRepair = false) {
  try {
    return JSON.parse(text);
  } catch (error) {
    if (!allowRepair) throw error;
    return JSON.parse(
      text
        .replace(/("type"\s*:\s*"filter")\s*("borderColor")/g, "$1,\n      $2")
        .replace(/,\s*([}\]])/g, "$1")
    );
  }
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.text();
}

async function sourcePresets(source) {
  if (source.kind === "githubDirectory") {
    const directory = JSON.parse(await fetchText(source.url));
    const files = directory.filter((item) => item.name.endsWith(".json") && item.download_url);
    return Promise.all(
      files.map(async (file) => ({
        source,
        name: file.name,
        data: JSON.parse(await fetchText(file.download_url))
      }))
    );
  }

  const url = new URL(source.url, `file://${repoRoot}/`);
  const text = url.protocol === "file:" ? await readFile(url, "utf8") : await fetchText(source.url);
  return [
    {
      source,
      name: source.name,
      data: parseJson(text, source.allowRepair)
    }
  ];
}

function extensionFor(url, contentType) {
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(ext)) return ext;
  if (contentType?.includes("jpeg")) return ".jpg";
  if (contentType?.includes("gif")) return ".gif";
  if (contentType?.includes("webp")) return ".webp";
  if (contentType?.includes("svg")) return ".svg";
  return ".png";
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function downloadImage(entry) {
  const response = await fetch(entry.originalURL);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const contentType = response.headers.get("content-type") || "";
  const bytes = Buffer.from(await response.arrayBuffer());
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
  const ext = extensionFor(entry.originalURL, contentType);
  const sourceDir = slug(entry.sourceId || "external");
  const filename = `${slug(entry.name || "badge")}-${hash}${ext}`;
  const relativePath = path.posix.join("database", "images", "imported", sourceDir, filename);
  const absolutePath = path.join(repoRoot, relativePath);

  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, bytes);

  return {
    ...entry,
    contentType,
    bytes: bytes.length,
    repoPath: relativePath,
    localURL: `./${relativePath}`,
    rawURL: `${repoRawBase}/${relativePath}`
  };
}

const sources = JSON.parse(await readFile(sourceFile, "utf8"));
const presetGroups = await Promise.all(sources.map(sourcePresets));
const imageEntries = new Map();

for (const preset of presetGroups.flat()) {
  for (const filter of preset.data.filters || []) {
    if (!filter.imageURL) continue;
    const originalURL = filter.imageURL.trim();
    if (!originalURL || imageEntries.has(originalURL)) continue;
    imageEntries.set(originalURL, {
      originalURL,
      sourceId: preset.source.id,
      sourceName: preset.source.name,
      presetName: preset.name,
      filterId: filter.id || "",
      name: filter.name || filter.id || "badge"
    });
  }
}

const manifest = [];
const failures = [];

for (const entry of imageEntries.values()) {
  try {
    manifest.push(await downloadImage(entry));
  } catch (error) {
    failures.push({ ...entry, error: error.message });
  }
}

manifest.sort((a, b) => a.originalURL.localeCompare(b.originalURL));
await writeFile(
  manifestFile,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      count: manifest.length,
      failures,
      images: manifest
    },
    null,
    2
  )}\n`
);

console.log(`Downloaded ${manifest.length} unique images`);
if (failures.length) {
  console.log(`Failed ${failures.length} images`);
  for (const failure of failures) console.log(`- ${failure.originalURL}: ${failure.error}`);
}

const FALLBACK_SOURCES = [
  {
    id: "elite",
    name: "Elite Badges",
    kind: "json",
    url: "./badges.json"
  },
  {
    id: "betterformatter",
    name: "BetterFormatter presets",
    kind: "githubDirectory",
    url: "https://api.github.com/repos/9mousaa/BetterFormatter/contents/presets"
  },
  {
    id: "ngreyx1",
    name: "ngreyx1 badges",
    kind: "json",
    url: "https://raw.githubusercontent.com/ngreyx1/badges/refs/heads/main/badges.json",
    allowRepair: true
  },
  {
    id: "wddadda",
    name: "wddadda gist",
    kind: "json",
    url: "https://gist.githubusercontent.com/wddadda-hub/2efc5f81606a5689febd3dad09dee8bd/raw/2bdbf808886aa6a51dae811fd73aa384121b98fb/my-badges.json"
  }
];

const SECTION_ALIASES = new Map([
  ["gq", "quality"],
  ["source", "source"],
  ["quality", "quality"],
  ["gp", "score"],
  ["score", "score"],
  ["gr", "resolution"],
  ["resolution", "resolution"],
  ["gv", "video-tech"],
  ["visual", "video-tech"],
  ["video-tech", "video-tech"],
  ["video codec", "video-codec"],
  ["video-codec", "video-codec"],
  ["ge", "video-codec"],
  ["encoder", "video-codec"],
  ["bit-depth", "bit-depth"],
  ["ga", "audio-tech"],
  ["audio", "audio-tech"],
  ["audio-tech", "audio-tech"],
  ["gc", "audio-channels"],
  ["channels", "audio-channels"],
  ["audio-channels", "audio-channels"],
  ["gs", "streaming"],
  ["streaming", "streaming"],
  ["gl", "language"],
  ["language", "language"]
]);

const SECTION_LABELS = {
  quality: "Quality",
  score: "Score",
  source: "Source",
  resolution: "Resolution",
  "video-tech": "Video Tech",
  "video-codec": "Video Codec",
  "bit-depth": "Bit Depth",
  "audio-tech": "Audio Tech",
  "audio-channels": "Audio Channels",
  streaming: "Streaming",
  language: "Language",
  other: "Other"
};

const CONCEPT_RULES = [
  ["4K", /\b(4k|2160|uhd|ultra hd)\b/i],
  ["1080p", /\b(1080|full hd|fhd)\b/i],
  ["720p", /\b720\b/i],
  ["480p", /\b480\b/i],
  ["REMUX", /\bremux\b/i],
  ["BluRay", /\b(blu.?ray|bluray|bdremux|bdrip)\b/i],
  ["WEB-DL", /\b(web.?dl|webdl)\b/i],
  ["WEBRip", /\bweb.?rip\b/i],
  ["HDTV", /\bhdtv\b/i],
  ["DVD", /\bdvd\b/i],
  ["Dolby Vision", /\b(dolby vision|dovi|dv)\b/i],
  ["HDR10+", /\b(hdr10\+|hdr10 plus|hdr 10 \+|hdr10p)\b/i],
  ["HDR10", /\bhdr\s?10\b/i],
  ["HDR", /\bhdr\b/i],
  ["SDR", /\bsdr\b/i],
  ["IMAX Enhanced", /\bimax enhanced\b/i],
  ["IMAX", /\bimax\b/i],
  ["HEVC", /\b(hevc|h.?265|x265)\b/i],
  ["AVC", /\b(avc|h.?264|x264)\b/i],
  ["10Bit", /\b10.?bit|hi10p\b/i],
  ["8Bit", /\b8.?bit\b/i],
  ["Dolby Atmos", /\b(atmos|dolby atmos)\b/i],
  ["TrueHD", /\btrue.?hd\b/i],
  ["Dolby Digital Plus", /\b(ddp|dd\+|e.?ac.?3|dolby digital plus)\b/i],
  ["Dolby Digital", /\b(dd|ac.?3|dolby digital)\b/i],
  ["DTS:X", /\bdts[: ._-]?x\b/i],
  ["DTS-HD MA", /\b(dts.?hd.?ma|dts.?hd.?master)\b/i],
  ["DTS-HD", /\bdts.?hd\b/i],
  ["DTS", /\bdts\b/i],
  ["7.1 Audio", /\b(7\.1|7-1|8ch)\b/i],
  ["6.1 Audio", /\b(6\.1|6-1|7ch)\b/i],
  ["5.1 Audio", /\b(5\.1|5-1|6ch)\b/i],
  ["Netflix", /\b(nflx|netflix|\bnf\b)\b/i],
  ["Prime Video", /\b(amzn|amazon|prime)\b/i],
  ["Apple TV+", /\b(atvp|apple tv|appletv)\b/i],
  ["Disney+", /\b(dsnp|dsny|disney)\b/i],
  ["Max", /\b(hmax|hbomax|hbo|max)\b/i],
  ["Hulu", /\bhulu\b/i],
  ["Peacock", /\b(pcok|peac|peacock)\b/i],
  ["Paramount+", /\b(pmtp|pamp|paramount)\b/i],
  ["Crave", /\bcrave\b/i],
  ["Crunchyroll", /\b(crunch|crunchy)\b/i],
  ["English", /\b(english|eng)\b/i],
  ["Spanish", /\b(spanish|spa)\b/i],
  ["French", /\b(french|fra|vff|vfq)\b/i],
  ["German", /\b(german|deu)\b/i],
  ["Italian", /\b(italian|ita)\b/i],
  ["Portuguese", /\b(portuguese|por)\b/i],
  ["Japanese", /\b(japanese|jpn)\b/i],
  ["Korean", /\b(korean|kor)\b/i],
  ["Chinese", /\b(chinese|chi)\b/i],
  ["Hindi", /\b(hindi|hin)\b/i],
  ["Arabic", /\b(arabic|ara)\b/i],
  ["Russian", /\b(russian|rus)\b/i],
  ["Multi Audio", /\b(multi|dual audio)\b/i]
];

const SOURCE_CONCEPTS = new Set(["REMUX", "BluRay", "WEB-DL", "WEBRip", "HDTV", "DVD"]);
const VIDEO_CODEC_CONCEPTS = new Set(["HEVC", "AVC"]);
const BIT_DEPTH_CONCEPTS = new Set(["10Bit", "8Bit"]);
const STREAMING_CONCEPTS = new Set([
  "Netflix",
  "Prime Video",
  "Apple TV+",
  "Disney+",
  "Max",
  "Hulu",
  "Peacock",
  "Paramount+",
  "Crave",
  "Crunchyroll"
]);
const LANGUAGE_CONCEPTS = new Set([
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Japanese",
  "Korean",
  "Chinese",
  "Hindi",
  "Arabic",
  "Russian",
  "Multi Audio"
]);

const state = {
  sources: [],
  variants: [],
  sections: [],
  activeSection: "source",
  selections: new Map(),
  disabledConcepts: new Set(),
  query: "",
  sourceFilter: "all",
  selectedOnly: false,
  sample: "",
  output: null,
  imageManifest: new Map()
};

const els = {
  sourceStatus: document.querySelector("#sourceStatus"),
  libraryCount: document.querySelector("#libraryCount"),
  sourceList: document.querySelector("#sourceList"),
  sectionTabs: document.querySelector("#sectionTabs"),
  conceptGrid: document.querySelector("#conceptGrid"),
  activeSectionTitle: document.querySelector("#activeSectionTitle"),
  activeSectionMeta: document.querySelector("#activeSectionMeta"),
  selectedCount: document.querySelector("#selectedCount"),
  matchCount: document.querySelector("#matchCount"),
  issueCount: document.querySelector("#issueCount"),
  titlePreviewText: document.querySelector("#titlePreviewText"),
  titlePreviewBadges: document.querySelector("#titlePreviewBadges"),
  matchList: document.querySelector("#matchList"),
  validationList: document.querySelector("#validationList"),
  jsonOutput: document.querySelector("#jsonOutput"),
  searchInput: document.querySelector("#searchInput"),
  sourceFilter: document.querySelector("#sourceFilter"),
  sampleInput: document.querySelector("#sampleInput"),
  selectedOnlyToggle: document.querySelector("#selectedOnlyToggle"),
  addUrlButton: document.querySelector("#addUrlButton"),
  urlInput: document.querySelector("#urlInput"),
  fileInput: document.querySelector("#fileInput"),
  selectDefaultsButton: document.querySelector("#selectDefaultsButton"),
  copyJsonButton: document.querySelector("#copyJsonButton"),
  downloadJsonButton: document.querySelector("#downloadJsonButton"),
  conceptTemplate: document.querySelector("#conceptTemplate")
};

function canonicalSection(groupId, groups) {
  const fromId = SECTION_ALIASES.get(String(groupId || "").toLowerCase());
  if (fromId) return fromId;
  const groupName = groups.get(groupId)?.name;
  const fromName = SECTION_ALIASES.get(String(groupName || "").toLowerCase());
  return fromName || "other";
}

function sectionFor(filter, groups) {
  const concept = conceptFor(filter);
  if (SOURCE_CONCEPTS.has(concept)) return "source";
  if (VIDEO_CODEC_CONCEPTS.has(concept)) return "video-codec";
  if (BIT_DEPTH_CONCEPTS.has(concept)) return "bit-depth";
  if (STREAMING_CONCEPTS.has(concept)) return "streaming";
  if (LANGUAGE_CONCEPTS.has(concept)) return "language";
  return canonicalSection(filter.groupId, groups);
}

function conceptFor(filter) {
  const haystack = `${filter.name || ""} ${filter.id || ""} ${filter.pattern || ""}`
    .replace(/[+]/g, "+")
    .replace(/[_-]+/g, " ");
  const found = CONCEPT_RULES.find(([, pattern]) => pattern.test(haystack));
  if (found) return found[0];
  return titleCase(String(filter.name || filter.id || "Unknown").replace(/^[^\w]+/, "").trim());
}

function titleCase(value) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function stableVariantId(sourceId, presetName, filter) {
  return [sourceId, presetName, filter.groupId, filter.id, filter.name]
    .filter(Boolean)
    .join("::");
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

async function loadSourceConfig() {
  try {
    const text = await fetchText("./database/sources.json");
    return JSON.parse(text);
  } catch {
    return FALLBACK_SOURCES;
  }
}

async function loadImageManifest() {
  try {
    const text = await fetchText("./database/images/manifest.json");
    const manifest = JSON.parse(text);
    return new Map((manifest.images || []).map((image) => [image.originalURL, image]));
  } catch {
    return new Map();
  }
}

function parseJson(text, allowRepair) {
  try {
    return { data: JSON.parse(text), repaired: false };
  } catch (error) {
    if (!allowRepair) throw error;
    const repairedText = text
      .replace(/("type"\s*:\s*"filter")\s*("borderColor")/g, "$1,\n      $2")
      .replace(/,\s*([}\]])/g, "$1");
    return { data: JSON.parse(repairedText), repaired: true };
  }
}

async function loadJsonSource(source, url = source.url, label = source.name) {
  const text = await fetchText(url);
  const parsed = parseJson(text, source.allowRepair);
  return normalizePreset(parsed.data, {
    sourceId: source.id,
    sourceName: label,
    presetName: label,
    repaired: parsed.repaired
  });
}

async function loadBetterFormatter(source) {
  const directory = JSON.parse(await fetchText(source.url));
  const files = directory.filter((item) => item.name.endsWith(".json") && item.download_url);
  const batches = await Promise.allSettled(
    files.map(async (item) => {
      const text = await fetchText(item.download_url);
      const data = JSON.parse(text);
      return normalizePreset(data, {
        sourceId: source.id,
        sourceName: source.name,
        presetName: item.name,
        repaired: false
      });
    })
  );
  return batches.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
}

function normalizePreset(data, meta) {
  const groups = new Map((data.groups || []).map((group) => [group.id, group]));
  return (data.filters || []).map((filter, index) => {
    const concept = conceptFor(filter);
    const section = sectionFor(filter, groups);
    const originalImageURL = String(filter.imageURL || "").trim();
    const localImage = state.imageManifest.get(originalImageURL);
    return {
      ...filter,
      id: String(filter.id || `${concept}-${index}`).trim(),
      name: String(filter.name || concept).trim(),
      groupId: filter.groupId || section,
      imageURL: localImage?.localURL || originalImageURL,
      originalImageURL,
      exportImageURL: localImage?.rawURL || originalImageURL,
      section,
      concept,
      sourceId: meta.sourceId,
      sourceName: meta.sourceName,
      presetName: meta.presetName,
      repaired: meta.repaired,
      variantId: stableVariantId(meta.sourceId, meta.presetName, filter)
    };
  });
}

async function loadSources(extraSources = []) {
  state.imageManifest = await loadImageManifest();
  const configuredSources = await loadSourceConfig();
  const allSources = [...configuredSources, ...extraSources];
  state.sources = allSources.map((source) => ({ ...source, state: "loading", count: 0 }));
  renderSources();
  const results = await Promise.allSettled(
    allSources.map(async (source) => {
      const variants =
        source.kind === "githubDirectory" ? await loadBetterFormatter(source) : await loadJsonSource(source);
      return { source, variants };
    })
  );

  state.variants = [];
  results.forEach((result, index) => {
    const sourceState = state.sources[index];
    if (result.status === "fulfilled") {
      sourceState.state = "ready";
      sourceState.count = result.value.variants.length;
      state.variants.push(...result.value.variants);
    } else {
      sourceState.state = "error";
      sourceState.error = result.reason.message;
    }
  });

  buildDefaults();
  render();
}

function buildDefaults() {
  const byConcept = groupBy(state.variants, (variant) => `${variant.section}::${variant.concept}`);
  for (const [key, variants] of byConcept) {
    if (!state.selections.has(key)) {
      const elite = variants.find((variant) => variant.sourceId === "elite");
      state.selections.set(key, (elite || variants[0]).variantId);
      if (!elite) state.disabledConcepts.add(key);
    }
  }
  state.sections = [...new Set(state.variants.map((variant) => variant.section))].sort(sectionSort);
  if (!state.sections.includes(state.activeSection)) {
    state.activeSection = state.sections[0] || "source";
  }
}

function sectionSort(a, b) {
  const order = [
    "quality",
    "score",
    "source",
    "resolution",
    "video-tech",
    "video-codec",
    "bit-depth",
    "audio-tech",
    "audio-channels",
    "streaming",
    "language",
    "other"
  ];
  return order.indexOf(a) - order.indexOf(b);
}

function groupBy(items, keyFn) {
  return items.reduce((map, item) => {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
    return map;
  }, new Map());
}

function render() {
  renderSources();
  renderSourceFilter();
  renderSections();
  renderConcepts();
  renderOutput();
}

function renderSources() {
  els.sourceList.innerHTML = "";
  state.sources.forEach((source) => {
    const item = document.createElement("div");
    item.className = "source-item";
    item.dataset.state = source.state;
    item.innerHTML = `<strong>${escapeHtml(source.name)}</strong><span>${sourceLabel(source)}</span>`;
    els.sourceList.append(item);
  });
  const ready = state.sources.filter((source) => source.state === "ready").length;
  els.sourceStatus.textContent = `${ready}/${state.sources.length || FALLBACK_SOURCES.length} sources`;
  els.libraryCount.textContent = `${state.variants.length} badges`;
}

function sourceLabel(source) {
  if (source.state === "ready") return `${source.count} variants`;
  if (source.state === "error") return source.error || "Error";
  return "Loading";
}

function renderSections() {
  const counts = groupBy(state.variants, (variant) => variant.section);
  els.sectionTabs.innerHTML = "";
  state.sections.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `section-tab${section === state.activeSection ? " active" : ""}`;
    button.innerHTML = `<span>${SECTION_LABELS[section] || titleCase(section)}</span><small>${counts.get(section)?.length || 0}</small>`;
    button.addEventListener("click", () => {
      state.activeSection = section;
      render();
    });
    els.sectionTabs.append(button);
  });
}

function renderSourceFilter() {
  const current = state.sourceFilter;
  const readySources = state.sources.filter((source) => source.state === "ready");
  els.sourceFilter.innerHTML = `<option value="all">All sources</option>`;
  readySources.forEach((source) => {
    const option = document.createElement("option");
    option.value = source.id;
    option.textContent = source.name;
    els.sourceFilter.append(option);
  });
  els.sourceFilter.value = readySources.some((source) => source.id === current) ? current : "all";
  state.sourceFilter = els.sourceFilter.value;
}

function renderConcepts() {
  const variants = state.variants.filter((variant) => {
    return variant.section === state.activeSection && (state.sourceFilter === "all" || variant.sourceId === state.sourceFilter);
  });
  const concepts = [...groupBy(variants, (variant) => variant.concept).entries()]
    .map(([concept, conceptVariants]) => ({ concept, variants: conceptVariants }))
    .sort((a, b) => a.concept.localeCompare(b.concept));
  const query = state.query.trim().toLowerCase();
  const filtered = concepts.filter(({ concept, variants: conceptVariants }) => {
    const key = `${state.activeSection}::${concept}`;
    if (state.selectedOnly && state.disabledConcepts.has(key)) return false;
    if (!query) return true;
    return `${concept} ${conceptVariants.map((variant) => `${variant.name} ${variant.pattern} ${variant.sourceName}`).join(" ")}`
      .toLowerCase()
      .includes(query);
  });

  els.activeSectionTitle.textContent = SECTION_LABELS[state.activeSection] || titleCase(state.activeSection);
  els.activeSectionMeta.textContent = `${concepts.length} concepts, ${variants.length} variants`;
  els.conceptGrid.innerHTML = "";

  if (!filtered.length) {
    els.conceptGrid.innerHTML = `<div class="empty-state">No badges found</div>`;
    return;
  }

  filtered.forEach(({ concept, variants: conceptVariants }) => {
    const key = `${state.activeSection}::${concept}`;
    const selectedId = state.selections.get(key);
    const selected = conceptVariants.find((variant) => variant.variantId === selectedId) || conceptVariants[0];
    const card = els.conceptTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector("h3").textContent = concept;
    card.querySelector("p").textContent = `${conceptVariants.length} variants`;
    const checkbox = card.querySelector(".switch input");
    checkbox.checked = !state.disabledConcepts.has(key);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) state.disabledConcepts.delete(key);
      else state.disabledConcepts.add(key);
      renderOutput();
    });
    card.querySelector(".selected-preview").append(renderBadgePreview(selected));
    const list = card.querySelector(".variant-list");
    conceptVariants.sort(variantSort).forEach((variant) => {
      list.append(renderVariantButton(variant, selected.variantId, key));
    });
    els.conceptGrid.append(card);
  });
}

function variantSort(a, b) {
  if (a.sourceId === "elite" && b.sourceId !== "elite") return -1;
  if (b.sourceId === "elite" && a.sourceId !== "elite") return 1;
  return `${a.sourceName} ${a.presetName}`.localeCompare(`${b.sourceName} ${b.presetName}`);
}

function renderBadgePreview(variant) {
  const wrap = document.createElement("div");
  wrap.className = "selected-preview-inner";
  wrap.style.display = "contents";
  if (variant.imageURL) {
    const img = document.createElement("img");
    img.className = "badge-image";
    img.src = variant.imageURL;
    img.alt = variant.name;
    img.loading = "lazy";
    img.onerror = () => {
      img.replaceWith(renderFallback(variant));
    };
    wrap.append(img);
  } else {
    wrap.append(renderFallback(variant));
  }
  const meta = document.createElement("div");
  meta.className = "selected-meta";
  meta.innerHTML = `<strong>${escapeHtml(variant.name)}</strong><span>${escapeHtml(variant.sourceName)} / ${escapeHtml(variant.presetName)}</span>`;
  wrap.append(meta);
  return wrap;
}

function renderFallback(variant) {
  const span = document.createElement("span");
  span.className = "badge-fallback";
  span.textContent = variant.name;
  span.style.background = colorOr(variant.tagColor, "#11181c");
  span.style.color = colorOr(variant.textColor, "#ffffff");
  span.style.border = `1px solid ${colorOr(variant.borderColor, "transparent")}`;
  return span;
}

function colorOr(value, fallback) {
  return value && value !== "#00000000" ? value : fallback;
}

function renderVariantButton(variant, selectedId, key) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `variant-button${variant.variantId === selectedId ? " active" : ""}`;
  const image = variant.imageURL
    ? `<img class="variant-thumb" src="${escapeAttr(variant.imageURL)}" alt="" loading="lazy" />`
    : `<span class="variant-thumb"></span>`;
  button.innerHTML = `
    ${image}
    <span class="variant-name"><strong>${escapeHtml(variant.name)}</strong><span>${escapeHtml(variant.sourceName)} / ${escapeHtml(variant.presetName)}</span></span>
    <code>${escapeHtml(variant.id)}</code>
  `;
  button.addEventListener("click", () => {
    state.selections.set(key, variant.variantId);
    state.disabledConcepts.delete(key);
    render();
  });
  return button;
}

function selectedVariants() {
  const byId = new Map(state.variants.map((variant) => [variant.variantId, variant]));
  return [...state.selections.entries()]
    .filter(([key]) => !state.disabledConcepts.has(key))
    .map(([, variantId]) => byId.get(variantId))
    .filter(Boolean)
    .sort((a, b) => sectionSort(a.section, b.section) || a.concept.localeCompare(b.concept));
}

function renderOutput() {
  const selected = selectedVariants();
  const groups = buildExportGroups(selected);
  const filters = selected.map(cleanFilter);
  const output = { filters, groups };
  state.output = output;
  const issues = validateOutput(output, selected);
  const matches = testMatches(selected, state.sample);
  els.selectedCount.textContent = String(selected.length);
  els.matchCount.textContent = String(matches.length);
  els.issueCount.textContent = String(issues.filter((issue) => issue.level !== "ok").length);
  els.jsonOutput.value = JSON.stringify(output, null, 2);
  renderMatches(matches);
  renderTitlePreview(matches);
  renderValidation(issues);
}

function buildExportGroups(selected) {
  const sections = [...new Set(selected.map((variant) => variant.section))].sort(sectionSort);
  return sections.map((section) => ({
    id: exportGroupId(section),
    name: SECTION_LABELS[section] || titleCase(section),
    color: "#00000000",
    borderColor: "#00000000",
    isExpanded: true
  }));
}

function exportGroupId(section) {
  return section === "streaming" ? "gs" : section;
}

function cleanFilter(variant) {
  return {
    id: variant.id,
    groupId: exportGroupId(variant.section),
    name: variant.name,
    pattern: variant.pattern || "",
    imageURL: variant.exportImageURL || variant.imageURL || "",
    tagColor: variant.tagColor || "#00000000",
    borderColor: variant.borderColor || "#00000000",
    textColor: variant.textColor || "#00000000",
    tagStyle: variant.tagStyle || "filled and bordered",
    isEnabled: variant.isEnabled !== false,
    type: variant.type || "filter"
  };
}

function validateOutput(output, selected) {
  const issues = [];
  const ids = new Map();
  const groupIds = new Set(output.groups.map((group) => group.id));
  output.filters.forEach((filter) => {
    if (ids.has(filter.id)) issues.push({ level: "error", text: `Duplicate filter id: ${filter.id}` });
    ids.set(filter.id, true);
    if (!groupIds.has(filter.groupId)) issues.push({ level: "error", text: `Missing group for ${filter.name}` });
    if (!filter.imageURL) issues.push({ level: "warn", text: `${filter.name} has no image URL` });
    try {
      new RegExp(filter.pattern.replace(/^\(\?i\)/, ""), filter.pattern.startsWith("(?i)") ? "i" : "");
    } catch {
      issues.push({ level: "error", text: `Invalid regex for ${filter.name}` });
    }
  });
  selected
    .filter((variant) => variant.repaired)
    .forEach((variant) => issues.push({ level: "warn", text: `${variant.sourceName} was imported with JSON repair` }));
  if (!issues.length) issues.push({ level: "ok", text: "JSON is ready" });
  return dedupeIssues(issues);
}

function dedupeIssues(issues) {
  const seen = new Set();
  return issues.filter((issue) => {
    const key = `${issue.level}:${issue.text}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function testMatches(selected, sample) {
  if (!sample.trim()) return [];
  return selected.filter((variant) => {
    try {
      const flags = variant.pattern?.startsWith("(?i)") ? "i" : "";
      const source = String(variant.pattern || "").replace(/^\(\?i\)/, "");
      return new RegExp(source, flags).test(sample);
    } catch {
      return false;
    }
  });
}

function renderMatches(matches) {
  els.matchList.innerHTML = "";
  if (!matches.length) {
    els.matchList.innerHTML = `<div class="match-item">No matches</div>`;
    return;
  }
  matches.forEach((match) => {
    const item = document.createElement("div");
    item.className = "match-item";
    item.textContent = `${match.concept}: ${match.name}`;
    els.matchList.append(item);
  });
}

function renderTitlePreview(matches) {
  els.titlePreviewText.textContent = state.sample.trim() || "No test title";
  els.titlePreviewBadges.innerHTML = "";
  if (!matches.length) {
    const empty = document.createElement("span");
    empty.className = "preview-empty";
    empty.textContent = "No badges match this title";
    els.titlePreviewBadges.append(empty);
    return;
  }

  matches.forEach((match) => {
    const badge = document.createElement("span");
    badge.className = "preview-badge";
    badge.title = `${match.concept}: ${match.name}`;
    if (match.imageURL) {
      const image = document.createElement("img");
      image.src = match.imageURL;
      image.alt = match.name;
      image.loading = "lazy";
      image.onerror = () => {
        image.replaceWith(renderFallback(match));
      };
      badge.append(image);
    } else {
      badge.append(renderFallback(match));
    }
    els.titlePreviewBadges.append(badge);
  });
}

function renderValidation(issues) {
  els.validationList.innerHTML = "";
  issues.forEach((issue) => {
    const item = document.createElement("div");
    item.className = "validation-item";
    item.dataset.level = issue.level;
    item.textContent = issue.text;
    els.validationList.append(item);
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char];
  });
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

els.searchInput.addEventListener("input", () => {
  state.query = els.searchInput.value;
  renderConcepts();
});

els.sourceFilter.addEventListener("change", () => {
  state.sourceFilter = els.sourceFilter.value;
  renderConcepts();
});

els.sampleInput.addEventListener("input", () => {
  state.sample = els.sampleInput.value;
  renderOutput();
});

els.selectedOnlyToggle.addEventListener("change", () => {
  state.selectedOnly = els.selectedOnlyToggle.checked;
  renderConcepts();
});

els.selectDefaultsButton.addEventListener("click", () => {
  state.selections.clear();
  state.disabledConcepts.clear();
  buildDefaults();
  render();
});

els.copyJsonButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(els.jsonOutput.value);
  els.copyJsonButton.textContent = "Copied";
  setTimeout(() => {
    els.copyJsonButton.textContent = "Copy JSON";
  }, 1200);
});

els.downloadJsonButton.addEventListener("click", () => {
  const blob = new Blob([els.jsonOutput.value], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "badges.json";
  link.click();
  URL.revokeObjectURL(url);
});

els.addUrlButton.addEventListener("click", async () => {
  const url = els.urlInput.value.trim();
  if (!url) return;
  const source = {
    id: `custom-${Date.now()}`,
    name: new URL(url).hostname,
    kind: "json",
    url,
    allowRepair: true
  };
  els.urlInput.value = "";
  await loadSources([source]);
});

els.fileInput.addEventListener("change", async () => {
  const file = els.fileInput.files?.[0];
  if (!file) return;
  const text = await file.text();
  const parsed = parseJson(text, true);
  const source = {
    id: `file-${Date.now()}`,
    name: file.name,
    kind: "file",
    state: "ready",
    count: 0
  };
  const variants = normalizePreset(parsed.data, {
    sourceId: source.id,
    sourceName: file.name,
    presetName: file.name,
    repaired: parsed.repaired
  });
  state.sources.push({ ...source, count: variants.length });
  state.variants.push(...variants);
  buildDefaults();
  render();
  els.fileInput.value = "";
});

state.sample = els.sampleInput.value;
loadSources();

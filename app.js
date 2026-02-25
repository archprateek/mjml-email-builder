// ================================================================
// MJML Email Builder — App Logic
// ================================================================

const RENDER_API = "/api/render";
const COLOR_API = "/api/extract-colors";

// State
let selectedComponents = new Set(COMPONENTS.map(c => c.id));
let currentTokens = { ...DEFAULT_TOKENS };
let currentThemeIdx = 0;
let renderedHtml = "";
let renderedMjml = "";
let activeTab = "preview";
let viewportWidth = 600;
let renderTimer = null;
let isRendering = false;

// Text overrides for inline editing
let textOverrides = {};
let editMode = false;

// Repeat counts for repeatable components
let repeatCounts = {};
COMPONENTS.forEach(c => {
    if (c.repeatable) repeatCounts[c.id] = c.repeatable.baseCount;
});

// ================================================================
// DOM refs
// ================================================================
const $ = id => document.getElementById(id);
const compList = $("component-list");
const sidebarCount = $("sidebar-count");
const previewEmpty = $("preview-empty");
const previewFrameW = $("preview-frame-wrapper");
const previewIframe = $("preview-iframe");
const mjmlViewer = $("mjml-viewer");
const htmlViewer = $("html-viewer");
const mjmlCode = $("mjml-code");
const htmlCode = $("html-code");
const loadingOvl = $("loading-overlay");
const themeOverlay = $("theme-overlay");
const themeGrid = $("theme-grid");
const tokenEditor = $("token-editor");
const toastContainer = $("toast-container");

// ================================================================
// Init
// ================================================================
function init() {
    renderComponentList();
    renderThemeGrid();
    renderTokenEditor();
    updateCount();
    bindEvents();
    // Auto-render on load
    setTimeout(() => renderMjml(), 100);
}

// ================================================================
// Component List
// ================================================================
function renderComponentList(filter = "") {
    const filt = filter.toLowerCase();
    let cats = {};
    COMPONENTS.forEach(c => {
        if (filt && !c.name.toLowerCase().includes(filt) && !c.category.toLowerCase().includes(filt) && !c.desc.toLowerCase().includes(filt)) return;
        if (!cats[c.category]) cats[c.category] = [];
        cats[c.category].push(c);
    });

    compList.innerHTML = "";
    Object.keys(cats).forEach(cat => {
        const catEl = document.createElement("div");
        catEl.className = "comp-category";
        catEl.textContent = cat;
        compList.appendChild(catEl);
        cats[cat].forEach(c => {
            const card = document.createElement("div");
            card.className = `comp-card${selectedComponents.has(c.id) ? " selected" : ""}`;
            card.dataset.id = c.id;

            // Build the stepper HTML if this component is repeatable
            let stepperHtml = '';
            if (c.repeatable) {
                const count = repeatCounts[c.id] || c.repeatable.baseCount;
                stepperHtml = `
                <div class="repeat-stepper" data-comp-id="${c.id}">
                    <button class="repeat-btn repeat-minus" data-comp-id="${c.id}" title="Remove item">\u2212</button>
                    <span class="repeat-count" id="repeat-count-${c.id}">${count}</span>
                    <button class="repeat-btn repeat-plus" data-comp-id="${c.id}" title="Add item">+</button>
                </div>`;
            }

            card.innerHTML = `
        <div class="comp-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
        <div class="comp-info">
          <div class="comp-name"><span class="comp-icon">${c.icon}</span>${c.name}</div>
          <div class="comp-desc">${c.desc}</div>
        </div>
        <div class="comp-right">
          <span class="comp-tag">${c.category}</span>
          ${stepperHtml}
        </div>`;

            // Click on the card toggles selection (but NOT on stepper buttons)
            card.addEventListener("click", (e) => {
                if (e.target.closest('.repeat-stepper')) return;
                toggleComponent(c.id, card);
            });
            compList.appendChild(card);
        });
    });

    // Bind stepper events
    compList.querySelectorAll('.repeat-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.compId;
            const comp = COMPONENTS.find(c => c.id === id);
            if (!comp || !comp.repeatable) return;
            if (repeatCounts[id] > 1) {
                repeatCounts[id]--;
                document.getElementById(`repeat-count-${id}`).textContent = repeatCounts[id];
                scheduleRender();
            }
        });
    });

    compList.querySelectorAll('.repeat-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.compId;
            const comp = COMPONENTS.find(c => c.id === id);
            if (!comp || !comp.repeatable) return;
            const max = 12; // reasonable maximum
            if (repeatCounts[id] < max) {
                repeatCounts[id]++;
                document.getElementById(`repeat-count-${id}`).textContent = repeatCounts[id];
                scheduleRender();
            }
        });
    });
}

function toggleComponent(id, cardEl) {
    if (selectedComponents.has(id)) {
        selectedComponents.delete(id);
        cardEl.classList.remove("selected");
    } else {
        selectedComponents.add(id);
        cardEl.classList.add("selected");
    }
    updateCount();
    scheduleRender();
}

function scheduleRender() {
    if (renderTimer) clearTimeout(renderTimer);
    renderTimer = setTimeout(() => renderMjml(), 300);
}

function updateCount() {
    sidebarCount.textContent = `${selectedComponents.size} / ${COMPONENTS.length}`;
}

// ================================================================
// Theme
// ================================================================
function renderThemeGrid() {
    themeGrid.innerHTML = THEMES.map((t, i) => `
    <div class="theme-card${i === currentThemeIdx ? " active" : ""}" data-idx="${i}">
      <div class="theme-card-name">${t.name}</div>
      <div class="theme-card-swatches">
        <div class="theme-swatch" style="background:${t.tokens.BRAND}"></div>
        <div class="theme-swatch" style="background:${t.tokens.CTA}"></div>
        <div class="theme-swatch" style="background:${t.tokens.TINT_BLUE}"></div>
        <div class="theme-swatch" style="background:${t.tokens.TINT_GREEN}"></div>
        <div class="theme-swatch" style="background:${t.tokens.TINT_VIOLET}"></div>
      </div>
    </div>`).join("");

    themeGrid.querySelectorAll(".theme-card").forEach(card => {
        card.addEventListener("click", () => {
            const idx = parseInt(card.dataset.idx);
            currentThemeIdx = idx;
            currentTokens = { ...THEMES[idx].tokens };
            renderThemeGrid();
            renderTokenEditor();
            toast(`Applied "${THEMES[idx].name}" theme`, "success");
        });
    });
}

function renderTokenEditor() {
    const labels = {
        BG: "Background", SURFACE: "Surface", BORDER: "Border", TEXT: "Text",
        MUTED: "Muted", LINK: "Link", BRAND: "Brand", CTA: "CTA",
        CTA_TEXT: "CTA Text", TINT_BLUE: "Tint Blue", TINT_ORANGE: "Tint Orange",
        TINT_GREEN: "Tint Green", TINT_VIOLET: "Tint Violet", TINT_RED: "Tint Red"
    };
    tokenEditor.innerHTML = Object.keys(currentTokens).map(k => `
    <div class="token-item">
      <input type="color" class="token-color-input" data-token="${k}" value="${currentTokens[k]}" />
      <span class="token-label">${labels[k] || k}</span>
    </div>`).join("");

    tokenEditor.querySelectorAll(".token-color-input").forEach(inp => {
        inp.addEventListener("input", e => {
            currentTokens[e.target.dataset.token] = e.target.value;
        });
    });
}

// ================================================================
// Build MJML
// ================================================================

// Build repeatable MJML — chunks N items into rows of perRow
function buildRepeatableMjml(comp) {
    const rep = comp.repeatable;
    const count = repeatCounts[comp.id] || rep.baseCount;
    const perRow = rep.perRow;

    // Optional header (e.g. grid-3up has a title section above the items)
    let mjml = rep.headerMjml ? rep.headerMjml + '\n' : '';

    // Chunk items into rows
    for (let rowStart = 1; rowStart <= count; rowStart += perRow) {
        const rowEnd = Math.min(rowStart + perRow - 1, count);
        mjml += `    <mj-section ${rep.sectionAttrs}>\n`;
        for (let i = rowStart; i <= rowEnd; i++) {
            mjml += rep.itemFn(i) + '\n';
            // Insert gap column between items (not after last in row)
            if (rep.gapColumn && i < rowEnd) {
                mjml += '      ' + rep.gapColumn + '\n';
            }
        }
        mjml += `    </mj-section>\n`;
    }

    return mjml;
}

function getMjmlForComponent(comp) {
    // If the component has a repeatable config AND the count differs from baseCount, use dynamic generation
    if (comp.repeatable) {
        const count = repeatCounts[comp.id] || comp.repeatable.baseCount;
        if (count !== comp.repeatable.baseCount) {
            return buildRepeatableMjml(comp);
        }
        // If count equals base but repeatable has headerMjml, still use dynamic to stay consistent
        if (comp.repeatable.headerMjml) {
            return buildRepeatableMjml(comp);
        }
    }
    return comp.mjml;
}

function buildMjml() {
    let head = MJML_HEAD;
    let body = "";
    const used = COMPONENTS.filter(c => selectedComponents.has(c.id));
    used.forEach((c, i) => {
        body += getMjmlForComponent(c) + "\n";
        // Add subtle spacer between sections (not after last)
        if (i < used.length - 1 && c.category !== "Header" && used[i + 1]?.category !== "Header") {
            body += `    <mj-section background-color="%%BG%%" padding="4px 0"><mj-column><mj-spacer height="1px" /></mj-column></mj-section>\n`;
        }
    });

    // Replace tokens
    let full = `<mjml>\n${head}\n  <mj-body background-color="%%BG%%">\n${body}\n  </mj-body>\n</mjml>`;
    Object.keys(currentTokens).forEach(k => {
        full = full.replace(new RegExp(`%%${k}%%`, "g"), currentTokens[k]);
    });

    // Apply legacy text overrides — replace {{key}} with user-edited values
    Object.keys(textOverrides).forEach(k => {
        if (k.startsWith('__idx_')) return; // Skip index-based overrides here
        full = full.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), textOverrides[k]);
    });

    // Build text map from the current MJML (before applying index-based overrides)
    buildMjmlTextMap(full);

    // Apply index-based text overrides from inline editing
    // Process in reverse offset order so earlier replacements don't shift offsets
    const indexOverrides = Object.keys(textOverrides)
        .filter(k => k.startsWith('__idx_'))
        .map(k => ({ key: k, idx: parseInt(k.replace('__idx_', '')) }));

    if (indexOverrides.length > 0) {
        // Sort by offset descending so we can replace without shifting
        const entriesToReplace = indexOverrides
            .map(o => {
                const entry = mjmlTextMap.find(e => e.index === o.idx);
                if (!entry) return null;
                return { ...entry, newText: textOverrides[o.key] };
            })
            .filter(Boolean)
            .sort((a, b) => b.offset - a.offset);

        for (const entry of entriesToReplace) {
            // Replace the text content inside the mj-text or mj-button tag
            const tagMatch = entry.fullMatch.match(/^(<(?:mj-text|mj-button)[^>]*>)([\s\S]*?)(<\/(?:mj-text|mj-button)>)$/);
            if (tagMatch) {
                const newFull = tagMatch[1] + entry.newText + tagMatch[3];
                full = full.substring(0, entry.offset) + newFull + full.substring(entry.offset + entry.fullMatch.length);
            }
        }
    }

    // Collect used mj-class names
    const usedClasses = new Set();
    const classRegex = /mj-class="([^"]+)"/g;
    let m;
    while ((m = classRegex.exec(body)) !== null) {
        m[1].split(/\s+/).forEach(cls => usedClasses.add(cls));
    }

    // Only keep used mj-class definitions in head
    const allClassDefs = head.match(/<mj-class\s+name="[^"]*"[^/]*\/>/g) || [];
    allClassDefs.forEach(def => {
        const nameMatch = def.match(/name="([^"]+)"/);
        if (nameMatch && !usedClasses.has(nameMatch[1])) {
            full = full.replace(def, "");
        }
    });

    // Clean up empty lines
    full = full.replace(/\n{3,}/g, "\n\n");
    return full;
}

// ================================================================
// Render via MJML API
// ================================================================
async function renderMjml() {
    if (selectedComponents.size === 0) {
        previewEmpty.style.display = "flex";
        previewFrameW.style.display = "none";
        renderedHtml = "";
        renderedMjml = "";
        return;
    }
    if (isRendering) return;
    isRendering = true;

    renderedMjml = buildMjml();
    loadingOvl.style.display = "flex";

    try {
        const resp = await fetch(RENDER_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mjml: renderedMjml })
        });

        if (!resp.ok) {
            const err = await resp.json().catch(() => ({}));
            throw new Error(err.message || err.error || `API Error ${resp.status}`);
        }

        const data = await resp.json();
        renderedHtml = data.html;

        // Show preview
        showTab(activeTab);
        previewEmpty.style.display = "none";
        previewFrameW.style.display = (activeTab === "preview") ? "block" : "none";
        previewIframe.srcdoc = renderedHtml;

        // Set iframe height to match content
        previewIframe.onload = () => {
            try {
                const doc = previewIframe.contentDocument;
                const h = doc.documentElement.scrollHeight;
                previewIframe.style.height = Math.max(h, 600) + "px";
            } catch (e) {
                previewIframe.style.height = "3000px";
            }
            // Always setup editing (applies data-edit-idx attributes)
            // and enables contenteditable if editMode is active
            setupIframeEditing();
        };

        // Update code views
        mjmlCode.textContent = renderedMjml;
        htmlCode.textContent = renderedHtml;

        $("btn-download").disabled = false;
        const timeStr = data.renderTime ? ` (${data.renderTime}ms)` : "";
        toast(`\u2705 Rendered${timeStr}`, "success");

        if (data.errors && data.errors.length > 0) {
            toast(`\u26a0\ufe0f ${data.errors.length} MJML warning(s)`, "error");
        }
    } catch (err) {
        toast(`\u274c ${err.message}`, "error");
        console.error(err);
    } finally {
        loadingOvl.style.display = "none";
        isRendering = false;
    }
}

// ================================================================
// Tabs & Viewport
// ================================================================
function showTab(tab) {
    activeTab = tab;
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
    previewFrameW.style.display = (tab === "preview" && renderedHtml) ? "block" : "none";
    previewEmpty.style.display = (tab === "preview" && !renderedHtml) ? "flex" : "none";
    mjmlViewer.style.display = tab === "mjml" ? "block" : "none";
    htmlViewer.style.display = tab === "html" ? "block" : "none";
}

function setViewport(w) {
    viewportWidth = w;
    previewFrameW.style.width = w + "px";
    document.querySelectorAll(".vp-btn").forEach(b => b.classList.toggle("active", parseInt(b.dataset.width) === w));
    // Recalculate iframe height after reflow
    setTimeout(() => {
        try {
            const doc = previewIframe.contentDocument;
            if (doc) {
                const h = doc.documentElement.scrollHeight;
                previewIframe.style.height = Math.max(h, 600) + "px";
            }
        } catch (e) { }
    }, 300);
}

// ================================================================
// Download
// ================================================================
function downloadHtml() {
    if (!renderedHtml) return;
    const blob = new Blob([renderedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-template.html";
    a.click();
    URL.revokeObjectURL(url);
    toast("\ud83d\udce5 HTML downloaded!", "success");
}

// ================================================================
// URL Color Extraction
// ================================================================
async function extractColors() {
    const url = $("url-input").value.trim();
    if (!url) { toast("Enter a URL first", "error"); return; }

    toast("\ud83d\udd0d Extracting colors\u2026");
    try {
        const resp = await fetch(COLOR_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        });
        if (!resp.ok) throw new Error("Failed to extract colors");
        const data = await resp.json();
        const filtered = data.colors || [];
        if (filtered.length === 0) {
            toast("No distinctive colors found", "error");
            return;
        }

        const topColors = filtered.slice(0, 12);

        // Display extracted colors
        const palette = $("extracted-palette");
        const swatches = $("extracted-swatches");
        palette.style.display = "block";
        swatches.innerHTML = topColors.map(c => `<div class="extracted-swatch" style="background:${c}" title="${c}" data-color="${c}"></div>`).join("");

        // Store for apply
        palette.dataset.colors = JSON.stringify(topColors);
        toast(`Found ${topColors.length} colors`, "success");

    } catch (err) {
        toast("Failed to extract colors: " + err.message, "error");
    }
}

function applyExtractedColors() {
    const palette = $("extracted-palette");
    const colors = JSON.parse(palette.dataset.colors || "[]");
    if (colors.length < 2) { toast("Not enough colors to apply", "error"); return; }

    // Sort by luminance
    const lum = hex => {
        const c = hex.replace("#", "");
        const r = parseInt(c.substr(0, 2), 16) / 255;
        const g = parseInt(c.substr(2, 2), 16) / 255;
        const b = parseInt(c.substr(4, 2), 16) / 255;
        return 0.299 * r + 0.587 * g + 0.114 * b;
    };

    const sorted = [...colors].sort((a, b) => lum(a) - lum(b));
    const darkest = sorted[0];
    const brightest = sorted[sorted.length - 1];
    const mid = sorted[Math.floor(sorted.length / 2)];

    // Create a light tint from the darkest color
    const makeTint = (hex, factor = 0.85) => {
        const c = hex.replace("#", "");
        const r = Math.round(parseInt(c.substr(0, 2), 16) * (1 - factor) + 255 * factor);
        const g = Math.round(parseInt(c.substr(2, 2), 16) * (1 - factor) + 255 * factor);
        const b = Math.round(parseInt(c.substr(4, 2), 16) * (1 - factor) + 255 * factor);
        return "#" + [r, g, b].map(v => Math.min(255, v).toString(16).padStart(2, "0")).join("");
    };

    currentTokens.BRAND = darkest;
    currentTokens.CTA = mid;
    currentTokens.LINK = sorted[Math.floor(sorted.length * 0.6)] || mid;
    currentTokens.TINT_BLUE = makeTint(darkest);
    currentTokens.TINT_GREEN = makeTint(sorted[Math.min(2, sorted.length - 1)]);
    currentTokens.TINT_VIOLET = makeTint(sorted[Math.min(3, sorted.length - 1)]);
    currentTokens.TINT_ORANGE = makeTint(mid, 0.88);

    renderTokenEditor();
    toast("Applied extracted colors!", "success");
}

// ================================================================
// Copy to clipboard
// ================================================================
function copyText(text, label) {
    navigator.clipboard.writeText(text).then(() => toast(`\ud83d\udccb ${label} copied!`, "success")).catch(() => toast("Copy failed", "error"));
}

// ================================================================
// Toast
// ================================================================
function toast(msg, type = "") {
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.innerHTML = msg;
    toastContainer.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateY(10px)"; setTimeout(() => el.remove(), 300); }, 3000);
}

// ================================================================
// Event bindings
// ================================================================
function bindEvents() {
    $("btn-render").addEventListener("click", renderMjml);
    $("btn-download").addEventListener("click", downloadHtml);
    $("btn-select-all").addEventListener("click", () => {
        selectedComponents = new Set(COMPONENTS.map(c => c.id));
        renderComponentList($("search-input").value);
        updateCount();
        scheduleRender();
    });
    $("btn-deselect-all").addEventListener("click", () => {
        selectedComponents.clear();
        renderComponentList($("search-input").value);
        updateCount();
        scheduleRender();
    });

    // Tabs
    document.querySelectorAll(".tab-btn").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));

    // Viewport
    document.querySelectorAll(".vp-btn").forEach(b => b.addEventListener("click", () => setViewport(parseInt(b.dataset.width))));

    // Search
    $("search-input").addEventListener("input", e => renderComponentList(e.target.value));

    // Theme panel
    $("btn-theme-panel").addEventListener("click", () => themeOverlay.classList.add("open"));
    $("theme-panel-close").addEventListener("click", () => themeOverlay.classList.remove("open"));
    themeOverlay.addEventListener("click", e => { if (e.target === themeOverlay) themeOverlay.classList.remove("open"); });

    // URL extractor
    $("btn-extract-colors").addEventListener("click", extractColors);
    $("btn-apply-extracted").addEventListener("click", applyExtractedColors);

    // Copy buttons
    $("btn-copy-mjml").addEventListener("click", () => copyText(renderedMjml, "MJML"));
    $("btn-copy-html").addEventListener("click", () => copyText(renderedHtml, "HTML"));

    // Keyboard shortcuts
    document.addEventListener("keydown", e => {
        if (e.ctrlKey && e.key === "Enter") { e.preventDefault(); renderMjml(); }
        if (e.key === "Escape") themeOverlay.classList.remove("open");
    });

    // Edit mode toggle
    const editBtn = $("btn-edit-text");
    const editIndicator = $("edit-mode-indicator");
    const resetEditsBtn = $("btn-reset-edits");
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            editMode = !editMode;
            editBtn.classList.toggle("active", editMode);
            editBtn.textContent = editMode ? "✏️ Editing" : "✏️ Edit Text";
            if (editIndicator) editIndicator.classList.toggle("visible", editMode);
            if (resetEditsBtn) resetEditsBtn.style.display = editMode ? "inline-flex" : "none";
            if (renderedHtml) {
                if (editMode) {
                    setupIframeEditing();
                } else {
                    disableIframeEditing();
                }
            }
        });
    }

    // Reset all text edits
    if (resetEditsBtn) {
        resetEditsBtn.addEventListener("click", () => {
            textOverrides = {};
            toast("🔄 All text edits reset", "success");
            scheduleRender();
        });
    }
}

// ================================================================
// Inline Text Editing — All text is editable directly in preview
// ================================================================

// Build a flat list of text strings from MJML in document order.
// Each entry: { index, originalText }
// We use these to map data-edit-idx in the rendered HTML back to MJML source.
let mjmlTextMap = [];  // Populated after each build

function buildMjmlTextMap(mjmlSource) {
    mjmlTextMap = [];
    // Match text content inside mj-text tags: <mj-text ...>TEXT</mj-text>
    const textReg = /<mj-text[^>]*>([\s\S]*?)<\/mj-text>/g;
    let m;
    let idx = 0;
    while ((m = textReg.exec(mjmlSource)) !== null) {
        mjmlTextMap.push({
            index: idx,
            originalText: m[1],
            fullMatch: m[0],
            offset: m.index
        });
        idx++;
    }
    // Also match button text: <mj-button ...>TEXT</mj-button>
    const btnReg = /<mj-button[^>]*>([\s\S]*?)<\/mj-button>/g;
    while ((m = btnReg.exec(mjmlSource)) !== null) {
        mjmlTextMap.push({
            index: idx,
            originalText: m[1],
            fullMatch: m[0],
            offset: m.index
        });
        idx++;
    }
    // Sort by offset so indices follow document order
    mjmlTextMap.sort((a, b) => a.offset - b.offset);
    mjmlTextMap.forEach((entry, i) => entry.index = i);
}

function injectEditAttributes(html) {
    // Inject data-edit-idx onto the rendered HTML <td> elements that correspond to mj-text
    // MJML renders mj-text into <td ...><div ...>TEXT</div></td> or similar
    // We look for the same text content and tag them with data-edit-idx
    // Strategy: Walk all text-bearing elements and match them in order against mjmlTextMap

    // We'll do this inside the iframe after srcdoc loads, not by modifying HTML string
    return html;
}

function setupIframeEditing() {
    try {
        const doc = previewIframe.contentDocument;
        if (!doc || !doc.body) return;

        // Inject a style for edit mode visual cues
        let editStyle = doc.getElementById('edit-mode-style');
        if (!editStyle) {
            editStyle = doc.createElement('style');
            editStyle.id = 'edit-mode-style';
            doc.head.appendChild(editStyle);
        }

        if (editMode) {
            editStyle.textContent = `
                [data-edit-idx] {
                    outline: 2px dashed rgba(99,102,241,0.4) !important;
                    outline-offset: 2px !important;
                    cursor: text !important;
                    transition: outline-color 0.2s, background-color 0.2s !important;
                    border-radius: 3px !important;
                }
                [data-edit-idx]:hover {
                    outline-color: rgba(99,102,241,0.8) !important;
                    background-color: rgba(99,102,241,0.06) !important;
                }
                [data-edit-idx]:focus {
                    outline: 2px solid rgba(99,102,241,0.9) !important;
                    outline-offset: 2px !important;
                    background-color: rgba(99,102,241,0.08) !important;
                }
            `;
        } else {
            editStyle.textContent = '';
        }

        // Find all text-bearing elements in the rendered HTML
        // MJML renders mj-text as <div> inside <td>, and mj-button as <a> inside <td>
        const allTextEls = [];

        // Collect divs that are direct children of <td> (mj-text renders this way)  
        doc.body.querySelectorAll('td > div').forEach(div => {
            // Skip divs that are purely structural (contain only other block elements)
            const text = div.textContent.trim();
            if (text && !div.querySelector('table')) {
                allTextEls.push(div);
            }
        });

        // Collect button/link <a> elements inside <td> (mj-button renders as <a>)
        doc.body.querySelectorAll('td a[href]').forEach(a => {
            const text = a.textContent.trim();
            if (text) {
                allTextEls.push(a);
            }
        });

        // Now try to match each rendered element to a mjmlTextMap entry by text content
        // We'll use a greedy ordered approach: for each mjmlTextMap entry in order, find
        // the first matching element
        const usedElements = new Set();
        const usedMapEntries = new Set();

        // First pass: exact match
        for (const entry of mjmlTextMap) {
            let entryText = entry.originalText.trim();
            // Strip HTML tags for comparison
            const stripped = entryText.replace(/<[^>]*>/g, '').trim();
            for (const el of allTextEls) {
                if (usedElements.has(el)) continue;
                const elText = el.textContent.trim();
                if (elText === stripped || elText === entryText) {
                    el.setAttribute('data-edit-idx', entry.index);
                    el.contentEditable = editMode ? 'true' : 'false';
                    usedElements.add(el);
                    usedMapEntries.add(entry.index);
                    break;
                }
            }
        }

        // Second pass: fuzzy match for remaining (text overrides may have changed content)
        // Match by order — any unmatched elements get assigned to unmatched map entries in order
        const unmatchedEntries = mjmlTextMap.filter(e => !usedMapEntries.has(e.index));
        const unmatchedEls = allTextEls.filter(e => !usedElements.has(e));
        for (let i = 0; i < Math.min(unmatchedEntries.length, unmatchedEls.length); i++) {
            unmatchedEls[i].setAttribute('data-edit-idx', unmatchedEntries[i].index);
            unmatchedEls[i].contentEditable = editMode ? 'true' : 'false';
        }

        // Attach input listeners for live editing
        if (editMode) {
            let syncTimer = null;
            doc.body.addEventListener('input', (e) => {
                const el = e.target.closest('[data-edit-idx]');
                if (!el) return;
                const idx = parseInt(el.getAttribute('data-edit-idx'));
                const newText = el.innerHTML;

                // Store override
                textOverrides[`__idx_${idx}`] = newText;

                // Debounced sync to MJML/HTML code views
                if (syncTimer) clearTimeout(syncTimer);
                syncTimer = setTimeout(() => {
                    syncEditToSource();
                }, 400);
            });

            // Prevent Enter from creating divs, use <br> instead
            doc.body.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    const el = e.target.closest('[data-edit-idx]');
                    if (el) {
                        e.preventDefault();
                        // Insert a <br> at cursor position
                        const sel = doc.getSelection();
                        if (sel.rangeCount) {
                            const range = sel.getRangeAt(0);
                            range.deleteContents();
                            const br = doc.createElement('br');
                            range.insertNode(br);
                            range.setStartAfter(br);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                            // Trigger input event
                            el.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                    }
                }
            });
        }

    } catch (e) {
        console.warn("Could not setup iframe editing:", e);
    }
}

// Sync inline edits back to MJML source and update code views
function syncEditToSource() {
    // Rebuild MJML with overrides applied
    renderedMjml = buildMjml();
    mjmlCode.textContent = renderedMjml;

    // Re-render HTML via API (debounced) and update HTML code view
    if (syncRenderTimer) clearTimeout(syncRenderTimer);
    syncRenderTimer = setTimeout(async () => {
        try {
            const resp = await fetch(RENDER_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mjml: renderedMjml })
            });
            if (resp.ok) {
                const data = await resp.json();
                renderedHtml = data.html;
                htmlCode.textContent = renderedHtml;
            }
        } catch (e) {
            console.warn("Sync render failed:", e);
        }
    }, 800);
}

let syncRenderTimer = null;

function disableIframeEditing() {
    try {
        const doc = previewIframe.contentDocument;
        if (!doc || !doc.body) return;
        doc.body.querySelectorAll('[data-edit-idx]').forEach(el => {
            el.contentEditable = 'false';
        });
        const editStyle = doc.getElementById('edit-mode-style');
        if (editStyle) editStyle.textContent = '';
    } catch (e) {
        console.warn("Could not disable iframe editing:", e);
    }
}

// Boot
init();

// ================================================================
// MJML Email Builder — App Logic (v2 — Stack-based)
// ================================================================

const RENDER_API = "/api/render";
const COLOR_API = "/api/extract-colors";

// State
let instanceCounter = 0;
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

// Active email stack — ordered array of instance objects
// Each: { uid, componentId, marginTop, marginBottom, marginColor, separator, repeatCount }
let activeStack = [];

// Thumbnail cache
let thumbnailCache = {};

// ================================================================
// DOM refs
// ================================================================
const $ = id => document.getElementById(id);
const compList = $("component-list");
const sidebarCount = $("sidebar-count");
const stackList = $("active-stack-list");
const stackEmpty = $("active-stack-empty");
const stackCount = $("active-stack-count");
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
    renderComponentLibrary();
    renderThemeGrid();
    renderTokenEditor();
    updateStackCount();
    bindEvents();
    fetchThumbnails();
}

// ================================================================
// Component Library (left sidebar — palette)
// ================================================================
function renderComponentLibrary(filter = "") {
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
            card.className = "comp-card library-card";
            card.dataset.id = c.id;

            const thumbHtml = thumbnailCache[c.id]
                ? `<div class="comp-thumb-wrap"><iframe class="comp-thumb" srcdoc="${thumbnailCache[c.id].replace(/"/g, '&quot;')}" scrolling="no" tabindex="-1"></iframe></div>`
                : `<div class="comp-thumb-wrap comp-thumb-loading"><span>⏳</span></div>`;

            card.innerHTML = `
        ${thumbHtml}
        <div class="comp-info">
          <div class="comp-name"><span class="comp-icon">${c.icon}</span>${c.name}</div>
          <div class="comp-desc">${c.desc}</div>
        </div>
        <button class="add-btn" title="Add to stack">+</button>`;

            card.querySelector('.add-btn').addEventListener("click", (e) => {
                e.stopPropagation();
                addToStack(c.id);
            });
            card.addEventListener("click", () => addToStack(c.id));
            compList.appendChild(card);
        });
    });

    sidebarCount.textContent = COMPONENTS.length;
}

// Fetch all component thumbnails in one batch
async function fetchThumbnails() {
    try {
        // Build minimal MJML for each component
        const items = COMPONENTS.map(c => {
            let compMjml = c.mjml;
            // Replace tokens with default values for preview
            let full = `<mjml>\n${MJML_HEAD}\n  <mj-body background-color="%%BG%%">\n${compMjml}\n  </mj-body>\n</mjml>`;
            Object.keys(DEFAULT_TOKENS).forEach(k => {
                full = full.replace(new RegExp(`%%${k}%%`, "g"), DEFAULT_TOKENS[k]);
            });
            return { id: c.id, mjml: full };
        });

        const resp = await fetch("/api/thumbnails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items })
        });
        if (!resp.ok) throw new Error("Thumbnail API failed");
        const data = await resp.json();
        thumbnailCache = data.thumbnails || {};
        console.log(`Loaded ${Object.keys(thumbnailCache).length} thumbnails in ${data.renderTime}ms`);
        // Re-render library with thumbnails
        renderComponentLibrary($('search-input').value);
    } catch (err) {
        console.warn("Could not fetch thumbnails:", err);
    }
}

// ================================================================
// Active Stack (middle column)
// ================================================================
function addToStack(componentId) {
    const comp = COMPONENTS.find(c => c.id === componentId);
    if (!comp) return;
    const uid = ++instanceCounter;
    const instance = {
        uid,
        componentId,
        marginTop: 0,
        marginBottom: 0,
        marginColor: 'BG',
        separator: false,
        repeatCount: comp.repeatable ? comp.repeatable.baseCount : 1
    };
    activeStack.push(instance);
    renderStackList();
    updateStackCount();
    scheduleRender();
    toast(`Added "${comp.name}"`, "success");
}

function removeFromStack(uid) {
    activeStack = activeStack.filter(inst => inst.uid !== uid);
    renderStackList();
    updateStackCount();
    scheduleRender();
}

function duplicateInStack(uid) {
    const idx = activeStack.findIndex(inst => inst.uid === uid);
    if (idx === -1) return;
    const orig = activeStack[idx];
    const comp = COMPONENTS.find(c => c.id === orig.componentId);
    const newUid = ++instanceCounter;
    const clone = { ...orig, uid: newUid };
    activeStack.splice(idx + 1, 0, clone);
    renderStackList();
    updateStackCount();
    scheduleRender();
    if (comp) toast(`Duplicated "${comp.name}"`, "success");
}

function moveInStack(uid, direction) {
    const idx = activeStack.findIndex(inst => inst.uid === uid);
    if (idx === -1) return;
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= activeStack.length) return;
    [activeStack[idx], activeStack[newIdx]] = [activeStack[newIdx], activeStack[idx]];
    renderStackList();
    scheduleRender();
}

function updateStackCount() {
    stackCount.textContent = activeStack.length;
    stackEmpty.style.display = activeStack.length === 0 ? "flex" : "none";
    stackList.style.display = activeStack.length === 0 ? "none" : "block";
}

function renderStackList() {
    stackList.innerHTML = "";
    activeStack.forEach((inst, idx) => {
        const comp = COMPONENTS.find(c => c.id === inst.componentId);
        if (!comp) return;

        const item = document.createElement("div");
        item.className = "stack-item";
        item.dataset.uid = inst.uid;
        item.draggable = true;

        // Build stepper HTML if repeatable
        let stepperHtml = '';
        if (comp.repeatable) {
            stepperHtml = `
            <div class="repeat-stepper">
                <button class="repeat-btn repeat-minus" data-uid="${inst.uid}" title="Remove item">\u2212</button>
                <span class="repeat-count">${inst.repeatCount}</span>
                <button class="repeat-btn repeat-plus" data-uid="${inst.uid}" title="Add item">+</button>
            </div>`;
        }

        // Margin / separator controls
        const marginHtml = `
            <div class="margin-controls">
                <div class="margin-row">
                    <span class="margin-label" title="Top spacing">▲</span>
                    <button class="margin-btn margin-minus" data-uid="${inst.uid}" data-dir="top" title="Less top">−</button>
                    <span class="margin-val">${inst.marginTop}</span>
                    <button class="margin-btn margin-plus" data-uid="${inst.uid}" data-dir="top" title="More top">+</button>
                </div>
                <div class="margin-row">
                    <span class="margin-label" title="Bottom spacing">▼</span>
                    <button class="margin-btn margin-minus" data-uid="${inst.uid}" data-dir="bottom" title="Less bottom">−</button>
                    <span class="margin-val">${inst.marginBottom}</span>
                    <button class="margin-btn margin-plus" data-uid="${inst.uid}" data-dir="bottom" title="More bottom">+</button>
                </div>
                <div class="margin-row margin-extras">
                    <button class="margin-color-btn ${inst.marginColor === 'SURFACE' ? 'active' : ''}" data-uid="${inst.uid}" title="Gap color: ${inst.marginColor === 'BG' ? 'background' : 'white'}">⬜ ${inst.marginColor === 'SURFACE' ? 'white' : 'bg'}</button>
                    <button class="margin-sep-btn ${inst.separator ? 'active' : ''}" data-uid="${inst.uid}" title="Separator below">— sep</button>
                </div>
            </div>`;

        item.innerHTML = `
        <div class="stack-item-header">
            <div class="stack-item-drag" title="Drag to reorder">⠿</div>
            <span class="stack-item-num">${idx + 1}</span>
            <div class="stack-item-info">
                <span class="comp-icon">${comp.icon}</span>
                <span class="stack-item-name">${comp.name}</span>
            </div>
            <div class="stack-item-actions">
                ${stepperHtml}
                <button class="stack-btn" data-action="up" data-uid="${inst.uid}" title="Move up">▲</button>
                <button class="stack-btn" data-action="down" data-uid="${inst.uid}" title="Move down">▼</button>
                <button class="stack-btn" data-action="duplicate" data-uid="${inst.uid}" title="Duplicate">⧉</button>
                <button class="stack-btn stack-btn-remove" data-action="remove" data-uid="${inst.uid}" title="Remove">×</button>
            </div>
        </div>
        ${marginHtml}`;

        // Drag events
        item.addEventListener("dragstart", (e) => {
            item.classList.add("dragging");
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", inst.uid);
        });
        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
            document.querySelectorAll('.stack-item.drag-over').forEach(el => el.classList.remove('drag-over'));
        });

        stackList.appendChild(item);
    });

    // Bind action buttons
    stackList.querySelectorAll('.stack-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const uid = parseInt(btn.dataset.uid);
            const action = btn.dataset.action;
            if (action === 'up') moveInStack(uid, -1);
            else if (action === 'down') moveInStack(uid, 1);
            else if (action === 'duplicate') duplicateInStack(uid);
            else if (action === 'remove') removeFromStack(uid);
        });
    });

    // Bind repeat steppers
    stackList.querySelectorAll('.repeat-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const uid = parseInt(btn.dataset.uid);
            const inst = activeStack.find(i => i.uid === uid);
            if (inst && inst.repeatCount > 1) {
                inst.repeatCount--;
                renderStackList();
                scheduleRender();
            }
        });
    });
    stackList.querySelectorAll('.repeat-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const uid = parseInt(btn.dataset.uid);
            const inst = activeStack.find(i => i.uid === uid);
            if (inst && inst.repeatCount < 12) {
                inst.repeatCount++;
                renderStackList();
                scheduleRender();
            }
        });
    });

    // Bind margin controls
    stackList.querySelectorAll('.margin-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const uid = parseInt(btn.dataset.uid);
            const dir = btn.dataset.dir;
            const inst = activeStack.find(i => i.uid === uid);
            if (!inst) return;
            const key = dir === 'top' ? 'marginTop' : 'marginBottom';
            if (inst[key] > 0) { inst[key] -= 8; renderStackList(); scheduleRender(); }
        });
    });
    stackList.querySelectorAll('.margin-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const uid = parseInt(btn.dataset.uid);
            const dir = btn.dataset.dir;
            const inst = activeStack.find(i => i.uid === uid);
            if (!inst) return;
            const key = dir === 'top' ? 'marginTop' : 'marginBottom';
            if (inst[key] < 64) { inst[key] += 8; renderStackList(); scheduleRender(); }
        });
    });

    // Margin color toggle
    stackList.querySelectorAll('.margin-color-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const uid = parseInt(btn.dataset.uid);
            const inst = activeStack.find(i => i.uid === uid);
            if (!inst) return;
            inst.marginColor = inst.marginColor === 'BG' ? 'SURFACE' : 'BG';
            renderStackList();
            scheduleRender();
        });
    });

    // Separator toggle
    stackList.querySelectorAll('.margin-sep-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const uid = parseInt(btn.dataset.uid);
            const inst = activeStack.find(i => i.uid === uid);
            if (!inst) return;
            inst.separator = !inst.separator;
            renderStackList();
            scheduleRender();
        });
    });

    updateStackCount();
}

// Drag and drop reordering
function setupStackDragDrop() {
    stackList.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const afterEl = getDragAfterElement(stackList, e.clientY);
        const dragging = stackList.querySelector(".dragging");
        if (!dragging) return;
        // Highlight drop position
        stackList.querySelectorAll('.stack-item.drag-over').forEach(el => el.classList.remove('drag-over'));
        if (afterEl) {
            afterEl.classList.add('drag-over');
            stackList.insertBefore(dragging, afterEl);
        } else {
            stackList.appendChild(dragging);
        }
    });

    stackList.addEventListener("drop", (e) => {
        e.preventDefault();
        // Rebuild activeStack from current DOM order
        const newOrder = [];
        stackList.querySelectorAll('.stack-item').forEach(el => {
            const uid = parseInt(el.dataset.uid);
            const inst = activeStack.find(i => i.uid === uid);
            if (inst) newOrder.push(inst);
        });
        activeStack = newOrder;
        renderStackList();
        scheduleRender();
    });
}

function getDragAfterElement(container, y) {
    const items = [...container.querySelectorAll('.stack-item:not(.dragging)')];
    return items.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function scheduleRender() {
    if (renderTimer) clearTimeout(renderTimer);
    renderTimer = setTimeout(() => renderMjml(), 300);
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
function buildRepeatableMjml(comp, count) {
    const rep = comp.repeatable;
    const perRow = rep.perRow;
    let mjml = rep.headerMjml ? rep.headerMjml + '\n' : '';
    for (let rowStart = 1; rowStart <= count; rowStart += perRow) {
        const rowEnd = Math.min(rowStart + perRow - 1, count);
        mjml += `    <mj-section ${rep.sectionAttrs}>\n`;
        for (let i = rowStart; i <= rowEnd; i++) {
            mjml += rep.itemFn(i) + '\n';
            if (rep.gapColumn && i < rowEnd) {
                mjml += '      ' + rep.gapColumn + '\n';
            }
        }
        mjml += `    </mj-section>\n`;
    }
    return mjml;
}

function getMjmlForInstance(inst) {
    const comp = COMPONENTS.find(c => c.id === inst.componentId);
    if (!comp) return '';
    if (comp.repeatable) {
        const count = inst.repeatCount || comp.repeatable.baseCount;
        if (count !== comp.repeatable.baseCount || comp.repeatable.headerMjml) {
            return buildRepeatableMjml(comp, count);
        }
    }
    return comp.mjml;
}

function buildMjml() {
    let head = MJML_HEAD;
    let body = "";
    activeStack.forEach((inst) => {
        const mColor = `%%${inst.marginColor || 'BG'}%%`;
        if (inst.marginTop > 0) {
            body += `    <mj-section background-color="${mColor}" padding="0"><mj-column><mj-spacer height="${inst.marginTop}px" /></mj-column></mj-section>\n`;
        }
        body += getMjmlForInstance(inst) + "\n";
        if (inst.marginBottom > 0) {
            body += `    <mj-section background-color="${mColor}" padding="0"><mj-column><mj-spacer height="${inst.marginBottom}px" /></mj-column></mj-section>\n`;
        }
        if (inst.separator) {
            body += `    <mj-section background-color="%%SURFACE%%" padding="0 24px"><mj-column><mj-divider border-width="1px" border-color="%%BORDER%%" padding="0" /></mj-column></mj-section>\n`;
        }
    });

    let full = `<mjml>\n${head}\n  <mj-body background-color="%%BG%%">\n${body}\n  </mj-body>\n</mjml>`;
    Object.keys(currentTokens).forEach(k => {
        full = full.replace(new RegExp(`%%${k}%%`, "g"), currentTokens[k]);
    });

    // Apply text overrides
    Object.keys(textOverrides).forEach(k => {
        if (k.startsWith('__idx_')) return;
        full = full.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), textOverrides[k]);
    });

    buildMjmlTextMap(full);

    const indexOverrides = Object.keys(textOverrides)
        .filter(k => k.startsWith('__idx_'))
        .map(k => ({ key: k, idx: parseInt(k.replace('__idx_', '')) }));

    if (indexOverrides.length > 0) {
        const entriesToReplace = indexOverrides
            .map(o => {
                const entry = mjmlTextMap.find(e => e.index === o.idx);
                if (!entry) return null;
                return { ...entry, newText: textOverrides[o.key] };
            })
            .filter(Boolean)
            .sort((a, b) => b.offset - a.offset);

        for (const entry of entriesToReplace) {
            const tagMatch = entry.fullMatch.match(/^(<(?:mj-text|mj-button)[^>]*>)([\s\S]*?)(<\/(?:mj-text|mj-button)>)$/);
            if (tagMatch) {
                const newFull = tagMatch[1] + entry.newText + tagMatch[3];
                full = full.substring(0, entry.offset) + newFull + full.substring(entry.offset + entry.fullMatch.length);
            }
        }
    }

    // Clean unused mj-class definitions
    const usedClasses = new Set();
    const classRegex = /mj-class="([^"]+)"/g;
    let m;
    while ((m = classRegex.exec(body)) !== null) {
        m[1].split(/\s+/).forEach(cls => usedClasses.add(cls));
    }
    const allClassDefs = head.match(/<mj-class\s+name="[^"]*"[^/]*\/>/g) || [];
    allClassDefs.forEach(def => {
        const nameMatch = def.match(/name="([^"]+)"/);
        if (nameMatch && !usedClasses.has(nameMatch[1])) {
            full = full.replace(def, "");
        }
    });

    full = full.replace(/\n{3,}/g, "\n\n");
    return full;
}

// ================================================================
// Render via MJML API
// ================================================================
async function renderMjml() {
    if (activeStack.length === 0) {
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

        showTab(activeTab);
        previewEmpty.style.display = "none";
        previewFrameW.style.display = (activeTab === "preview") ? "block" : "none";
        previewIframe.srcdoc = renderedHtml;

        const previewContent = previewFrameW.parentElement;
        if (previewContent) previewContent.style.setProperty("--email-bg", currentTokens.BG);

        previewIframe.onload = () => {
            try {
                const doc = previewIframe.contentDocument;
                const h = doc.documentElement.scrollHeight;
                previewIframe.style.height = h + "px";
            } catch (e) {
                previewIframe.style.height = "3000px";
            }
            setupIframeEditing();
        };

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
    setTimeout(() => {
        try {
            const doc = previewIframe.contentDocument;
            if (doc) {
                const h = doc.documentElement.scrollHeight;
                previewIframe.style.height = h + "px";
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
        const palette = $("extracted-palette");
        const swatches = $("extracted-swatches");
        palette.style.display = "block";
        swatches.innerHTML = topColors.map(c => `<div class="extracted-swatch" style="background:${c}" title="${c}" data-color="${c}"></div>`).join("");
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

    const lum = hex => {
        const c = hex.replace("#", "");
        const r = parseInt(c.substr(0, 2), 16) / 255;
        const g = parseInt(c.substr(2, 2), 16) / 255;
        const b = parseInt(c.substr(4, 2), 16) / 255;
        return 0.299 * r + 0.587 * g + 0.114 * b;
    };

    const sorted = [...colors].sort((a, b) => lum(a) - lum(b));
    const darkest = sorted[0];
    const mid = sorted[Math.floor(sorted.length / 2)];

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
// Copy / Toast / Download
// ================================================================
function copyText(text, label) {
    navigator.clipboard.writeText(text).then(() => toast(`\ud83d\udccb ${label} copied!`, "success")).catch(() => toast("Copy failed", "error"));
}

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
    $("btn-clear-stack").addEventListener("click", () => {
        activeStack = [];
        renderStackList();
        updateStackCount();
        scheduleRender();
        toast("Stack cleared", "success");
    });

    // Tabs
    document.querySelectorAll(".tab-btn").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));

    // Viewport
    document.querySelectorAll(".vp-btn").forEach(b => b.addEventListener("click", () => setViewport(parseInt(b.dataset.width))));

    // Search
    $("search-input").addEventListener("input", e => renderComponentLibrary(e.target.value));

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
                if (editMode) setupIframeEditing();
                else disableIframeEditing();
            }
        });
    }

    if (resetEditsBtn) {
        resetEditsBtn.addEventListener("click", () => {
            textOverrides = {};
            toast("🔄 All text edits reset", "success");
            scheduleRender();
        });
    }

    // Setup drag-and-drop on stack
    setupStackDragDrop();
}

// ================================================================
// Inline Text Editing
// ================================================================
let mjmlTextMap = [];

function buildMjmlTextMap(mjmlSource) {
    mjmlTextMap = [];
    const textReg = /<mj-text[^>]*>([\s\S]*?)<\/mj-text>/g;
    let m, idx = 0;
    while ((m = textReg.exec(mjmlSource)) !== null) {
        mjmlTextMap.push({ index: idx, originalText: m[1], fullMatch: m[0], offset: m.index });
        idx++;
    }
    const btnReg = /<mj-button[^>]*>([\s\S]*?)<\/mj-button>/g;
    while ((m = btnReg.exec(mjmlSource)) !== null) {
        mjmlTextMap.push({ index: idx, originalText: m[1], fullMatch: m[0], offset: m.index });
        idx++;
    }
    mjmlTextMap.sort((a, b) => a.offset - b.offset);
    mjmlTextMap.forEach((entry, i) => entry.index = i);
}

function setupIframeEditing() {
    try {
        const doc = previewIframe.contentDocument;
        if (!doc || !doc.body) return;

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

        const allTextEls = [];
        doc.body.querySelectorAll('td > div').forEach(div => {
            const text = div.textContent.trim();
            if (text && !div.querySelector('table')) allTextEls.push(div);
        });
        doc.body.querySelectorAll('td a[href]').forEach(a => {
            const text = a.textContent.trim();
            if (text) allTextEls.push(a);
        });

        const usedElements = new Set();
        const usedMapEntries = new Set();

        for (const entry of mjmlTextMap) {
            let entryText = entry.originalText.trim();
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

        const unmatchedEntries = mjmlTextMap.filter(e => !usedMapEntries.has(e.index));
        const unmatchedEls = allTextEls.filter(e => !usedElements.has(e));
        for (let i = 0; i < Math.min(unmatchedEntries.length, unmatchedEls.length); i++) {
            unmatchedEls[i].setAttribute('data-edit-idx', unmatchedEntries[i].index);
            unmatchedEls[i].contentEditable = editMode ? 'true' : 'false';
        }

        if (editMode) {
            let syncTimer = null;
            doc.body.addEventListener('input', (e) => {
                const el = e.target.closest('[data-edit-idx]');
                if (!el) return;
                const idx = parseInt(el.getAttribute('data-edit-idx'));
                textOverrides[`__idx_${idx}`] = el.innerHTML;
                if (syncTimer) clearTimeout(syncTimer);
                syncTimer = setTimeout(() => syncEditToSource(), 400);
            });

            doc.body.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    const el = e.target.closest('[data-edit-idx]');
                    if (el) {
                        e.preventDefault();
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

function syncEditToSource() {
    renderedMjml = buildMjml();
    mjmlCode.textContent = renderedMjml;
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

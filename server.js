const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const mjml2html = require("mjml");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.static(path.join(__dirname)));

// Local MJML rendering — no external API, ~10x faster
app.post("/api/render", async (req, res) => {
    try {
        const { mjml } = req.body;
        if (!mjml) return res.status(400).json({ error: "mjml is required" });

        const start = Date.now();
        const result = mjml2html(mjml, {
            keepComments: false,
            beautify: false,
            validationLevel: "soft"
        });
        const elapsed = Date.now() - start;

        console.log(`Rendered in ${elapsed}ms`);

        res.json({
            html: result.html,
            errors: result.errors || [],
            renderTime: elapsed
        });
    } catch (err) {
        console.error("MJML render error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Proxy endpoint for color extraction
app.post("/api/extract-colors", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "url is required" });

        const resp = await fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; ColorExtractor/1.0)" }
        });
        const html = await resp.text();

        // Extract colors
        const colorRegex = /#([0-9a-fA-F]{6})\b/g;
        const rgbRegex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g;
        const colors = new Set();

        let m;
        while ((m = colorRegex.exec(html)) !== null) colors.add(m[0].toLowerCase());
        while ((m = rgbRegex.exec(html)) !== null) {
            const hex = "#" + [m[1], m[2], m[3]].map(v => parseInt(v).toString(16).padStart(2, "0")).join("");
            colors.add(hex.toLowerCase());
        }

        const boring = new Set(["#000000", "#ffffff", "#333333", "#666666", "#999999", "#cccccc", "#f5f5f5", "#eeeeee", "#dddddd"]);
        const filtered = [...colors].filter(c => !boring.has(c));

        res.json({ colors: filtered.slice(0, 20) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`MJML Email Builder running at http://localhost:${PORT}`));

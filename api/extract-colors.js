module.exports = async (req, res) => {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    try {
        const { url } = req.body || {};
        if (!url) return res.status(400).json({ error: "url is required" });

        // Use native fetch (Node 18+ on Vercel)
        const resp = await fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; ColorExtractor/1.0)" }
        });
        const html = await resp.text();

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

        return res.status(200).json({ colors: filtered.slice(0, 20) });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const mjml2html = require("mjml");

module.exports = (req, res) => {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    try {
        const { mjml } = req.body || {};
        if (!mjml) return res.status(400).json({ error: "mjml is required" });

        const start = Date.now();
        const result = mjml2html(mjml, {
            keepComments: false,
            beautify: false,
            validationLevel: "soft"
        });
        const elapsed = Date.now() - start;

        return res.status(200).json({
            html: result.html,
            errors: result.errors || [],
            renderTime: elapsed
        });
    } catch (err) {
        console.error("MJML render error:", err);
        return res.status(500).json({ error: err.message });
    }
};

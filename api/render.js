const mjml2html = require("mjml");

module.exports = (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

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

        res.json({
            html: result.html,
            errors: result.errors || [],
            renderTime: elapsed
        });
    } catch (err) {
        console.error("MJML render error:", err);
        res.status(500).json({ error: err.message });
    }
};

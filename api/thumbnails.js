const mjml2html = require("mjml");

module.exports = (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { items } = req.body;
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: "items array is required" });
        }

        const start = Date.now();
        const results = {};
        for (const item of items) {
            try {
                const result = mjml2html(item.mjml, {
                    keepComments: false,
                    beautify: false,
                    validationLevel: "skip"
                });
                results[item.id] = result.html;
            } catch (e) {
                results[item.id] = null;
            }
        }
        const elapsed = Date.now() - start;
        res.json({ thumbnails: results, renderTime: elapsed });
    } catch (err) {
        console.error("Thumbnail render error:", err);
        res.status(500).json({ error: err.message });
    }
};

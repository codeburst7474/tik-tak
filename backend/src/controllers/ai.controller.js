const aiService = require('../services/ai.service');

module.exports = async (req, res) => {
    const code = req.body.code || req.body.prompt;
    console.log("Received code for review:", code ? code.substring(0, 50) + "..." : "EMPTY");

    if (!code) {
        return res.status(400).json({
            success: false,
            message: "The code is required in the request body.",
        });
    }

    try {
        const review = await aiService.generateContent(code);
        res.json({
            success: true,
            review,
        });
    } catch (error) {
        console.error("AI Controller Error:", error);
        res.status(500).json({
            success: false,
            message: "AI Error: " + (error.message || "Unknown error"),
        });
    }
};

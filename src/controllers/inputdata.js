const Input = require('../model/inputmode');

async function inputdata(req, res) {
    console.log("POST /api/createinput called with body:", req.body);
    try {
        const data = req.body;
        const input = new Input(data);
        await input.save();
        console.log("Task saved successfully:", input);
        res.status(201).json(input);
    } catch (error) {
        console.error("Error in inputdata:", error);
        res.status(500).json({ error: "Failed to create input" });
    }
}

module.exports = inputdata;
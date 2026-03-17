const Input = require('../model/inputmode');

async function updatedata(req, res) {
    try {
        const { id } = req.params;
        const update = req.body;
        
        // { new: true } returns the document AFTER the update is applied
        const result = await Input.findByIdAndUpdate(id, update, { new: true });
        
        if (!result) {
            return res.status(404).json({ error: "Item not found" });
        }
        
        res.json({ message: "Updated successfully", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = updatedata;

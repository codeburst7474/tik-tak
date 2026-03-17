const Input = require('../model/inputmode');

async function deletedata(req, res) {
    try {
        const { id } = req.params;
        
        const result = await Input.findByIdAndDelete(id);
        
        if (!result) {
            return res.status(404).json({ error: "Item not found" });
        }
        
        res.json({ message: "Deleted successfully", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = deletedata;

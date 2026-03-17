const Input = require('../model/inputmode');

async function getdata(req, res) {
    try {
        const data = await Input.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = getdata;
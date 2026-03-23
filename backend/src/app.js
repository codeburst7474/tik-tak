const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const airoutes = require('./routes/ai.routes');

// Middleware
app.use(cors()); // Allows your frontend to talk to this backend
app.use(morgan('dev')); // Logs every request in your console
app.use(express.json({ limit: '10mb' })); // Parses JSON bodies, supports large code payloads

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to the Code Review AI API!");
});

app.use('/ai', airoutes);

module.exports = app;

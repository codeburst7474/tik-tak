const express = require('express');
const app = express();
const createinput = require('./src/routes/createinput');
const getdata = require('./src/routes/getdata');
const updatedata = require('./src/routes/updatedata');
const deletedata = require('./src/routes/deletedata');

const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', createinput);
app.use('/api', getdata);
app.use('/api', updatedata);
app.use('/api', deletedata);

module.exports = app;




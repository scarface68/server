const express = require('express');
const cors = require('cors');
const db = require('./db');
const apiRouter = require('./api');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.listen(5000 || process.env.PORT, () => console.log('Server started on port 5000'));
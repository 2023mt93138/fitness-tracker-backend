require('dotenv').config();

const cors = require('cors');
const express = require('express');
const routes = require('./routes/index.route');
require('./utils/db.util');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/v1', routes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})

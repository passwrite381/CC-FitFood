require('dotenv').config();
const express = require('express');
const app = express();
const routesCC = require('./routes/routesCC.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routesCC);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
});

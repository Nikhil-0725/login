const express = require('express');
const bodyParser = require('body-parser');
const LoginRouter = require('./src/routes/login.routes');
const db_connection = require('./src/config/db.config');

const app = express();
app.use(bodyParser.json());

app.use(LoginRouter);

app.listen(3000, async () => {
    console.log("Server is listening on port 3000");
    await db_connection();
});
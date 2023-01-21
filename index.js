const express = require('express');
const cors = require('cors');
const app = express();

const { connection } = require('./config/db');
const { UserRouter } = require('./Routes/User.routes');

app.use(express.json());
app.use(cors());
app.use('/user', UserRouter)


app.listen(8080, async () => {
    try {
        await connection;
        console.log({ "message": "Connected to Grow Calculator DataBase" })

    } catch (error) {
        console.log(error);
        console.log({ "message": "Couldnt Connect to Grow Calculator DataBase" })
    }
})
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const dotenv = require("dotenv").config();

const database = require("./config/database");

const cors = require('cors')

const port = 4000;

const userRoutes = require('./routes/userRoute');

const showRoutes = require('./routes/showRoute');

const errorMiddleware = require('./middleware/error')

database();

const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true
}

app.use(cors(corsOption))


app.use(bodyParser.json());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hi there');
});

app.use('/api/users', userRoutes)

app.use('/api/shows', showRoutes);

app.use(errorMiddleware)


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})
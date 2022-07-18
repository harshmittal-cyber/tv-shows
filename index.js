const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;

app.use(bodyParser.json());
app.use(express.json());




app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})
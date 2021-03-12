import express from 'express'
import dotenv from 'dotenv'
import bodyParser from "body-parser";

dotenv.config(); // load a .env file if it exists, override process.env values

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

app.get('/online', (req, res) => {
    res.send('YouberEats API is online');
});

app.post('/slack-events', (req, res) => {
    // TODO: get the challenge value
    console.log(req.body);
    res.send(req.body.challenge);
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/online`);
});


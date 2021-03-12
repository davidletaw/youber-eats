import express from 'express'
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import axios from 'axios';


dotenv.config(); // load a .env file if it exists, sets/override process.env values

const port = process.env.PORT || 8080;
const app = express();

const incomingWebhookUrl = process.env.BOT_SLACK_WEBHOOK_URL;

app.use(bodyParser.json());

app.get('/online', (req, res) => {
    res.send('YouberEats API is online');
});

app.post('/slack-events', (req, res) => {
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/online`);
});


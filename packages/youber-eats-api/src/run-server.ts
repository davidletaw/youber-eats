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
    // filter down to the specific event we want
    const { event } = req.body;

    // Ignore events other than message
    if (event.type !== 'message') {
        res.sendStatus(200)
        return;
    }

    if (event.subtype === 'bot_message') {
        res.sendStatus(200)
        return;
    }

    // send a message back

    //TODO: if the user says "feed me", set a response, anything else, send an error back
    if (event.text.toLowerCase() === 'feed me') {
        axios.post(incomingWebhookUrl, {
            text: "you got it"
        });
    } else {
        axios.post(incomingWebhookUrl, {
            text: "Sorry, can't help ya"
        });
    }

    res.sendStatus(200)
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/online`);
});


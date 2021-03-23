import express from 'express'
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import axios from 'axios';

// load a .env file if it exists. Sets/override process.env values
dotenv.config();

const incomingWebhookUrl = process.env.BOT_SLACK_WEBHOOK_URL;
const port = process.env.PORT || 8080;

// Validate our config variable(s)
if (!incomingWebhookUrl) {
    // If the webhook url is not provided, let the user know, and exit (with an error code, 1)
    // Tip: We use the specific variable name to make it easy for the user to fix
    console.error('The env variable BOT_SLACK_WEBHOOK_URL cannot be blank.');
    process.exit(1);
}

// Tip: TypeScript now knows that incomingWebhookUrl is a string and no longer "string | undefined"
// See https://www.typescriptlang.org/docs/handbook/2/narrowing.html

const app = express();

app.use(bodyParser.json());

app.get('/online', (req, res) => {
    res.send('YouberEats API is online');
});

app.post('/slack-events', (req, res) => {

    if (!req.body.type) {
        // This is some sort of unexpected payload
        res.sendStatus(400); // Bad Request
        return;
    }

    // Handle URL verification
    if (req.body.type === 'url_verification') {
        res.send(req.body.challenge);
        return;
    }

    // Next, ignore anything that's not an event
    if (req.body.type !== 'event_callback' ) {
        res.sendStatus(200); // a 400 would also be reasonable. We're using a 200 since this is semi-expected.
        return;
    }

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


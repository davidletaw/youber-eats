import express from 'express'
import dotenv from 'dotenv'

dotenv.config(); // load a .env file if it exists, override process.env values

const port = process.env.PORT || 8080;
const app = express();

app.get('/online', (req, res) => {
    res.send('YouberEats API is online');
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/online`);
});

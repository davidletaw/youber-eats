# YouberEats

### This is just a personal education project emulating a food ordering service.

## Daily Process
* navigate to project folder
* Run `npm start` which will compile, watch, and run our server
* open browser to http://localhost:8080/online
* Start Slack webhook connection (see section below)

### Slack webhook connection

* start ngrok with `ngrok http 8080` in console.
* [update event subscription URL with Slack](https://api.slack.com/apps) to new ngrok https URL (something like https://a8e9fbf12.ngrok.io/slack-events)
* optionally watch requests on ngrok inspector on http://localhost:4040
* 

### Project Setup 


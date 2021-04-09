const express = require('express');
const expressApp = express();

const { App, ExpressReceiver } = require('@slack/bolt');
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  router: expressApp,
});
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  developerMode: true,
  socketMode: false,
  receiver,
});

app.event('app_mention', async ({ logger, event }) => {
  logger.info(event);
});

const port = process.env.PORT || 3000;

expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});

expressApp.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

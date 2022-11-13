const { App } = require("@slack/bolt");
require("dotenv").config();

const fs = require("fs");
let db = fs.readFileSync("db.json");
let { data } = JSON.parse(db);

const app = new App({
  token: process.env.BOT_USER_OAUTH_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.APP_TOKEN,
  socketMode: true,
});

app.command("/wtf", async ({ command, ack, say }) => {
  try {
    await ack();
    const acronym = data.filter(
      ({ keyword }) => keyword.toLowerCase() === command.text.toLowerCase()
    );

    if (acronym.length > 0) {
      say(acronym[0].definition);
    } else {
      say("No definition found!");
    }
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start(process.env.PORT);
  console.log(`⚡️ Slack app is running on port ${process.env.PORT}!`);
})();

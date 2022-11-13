const { App } = require("@slack/bolt");
require("dotenv").config();

console.log("APP_TOKEN: ", process.env.APP_TOKEN);

const app = new App({
  token: process.env.BOT_USER_OAUTH_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.APP_TOKEN,
  socketMode: true,
});

app.command("/wtf", async ({ command, ack, say }) => {
  try {
    await ack();
    say("Hello World!");
  } catch (error) {
    console.log("error", error);
  }
});

(async () => {
  await app.start(process.env.PORT);
  console.log(`⚡️ Slack Bolt app is running on port ${process.env.PORT}!`);
})();

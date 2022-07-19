const { App } = require('@slack/bolt');
const fetch = require('node-fetch');

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true, // add this
    appToken: process.env.SLACK_APP_TOKEN // add this
});

const { WebClient } = require('@slack/web-api');

// Read a token from the environment variables
const token = process.env.SLACK_BOT_TOKEN;

// Initialize
const web = new WebClient(token);

app.action('plain_text_input-action', async ({ ack, payload, body }) => {
    ack();
    await Promise.all([
        web.chat.postEphemeral({
            channel: body.container.channel_id,
            user: body.user.id,
            text: ":pls-just-work: _Loading..._"
        }),
        fetch('https://api.yodacode.xyz/math/' + encodeURIComponent(payload.value)).then(response => response.text())
    ]);

    web.chat.postEphemeral({
        channel: body.container.channel_id,
        user: body.user.id,
        text: "Here's your image!",
        blocks: [
            {
                "type": "section",
                "block_id": "yWuBr",
                "text": {
                    "type": "mrkdwn",
                    "text": "Here's your image for the problem `" + payload.value.split('@').join('').split('channel').join('').split('here').join('') + "`:\n<https://hackclub.slack.com/archives/C03Q1GCE6JE/p1658223205307919|Solve another?>",
                    "verbatim": false
                }
            },
            {
                "type": "image",
                "block_id": "b++",
                "image_url": 'https://api.yodacode.xyz/math/' + encodeURIComponent(payload.value),
                "alt_text": `Your answer for ${payload.value}`
            }
        ]
    })
    // console.log(payload.value);
});

(async () => {
  // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();
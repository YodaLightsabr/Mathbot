const { WebClient } = require('@slack/web-api');

// Read a token from the environment variables
const token = process.env.SLACK_BOT_TOKEN;

// Initialize
const web = new WebClient(token);

web.chat.postMessage({
	"blocks": [
		{
			"dispatch_action": true,
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "plain_text_input-action"
			},
			"label": {
				"type": "plain_text",
				"text": "Let's crunch some numbers!",
				"emoji": true
			}
		}
	],
    "channel": "C03Q1GCE6JE"
});
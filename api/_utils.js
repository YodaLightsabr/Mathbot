const axios = require('axios');
import { token } from './_constants';

// Tokenizes the string so that commands can be extracted.
export function tokenizeString(string) {
    const array = string.split(" ").filter(element => {
        return element !== ""
    })
    console.log("Tokenized version:", array)
    return array
}

// Posts to a channel with given name with given text/payload.
export async function postToChannel(channel, res, payload) {

    console.log("channel:", channel)
    var channelId = await channelNameToId(channel)

    console.log("ID:", channelId)

    const message = {
        channel: channelId,
        text: payload,
    }

    axios({
        method: 'post',
        url: 'https://slack.com/api/chat.postMessage',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` },
        data: message,
    })
        .then(response => {
            console.log("data from axios:", response.data)
            res.json({ ok: true })
        })
        .catch(err => {
            console.log("axios Error:", err)
            res.send({
                "response_type": "ephemeral",
                "text": `${err.response.data.error}`
            })
        })

}

// Converts the given channel name to channel id since post works with ids.
async function channelNameToId(channelName) {
    var generalId
    var id
    await axios({
        method: 'post',
        url: 'https://slack.com/api/conversations.list',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` },
    })
        .then(response => {
            response.data.channels.forEach(element => {

                if (element.name === channelName) {
                    id = element.id
                    return element.id
                }
                else if(element.name === "general") generalId = element.id
            });

            return generalId
        })
        .catch(err => {
            console.log("axios Error:", err)
        })

        return id
}
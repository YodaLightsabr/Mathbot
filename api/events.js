import { challenge } from './events_handlers/_challenge'
import { validateSlackRequest } from './_validate'
import { signingSecret } from './_constants'

module.exports = async (req, res) => {
    var type = req.body.type

    if (type === "url_verification") {
        await challenge(req, res)
    }
    else if (validateSlackRequest(req, signingSecret)) {
        if (type === "event_callback") {
            var event_type = req.body.event.type

            switch (event_type) {
                default: break;
            }
        }
        else {
            console.log("body:", req.body)
        }
    }
}
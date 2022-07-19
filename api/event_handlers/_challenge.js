export function challenge(req, res) {

    res.status(200).send({
        "challenge": req.body.challenge
    })
}
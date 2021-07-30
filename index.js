// Exampole Echo reply

const express = require('express')
// const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const line = require('@line/bot-sdk')
require('dotenv').config()

const port = process.env.PORT || 8080
const host = '0.0.0.0'

const client = new line.Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

// Body parser
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// Start Routing section
app.get('/', (req, res) => {
	res.send({'status':'OK'})
})

// recieve request from Line
app.post('/webhook', (req, res) => {
    //console.log(req.body);
    let reqBody = req.body;

    let msg = `\n`+
    `Token = ${process.env.CHANNEL_ACCESS_TOKEN}\n` +
    `Port = ${port}\n`
    console.log(msg)

    if(reqBody.events[0] !== undefined ) {
        let replyToken = reqBody.events[0].replyToken
        let msg = reqBody.events[0].message.text

        client.replyMessage(replyToken, msg)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                // error handling
                console.log(err)
            });
    }else{
        console.log(`Webhook verified.`)
        res.sendStatus(200)
    }
    
})
// End Routing section

// Listening
app.listen(port, () => {
    console.log(`Listening at ${host} on port ${port}`);
});
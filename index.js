// Exampole Echo reply

const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 8080
const host = '0.0.0.0'
const secret = process.env.CHANNEL_SECRET

// default request header
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
}

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Start Routing section
app.get('/', (req, res) =>{
    let msg = `Hello`
	res.send(msg)
})

// recieve request from Line
app.post('/webhook', (req, res) => {
    //console.log(req.body);
    let reqBody = req.body;

    let msg = `\n`+
    `Token = ${process.env.CHANNEL_ACCESS_TOKEN}\n` +
    `Port = ${process.env.PORT}\n`
    console.log(msg)

    if(reqBody.events[0] !== undefined ) {
        let reply_token = reqBody.events[0].replyToken
        let msg = reqBody.events[0].message.text
        reply(reply_token, msg)
        res.sendStatus(200)
    }else{
        console.log(`Webhook verify.`)
        res.sendStatus(200)
    }
})
// End Routing section

// Listening
app.listen(port, () => {
    console.log(`Listening at ${host} on port ${port}`);
});

function reply(reply_token, msg) {
	const reply_url = `https://api.line.me/v2/bot/message/reply`;
    
    // Prepare package content
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
	
    // Prepare Axios connection config
    let config = {
		headers: headers,
		body: body
	} 
	
    // Reply
    axios.post(reply_url, config)
		.then((response)=>{
			console.log(response)
		})
		.catch((error)=>{
			console.log(error)
		})
}
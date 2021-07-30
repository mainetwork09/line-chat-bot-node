// Exampole Echo reply

const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 8080
const host = '0.0.0.0'
const secret = process.env.CHANNEL_SECRET
const token = process.env.CHANNEL_ACCESS_TOKEN

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Start Routing section
app.get('/', (req, res) =>{
	res.send(`Hello`)
})

app.post('/webhook', (req, res) => {
    console.log(req.body);
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
    res.sendStatus(200)
})
// End Routing section

// Listening
app.listen(port, () => {
    console.log(`Listening at ${host} on port ${port}`);
});

function reply(reply_token, msg) {
	const reply_url = `https://api.line.me/v2/bot/message/reply`;
    
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    
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
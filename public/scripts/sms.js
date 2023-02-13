require("dotenv").config({path:"../../.env"})

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOK; // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken);


client.messages
  .create({
    body: 'FoodHub: Your food is ready! Thank you for ordering from FoodHub!',
    to: '+12365088180', // Text this number
    from: '+17179540316', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
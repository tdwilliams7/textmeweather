const twilio = require('twilio');
const axios = require('axios');
const schedule = require('node-schedule');
const client = new twilio('key', 'ApiKey');
const weatherURL = "https://api.darksky.net/forecast/DarkskyKey/44.9754800,-93.2696860";

//fixed location in Minneapolis.
const getWeather = () => {
  axios
    .get(weatherURL) //return an array od weath from darksky
    .then(response => {
      let today = response.data.daily.data[0];
      let high = Math.round(today.apparentTemperatureHigh);
      let low = Math.round(today.apparentTemperatureLow);
      let summary = today.summary;
      let message = "Good Morning, today's outlook: " + summary + ' Low of ' + low + '. High of ' + high + '.';
      console.log(message);
      client.messages.create({ //client is twilio.
        to: 'YOUR NUMBER',
        from: 'TWILIO NUMBER',
        body: message
      })
    })
    .catch(error => {
      console.log(error);
    });
}
//node schedule runs if it is 7:30 and 10 seconds in the morning.
schedule.scheduleJob('10 30 7 * * *', function() {
  getWeather();
});

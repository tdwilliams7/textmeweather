const twilio = require('twilio');
const axios = require('axios');
const schedule = require('node-schedule');
const client = new twilio('AC2251f514b4afb18ab44d23409de9a950', '4854ff3befdd2fd60367fdf07d3280de');
const weatherURL = "https://api.darksky.net/forecast/391d7c57b9412748b10093f94c3aac8e/44.9754800,-93.2696860";

//fixed location in Minneapolis.
const getWeather = () => {
  axios
    .get(weatherURL) //return an array of weather from darksky
    .then(response => {
      let today = response.data.daily.data[0];
      let high = Math.round(today.apparentTemperatureHigh);
      let low = Math.round(today.apparentTemperatureLow);
      let summary = today.summary;
      let message = `Good Morning, today's outlook: ${summary} Low of ${low}. High of ${high}.`;
      console.log(message);
      client.messages.create({ //client is twilio.
        to: '+15074699316',
        from: '+15076077627',
        body: message
      })
    })
    .catch(error => {
      console.log(error);
    });
}
getWeather();

//node schedule runs if it is 7:30 and 10 seconds in the morning.
// schedule.scheduleJob('10 40 7 * * *', function() {
//   getWeather();
// });

import _ from "lodash";

const apikey = "67871d6b5b9073ba9f0510b5c8d48797";
let rootUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=" + apikey;
const kelvinToC = (kelvin) => {
    return Math.round(kelvin - 273.15) + " ˚C";
};

export default  (lat, lon) => {
    let url = `${rootUrl}&lat=${lat}&lon=${lon}`;
    return fetch(url)
    .then(function(res){
      return res.json();
    })
    .then((json) => {
      return {
        city: _.capitalize(json.name),
        temperature: kelvinToC(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      };
    });

};

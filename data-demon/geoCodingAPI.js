const IP_API_KEY = '';
const CITY_API_KEY = '';

const getLocationFromIp = (ip) => {
    let url = 'https://api.ipgeolocation.io/ipgeo?apiKey=' + IP_API_KEY + '&ip=107.171.241.34';
  
    fetch(url).then(res => {
      if (res.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + res.status);
        return;
      }
  
      // Examine the text in the response
      res.json().then(data => {
        console.log(data);
        const toReturn = {
            latitude: data.latitude,
            longitude: data.longitude,
            city: data.city,
            state: data.state_prov,
            state_abrv: null,
            country: data.country_name,
            time_zone: data.time_zone
        };
        return toReturn;
      });
    });
}

const getLocationFromAddress = (cityName) => {
    let url = 'http://api.positionstack.com/v1/forward?access_key=' + CITY_API_KEY + '&query=' + cityName + '&timezone_module = 1';

    fetch(url).then(res => {
        if (res.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + res.status);
            return;
          }
      
          // Examine the text in the response
          res.json().then(data => {
            console.log(data);
            const toReturn = {
                latitude: data.latitude,
                longitude: data.longitude,
                city: city,
                state: data.region,
                state_abrv: data.region_code,
                country: data.country,
                time_zone: data.timezone_module.name
            };
            return toReturn;
          });
    });
};

export default {getLocationFromIp, getLocationFromAddress};
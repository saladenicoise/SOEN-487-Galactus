const IP_API_KEY = '326730ba1d4149759691b05c236207aa';
const CITY_API_KEY = '119dc3a311b1faa4ed064d95a49c9d39';

const getLocationFromIp = async (ip) => {
    let url = 'https://api.ipgeolocation.io/ipgeo?apiKey=' + IP_API_KEY + '&ip='+ip;

    return fetch(url).then((response) => response.json()).then((locationData) => {
      const toReturn = {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        city: locationData.city,
        state: locationData.state_prov,
        state_abrv: null,
        country: locationData.country_name,
        time_zone: locationData.time_zone.name,
      };
      return toReturn;
    }).catch((error) => {
      console.log(error);
      return;
    });

}

const getLocationFromAddress = (cityName) => {
  let url = 'http://api.positionstack.com/v1/forward?access_key=' + CITY_API_KEY + '&query=' + cityName + '&timezone_module=1';

  return fetch(url).then((response) => response.json()).then((data) => {
    const toReturn = {
      latitude: data.data[0].latitude,
      longitude: data.data[0].longitude,
      city: data.data[0].name,
      state: data.data[0].region,
      state_abrv: data.data[0].region_code,
      country: data.data[0].country,
      time_zone: null,
    };
    return toReturn;
  }).catch((error) => {
    console.log(error);
    return;
  });
};

module.exports = {getLocationFromIp, getLocationFromAddress};
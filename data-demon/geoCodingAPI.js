const IP_API_KEY = '';
const CITY_API_KEY = '';

const getLocationFromIp = async (ip) => {
    let url = 'https://api.ipgeolocation.io/ipgeo?apiKey=' + IP_API_KEY + '&ip='+ip;
  
    const apiCall = await fetch(url);

    if (!apiCall.ok) {
      const message = `An error has occured: ${apiCall.status}`;
      console.log(message);
      return;
    }

    const locationData = await apiCall.json();
    console.log(JSON.stringify(locationData));
    const toReturn = {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      city: locationData.city,
      state: locationData.state_prov,
      state_abrv: null,
      country: locationData.country_name,
      time_zone: locationData.time_zone.name,
    };
    console.log("Now Returning: " + JSON.stringify(toReturn))
    return toReturn;
}

const getLocationFromAddress = async (cityName) => {
    let url = 'http://api.positionstack.com/v1/forward?access_key=' + CITY_API_KEY + '&query=' + cityName + '&timezone_module=1';
    const apiCall = await fetch(url);
    if (!apiCall.ok) {
      const message = `An error has occured: ${apiCall.status}`;
      console.log(message);
      return;
    }
    
    const locationData = await apiCall.json();
    const toReturn = {
      latitude: locationData.data[0].latitude,
      longitude: locationData.data[0].longitude,
      city: locationData.data[0].name,
      state: locationData.data[0].region,
      state_abrv: locationData.data[0].region_code,
      country: locationData.data[0].country,
      time_zone: null,
    };
    console.log("Now Returning: " + JSON.stringify(toReturn))
    return toReturn;
};

module.exports = {getLocationFromIp, getLocationFromAddress};
function parsingResponseData(res) {
    let data = res.data
    let arr = []
    Object.keys(data).map((key) => {
        if (data[key].isAlert) {
            let cityStr = data[key].city
            if (!arr.some((x) => x === cityStr))
                arr.push(cityStr);
        }
    })
    console.table(arr);
    console.log('logging getCitiesAlerts', arr);
    return arr;
}

module.exports = function (axios) {
    console.log('calling getCitiesAlerts');
    let promise = axios.get('https://galactus-eaece-default-rtdb.firebaseio.com/Cities.json')
    let finalPromise = promise.then((res) => parsingResponseData(res))
    return finalPromise;


}

// RES.DATA FORMAT
// {
//     '5c1qAynDRANgzmjZPtD0464KbQQ2': {
//       city: 'Montreal',
//       isAlert: true,
//       isNotification: false,
//       notificationSchedule: '03:12'
//     },
//     amJNnvgQZ9XIuQ8rFREbcSjg9xv1: {
//       city: 'Montreal',
//       isAlert: true,
//       isNotification: false,
//       notificationSchedule: '13:00'
//     }
//   }

// // create a promise for the axios request
// const promise = axios.get(url)

// // using .then, create a new promise which extracts the data
// const dataPromise = promise.then((response) => response.data)

// // return it
// return dataPromise
// }
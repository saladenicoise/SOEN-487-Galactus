module.exports = async function (axios) {
    console.log('calling getCitiesSchedulesNotifications');
    try {
        let res = await axios.get('https://galactus-eaece-default-rtdb.firebaseio.com/Cities.json')
        let data = res.data
        let arr = []
        Object.keys(data).map((key) => {
            if (data[key].isNotification) {
                let cityObj = {
                    location: data[key].city,
                    schedule: data[key].notificationSchedule
                };
                // do not add duplicate location-schedule pairs
                if (!arr.some((x) => x.location === cityObj.location && x.schedule === cityObj.schedule ))
                    arr.push(cityObj);
            }
        })
        console.table(arr);
        console.log(arr);
        return arr;
    }
    catch (err) {
        console.error(err);
        return err;
    }
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

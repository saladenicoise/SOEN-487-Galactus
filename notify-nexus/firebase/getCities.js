module.exports = async function (axios) {
    console.log('calling getCities');
    try {
         let res = await axios.get('https://galactus-eaece-default-rtdb.firebaseio.com/Cities.json')
         console.log(res.data);
         return res.data;
    }
    catch (err) {
        console.error(err);
        return err;
    }
}
// DATA FORMAT
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
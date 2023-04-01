const express = require('express');
const app = express();

const PushNotifications = require('@pusher/push-notifications-server');

let pushNotifications = new PushNotifications({
  instanceId: 'YOUR_INSTANCE_ID_HERE',
  secretKey: 'YOUR_SECRET_KEY_HERE'
});

// Middleware
app.use(express.json());

// Routes
// app.get('/', (req, res) => {
//   res.send('Data Demon');
// });

// app.get('/notify-test', (req, res) => {
//   pushNotifications.publishToInterests(['hello'], {
//     apns: {
//       aps: {
//         alert: 'Hello!'
//       }
//     },
//     fcm: {
//       notification: {
//         title: 'Hello',
//         body: 'Hello, world!'
//       }
//     }
//   }).then((publishResponse) => {
//     console.log('Just published:', publishResponse.publishId);
//   }).catch((error) => {
//     console.log('Error:', error);
//   });
//   res.status(200);
// })

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Data Demon Server started on port ${port}`);
});
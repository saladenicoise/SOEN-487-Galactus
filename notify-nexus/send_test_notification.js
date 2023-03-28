const PushNotifications = require("@pusher/push-notifications-server");

let beamsClient = new PushNotifications({
  instanceId: "b5d262e1-0b5e-40f0-b3ac-0ccab70181bb",
  secretKey: "6DC3CD49E3C398E3772E20582B795A620D40A296648C31C0707A60B85D3FC20E",
});

beamsClient
  .publishToInterests(["test_interest"], {
    web: {
      notification: {
        title: "Hello",
        body: "Hello, world!",
        deep_link: "https://www.pusher.com",
      },
    },
  })
  .then((publishResponse) => {
    console.log("Just published:", publishResponse.publishId);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
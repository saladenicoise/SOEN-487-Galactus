## How to run Notify Nexus
run the express server
- In notify-nexus, run the server to start up the scheduler
  ```bash
  cd notify-nexus
  # in developement
  npm run live-reload

  # in production
  npm start
  ```

## Manually test the feature as a user
To simulate a user of the Galactus app who subscribes to weather alerts or scheduled notifications, we need to run the data-demon service (server and 2 consumer runscripts), the notify-nexus service (server and 2 consumer runscripts), and the sky-siren (web UI).
- Run the Web UI on [localhost:5173](http://localhost:5173/) using the command `npm run dev` after `cd sky-siren`
- Follow the previous instructions to run the Notification service.
- Sign up or sign in.
- Go to the [Preferences page](http://localhost:5173/preferences) and select to subscribe to 'Weather alerts' (alert microservice) or/and 'Notification alerts'(scheduled notification microservice). 
- For either option, Select a city.
- If you selected daily notification, select a time.
- **Click Update** to start getting notifications.
- If you are subscribed to alerts, you will receive weather alerts for your chosen city whenever a severe weather event occurs (ex. Snow Storm, Icy Rain). For the demo-ing purpose, if no alerts is found for your chosen city, you will receive a Stub Alert every <INTERVAL> seconds, depending the frequency the scheduler is polling.
- If you are subscribed to scheduled notification, every day, you will receive the current weather for your chosen location at the time you selected.
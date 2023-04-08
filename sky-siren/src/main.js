import { createApp } from 'vue'
import { loadScript } from 'vue-plugin-load-script'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'


const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')

// necessary for the Notification service to work
// please don't delete this. not again.
loadScript("https://js.pusher.com/beams/1.0/push-notifications-cdn.js")
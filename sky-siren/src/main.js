import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { loadScript } from 'vue-plugin-load-script'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// this line is necessary for notify-nexus (see /notify-nexus/README)
loadScript("https://js.pusher.com/beams/1.0/push-notifications-cdn.js")

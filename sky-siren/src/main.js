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

// this line is necessary for notify-nexus
// src: https://stackoverflow.com/questions/45047126/how-to-add-external-js-scripts-to-vuejs-components
loadScript("https://js.pusher.com/beams/1.0/push-notifications-cdn.js")

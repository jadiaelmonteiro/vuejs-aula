import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import routers from './routers/intex'

createApp(App)
    .use(routers)
    .mount('#app')

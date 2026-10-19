import { createApp } from 'vue'
import LenisVue from 'lenis/vue'

import './css/style.scss'

import 'lenis/dist/lenis.css'

import App from './App.vue'

import { instance } from './boot/i18n.ts'

const app = createApp(App)

app.use(instance)

app.use(LenisVue)

app.mount('#app')

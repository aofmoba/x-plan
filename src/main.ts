import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store, { key } from './store'
import './index.css' 
import api from './api/request'

const app = createApp(App) 
app.config.globalProperties.$api = api;
app.use(router) 
app.use(store, key) 
app.mount('#app')

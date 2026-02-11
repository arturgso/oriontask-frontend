import { createApp } from 'vue';
import './style.css';
import App from '@/App.vue';
import router from '@/router';
import 'vue3-toastify/dist/index.css';
import Vue3Toastify from 'vue3-toastify';
import {createPinia} from 'pinia';

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(Vue3Toastify, {
        autoClose: 1500,
    })
    .use(pinia)
    .mount('#app');

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import OptionsPage from './OptionsPage.vue';

const app = createApp(OptionsPage);

app.use(createPinia());
app.mount('#app');
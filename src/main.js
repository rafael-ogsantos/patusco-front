import { BButton, BFormGroup, BFormInput, BFormSelect, BModal, BootstrapVueNext, BTable, BToast } from 'bootstrap-vue-next';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(router);
app.use(store);

app.use(BootstrapVueNext);

app.component('b-form-group', BFormGroup);
app.component('b-form-input', BFormInput);
app.component('b-button', BButton);
app.component('b-table', BTable);
app.component('b-form-select', BFormSelect);
app.component('b-modal', BModal);
app.component('b-toast', BToast);

app.mount('#app');

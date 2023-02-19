import { createApp, provide } from 'vue'
import BaseLoading from '../src/components/base/BaseLoading.vue'
import BaseToast from '../src/components/base/BaseToast.vue'
import BaseDialog from '../src/components/base/BaseDialog.vue'
import BaseButton from '../src/components/base/BaseButton.vue'
import BaseCombobox from '../src/components/base/BaseCombobox.vue'
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import App from './App.vue'
import store from "./store"
const app = createApp(App);


app.provide("store", store)
app.component("BaseLoading",BaseLoading);
app.component("BaseToast", BaseToast);
app.component("BaseDialog", BaseDialog);
app.component("BaseButton", BaseButton);
app.component("BaseCombobox", BaseCombobox);
app.component('DatePicker', DatePicker);
app.mount('#app');


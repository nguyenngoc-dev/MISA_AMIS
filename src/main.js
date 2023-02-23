import { createApp, provide } from 'vue'
import router from './router'
import BaseLoading from '../src/components/base/BaseLoading.vue'
import BaseToast from '../src/components/base/BaseToast.vue'
import BaseDialog from '../src/components/base/BaseDialog.vue'
import BaseButton from '../src/components/base/BaseButton.vue'
import BaseCombobox from '../src/components/base/BaseCombobox.vue'
import { vue3Debounce } from "vue-debounce";
import App from './App.vue'
import store from "./store"
const app = createApp(App);


app.provide("store", store)
app.component("BaseLoading",BaseLoading);
app.component("BaseToast", BaseToast);
app.component("BaseDialog", BaseDialog);
app.component("BaseButton", BaseButton);
app.component("BaseCombobox", BaseCombobox);
app.directive("debounce", vue3Debounce({ lock: true }));
app.use(router).mount('#app');


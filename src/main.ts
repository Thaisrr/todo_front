import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from "./store/index";
import setIntercepter from "./resource/index";

Vue.config.productionTip = false;
setIntercepter();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

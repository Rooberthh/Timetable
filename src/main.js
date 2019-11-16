import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./main.css";

Vue.config.productionTip = false
// Global Mixin
Vue.mixin({
  methods: {
    getGatewayUrl() {
      return process.env.VUE_APP_GATEWAY;
    },
    /**
     * @return {string}
     */
    Truncate(str, max, separator = ' ') {
        if(str.length < max) {
          return str;
        }

        return str.substr(0, str.lastIndexOf(separator, max)) + '...';
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

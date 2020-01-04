import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./main.css"
import VModal from 'vue-js-modal'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret, faEdit, faTrash, faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);
//Global Event Bus
window.events = new Vue();

window.flash = function(message, level = "default") {
    window.events.$emit('flash', {message, level});
};

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

Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: true } });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

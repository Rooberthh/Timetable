import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./main.css"
import VModal from 'vue-js-modal'
import moment from 'moment';
import store from './store/index';
import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faStream } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret, faEdit, faTrash, faTimes, faBook, faStar, faPlus, faAlignLeft, faCheckSquare, faStream, faAngleDown);
Vue.component('font-awesome-icon', FontAwesomeIcon);
//Global Event Bus
window.events = new Vue();

window.flash = function(message, level = "default") {
    window.events.$emit('flash', {message, level});
};

Vue.config.productionTip = false;

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
    },
    getHoursFromMins(mins) {
        // do not include the first validation check if you want, for example,
        // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
        if (mins >= 24 * 60 || mins < 0) {
            throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440.");
        }

        return moment.duration(mins, 'minutes').asHours();
    }
  }
});

Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: true } });

new Vue({
    router,
    store,
    created () {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            const userData = JSON.parse(userInfo);
            this.$store.commit('setUserData', userData);
        }
    },
    render: h => h(App),
}).$mount('#app');

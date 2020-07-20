import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUserData(state, data) {
            state.user = data;
            localStorage.setItem('user', JSON.stringify(data));
            axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        },
        clearUserData () {
            localStorage.removeItem('user');
            location.reload()
        }
    },
    actions: {
        login ({ commit }, credentials) {
            return axios
                .post(process.env.VUE_APP_GATEWAY + 'login', credentials)
                .then(({ data }) => {
                    commit('setUserData', data)
                })
        },
        logout ({ commit }) {
            commit('clearUserData')
        }
    },
    getters: {
        isLoggedIn: state => !!state.user
    }
});

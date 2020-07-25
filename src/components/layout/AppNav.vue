<template>
    <nav class="bg-green-500 p-6 border-b-8 border-green-600 mb-8">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white mr-6">
                <router-link to="/" class="font-semibold text-3xl tracking-tight">Timetable</router-link>
            </div>
            <div class="flex mr-auto">
                <router-link v-show="isLoggedIn" v-for="route in routes"
                             :key="route.id"
                             :to="route.page"
                             class="mr-6 text-white font-bold"
                >
                    {{ route.text }}
                </router-link>
                <router-link to="/hue" class="mr-6 text-white font-bold">Hue</router-link>
            </div>
            <div class="flex ml-auto">
                <button  class="mr-6 text-white font-bold" @click="showLoginModal" v-if="!this.isLoggedIn">Login</button>
                <button  class="mr-6 text-white font-bold" @click="showRegisterModal" v-if="!this.isLoggedIn">Register</button>
                <button class="mr-6 text-white font-bold" @click="logout" v-if="this.isLoggedIn">Logout</button>
            </div>
        </div>
        <login-modal v-if="!this.isLoggedIn"></login-modal>
        <register-modal v-if="!this.isLoggedIn"></register-modal>
    </nav>
</template>

<script>
    import LoginModal from '../modals/Login';
    import RegisterModal from '../modals/RegisterModal';
    import { mapGetters } from 'vuex'

    export default {
        name: "AppNav",
        components: {LoginModal, RegisterModal},
        data() {
            return {
                routes: [
                    {
                      id:0,
                      text: 'Home',
                      page: '/',
                        auth: false
                    },
                    {
                        id:1,
                        text: 'Books',
                        page: '/books'
                    },
                    {
                        id:2,
                        text: 'Calendar',
                        page: '/calendar'
                    },
                    {
                        id:3,
                        text: 'Boards',
                        page: '/boards'
                    },
                ]
            }
        },
        methods: {
            logout() {
              this.$store.dispatch('logout');
            },
            showLoginModal() {
                this.$modal.show('login');
            },
            showRegisterModal() {
                this.$modal.show('register');
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            }
        }
    }
</script>

<style scoped>

</style>

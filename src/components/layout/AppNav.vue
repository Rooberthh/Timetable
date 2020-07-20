<template>
    <nav class="bg-green-500 p-6 border-b-8 border-green-600 mb-8">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white mr-6">
                <router-link to="/" class="font-semibold text-3xl tracking-tight">Timetable</router-link>
            </div>
            <div class="flex mr-auto">
                <router-link v-for="route in routes"
                             :key="route.id"
                             :to="route.page"
                             class="mr-6 text-white font-bold"
                >
                    {{ route.text }}
                </router-link>
            </div>
            <div class="flex ml-auto">
                <button  class="mr-6 text-white font-bold" @click="showLoginModal">Login</button>
                <button class="mr-6 text-white font-bold" @click="logout">Logout</button>
            </div>
        </div>
        <login-modal></login-modal>
    </nav>
</template>

<script>
    import LoginModal from '../modals/Login';

    export default {
        name: "AppNav",
        components: {LoginModal},
        data() {
            return {
                routes: [
                    {
                      id:0,
                      text: 'Home',
                      page: '/'
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
            }

        },
    }
</script>

<style scoped>

</style>

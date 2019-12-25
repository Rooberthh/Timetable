<template>
    <nav class="bg-green-500 p-6 border-b-8 border-green-600 mb-8">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white mr-6">
                <router-link to="/" class="font-semibold text-3xl tracking-tight">Timetable</router-link>
            </div>
            <div class="flex items-center mr-auto">
                <router-link v-for="route in routes"
                             :key="route.id"
                             :to="route.page"
                             class="mr-6 text-white font-bold"
                >
                    {{ route.text }}
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "AppNav",
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
                ]
            }
        }
    }
</script>

<style scoped>

</style>

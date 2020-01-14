<template>
    <div class="sm:w-1/2 md:w-1/4 px-3 pb-6">
        <div class="bg-white flex justify-center py-5 px-3 shadow-md">
            <div class="card-body">
                <h3 class="font-bold text-5xl text-center" v-if="count !== null"> {{ count }}</h3>
                <h3 class="font-bold text-5xl text-center" v-else>Loading...</h3>
                <p class="text-grey-700 text-lg text-center">{{ text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "StatisticsCard",
        props: ['url', 'text'],
        data() {
            return {
                count: null,
                loading: true
            }
        },
        created() {
            axios.get(this.url)
                .then((response) => {
                    this.count = response.data.length;
                    this.loading = false;
                });
        }
    }
</script>

<style scoped>
</style>

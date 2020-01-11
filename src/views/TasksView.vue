<template>
    <div>
        <h1 class="text-3xl">Tasks</h1>
        <div class="flex my-3 -px-2">
            <div class="flex-1 bg-gray-300 p-3 rounded mx-2 self-start" v-for="(status, index) in statuses" :key="status.id">
                <statusBoard :status="status"></statusBoard>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import statusBoard from '../components/StatusBoard';

    export default {
        name: 'tasks',
        components: {
            statusBoard
        },
        data() {
            return {
                statuses: []
            }
        },
        created() {
            axios.get(this.getGatewayUrl() + 'statuses')
                .then(response => {
                    this.statuses = response.data;
                })
                .catch(error => {
                    flash(error.message);
                });
        }
    }
</script>

<style scoped>

</style>

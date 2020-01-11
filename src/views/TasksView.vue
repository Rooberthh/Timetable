<template>
    <div>
        <h1 class="text-3xl">Tasks</h1>
        <div class="flex my-3 -px-2">
            <div class="flex-1 bg-gray-300 p-3 rounded mx-2 self-start" v-for="(status, index) in statuses" :key="status.id">
                <statusBoard :status="status"></statusBoard>
            </div>
        </div>
        <taskDetails @taskUpdated="fetch()"></taskDetails>
    </div>
</template>

<script>
    import axios from 'axios';
    import statusBoard from '../components/StatusBoard';
    import taskDetails from '../components/modals/TaskDetails';

    export default {
        name: 'tasks',
        components: {
            statusBoard,
            taskDetails
        },
        data() {
            return {
                statuses: []
            }
        },
        created() {
            window.events.$on('show-taskDetails', task => {
                this.$modal.show('task-details', task);
            });

            this.fetch();
        },
        methods: {
            fetch() {
                axios.get(this.getGatewayUrl() + 'statuses')
                    .then(response => {
                        this.statuses = response.data;
                    })
                    .catch(error => {
                        flash(error.message);
                    });
            }
        }
    }
</script>

<style scoped>

</style>

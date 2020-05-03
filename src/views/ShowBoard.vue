<template>
    <div>
        <h1 class="text-3xl font-bold" v-text="board.name"></h1>
        <button class="btn btn-primary" type="button" @click="openModal">Add new status</button>
        <div class="flex my-3 -px-2">
                <statusBoard
                        v-for="(status, index) in this.items" :key="status.id"
                        :status="status"
                        @deleted="remove(index)"
                        >
                </statusBoard>
        </div>
        <taskDetails @refetch="fetch()"></taskDetails>
        <addStatus :board="this.board" @created="add"></addStatus>
    </div>
</template>

<script>
    import axios from 'axios';
    import statusBoard from '../components/StatusBoard';
    import taskDetails from '../components/modals/TaskDetails';
    import addStatus from '../components/modals/AddStatus';
    import collection from '../components/mixins/Collection';

    export default {
        components: {statusBoard, taskDetails, addStatus},
        mixins: [collection],
        data() {
            return {
                board: {},
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
                axios.get(this.getGatewayUrl() + "boards/" + this.$route.params.id)
                    .then(response => {
                        this.board = response.data;

                        this.items = response.data.statuses;
                    })
                    .catch(error => {
                        this.flash(error.message);
                    });
            },
            openModal () {
                this.$modal.show('add-status')
            }
        }
    }
</script>

<style scoped>

</style>

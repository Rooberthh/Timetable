<template>
    <div>
        <h1 class="text-3xl">Boards</h1>
        <div class="w-full">
            <button class="btn btn-primary" @click="openAddBoardModal">Add Board</button>
        </div>
        <ul class="flex flex-wrap -mx-3 my-6">
            <Board v-for="(board, index) in items" :board="board" :key="board.id" @deleted="remove(index)"></Board>
        </ul>
        <addBoard @created="add"></addBoard>
        <spinner :center="true" :loading="loading"></spinner>
    </div>
</template>

<script>
    import Board from '../components/Board'
    import collection from '../components/mixins/Collection';
    import axios from 'axios';
    import addBoard from '../components/modals/AddBoard';
    import spinner from '../components/common/Spinner';

    export default {
        name: "Boards",
        components: {Board, addBoard, spinner},
        mixins: [collection],
        data() {
            return {
                boardUrl: this.getGatewayUrl() + "boards",
                loading: false
            }
        },
        created() {
            this.loading = true;
            axios.get(this.boardUrl)
                .then(response => {
                    this.items = response.data;
                    this.loading = false;
                })
                .catch(error => {
                    flash(error.message);
                });
        },
        methods: {
            openAddBoardModal() {
                this.$modal.show('add-board');
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <h1 class="text-3xl">Boards</h1>
        <ul class="flex flex-wrap -mx-3 my-6">
            <Board v-for="(board, index) in items" :board="board" :key="board.id" @deleted="remove(index)"></Board>
        </ul>
    </div>
</template>

<script>
    import Board from '../components/Board'
    import collection from '../components/mixins/Collection';
    import axios from 'axios';

    export default {
        name: "Boards",
        components: {Board},
        mixins: [collection],
        data() {
            return {
                boardUrl: this.getGatewayUrl() + "boards",
            }
        },
        created() {
            axios.get(this.boardUrl)
                .then(response => {
                    this.items = response.data;
                })
                .catch(error => {
                    flash(error.message);
                });
        }
    }
</script>

<style scoped>

</style>

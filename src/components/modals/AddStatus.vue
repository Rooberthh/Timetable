<template>
    <modal name="add-status"
           height="auto"
           @before-open="getFavoritedStatuses"
    >
        <form class="p-5">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Name
                </label>
                <input class="input" id="name" name="name" type="text" placeholder="Name" v-model="form.name">
                <span class="text-red-500" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
            </div>
            <div class="mb-4">
                <color-picker name="color" @chosen="setColor"></color-picker>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Add as favorite
                </label>
                <input id="favorite" name="favorite" type="checkbox" v-model="form.favorite">
            </div>
            <div class="mb-4" v-if="favoriteStatuses.length > 0">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="favorite">
                    Favorites
                </label>
                <select @change="selectFavoriteStatus">
                    <option v-for="status in this.favoriteStatuses" :key="status.name" class="flex p-5">
                        <div class="w-4 h-4" :style="{backgroundColor: status.color}">
                        </div>
                        {{ status.name }}
                    </option>
                </select>
            </div>
            <div class="flex items-center justify-between">
                <button class="btn btn-primary" type="button" @click="addStatus">
                    Add
                </button>
            </div>
        </form>
    </modal>
</template>

<script>
    import Form from '../Form/Form';
    import ColorPicker from '../common/ColorPicker';
    import axios from 'axios';

    export default {
        props: ['board'],
        components : {ColorPicker},
        data() {
            return {
                favoriteStatuses: [],
                board_id: 0,
                form: new Form({'name': '', 'color': '', 'board_id': this.board.id, 'favorite': ''})
            }
        },
        watch: {
          board: function(board) {
              this.board_id = board.id;
          }
        },
        methods: {
            addStatus() {
                this.form.post(this.getGatewayUrl() + `boards/${this.board_id}/statuses`)
                    .then(response => {
                        this.$emit('created', response);
                        this.$modal.hide('add-status');
                    });
            },
            setColor(color) {
                this.form.color = color;
            },
            selectFavoriteStatus(status) {
                this.form.name = status.name;
                this.form.color = status.color;
            },
            getFavoritedStatuses() {
                axios.get(this.getGatewayUrl() + "statuses/favorites")
                    .then(response => {
                        this.favoriteStatuses = response.data;
                    });
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <li class="w-full md:w-1/3 px-3 pb-6">
        <article class="bg-white flex shadow-md relative" v-if="!editing">
            <router-link class="full-link" :to="{ name: 'show-board', params: { id: this.id }}"></router-link>
            <div class="w-full">
                <div class="flex h-32 bg-red-600">
                    <font-awesome-icon :icon="['fas', 'stream']" class="m-auto text-6xl text-white"></font-awesome-icon>
                </div>
                <div class="py-5 px-3">
                    <h2 class="font-bold text-xl"> {{ this.form.name }}</h2>
                    <div class="my-1 flex justify-between">
                        <div class="flex flex-wrap">
                            <div class="pill font-bold text-white mr-1 my-1 text-xs" :style="{backgroundColor: s.color}" v-for="(s, index) in statuses" :key="s.id">
                                {{ s.name }}
                            </div>
                        </div>
                        <div class="flex">
                            <dropdown>
                                <template v-slot:trigger>
                                    <button class="font-bold text-2xl">...</button>
                                </template>
                                <li><a @click="editing = !editing" class="dropdown-item hover:bg-gray-200">Edit</a></li>
                                <li><a @click="destroy" class="dropdown-item hover:bg-gray-200">Delete</a></li>
                            </dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <article class="bg-white shadow-md relative py-5 px-3" v-else>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Name
                </label>
                <input class="input" id="name" name="name" type="text" placeholder="Name" v-model="form.name">
                <span class="text-red-500" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
            </div>
            <div class="flex justify-between mt-3 pb-4">
                <button @click="update" type="button" class="btn btn-primary">Update</button>
                <button @click="cancel" type="button" class="btn">Cancel</button>
            </div>
        </article>
    </li>
</template>

<script>
    import dropdown from './common/Dropdown';
    import axios from 'axios';
    import Form from './Form/Form'

    export default {
        name: "Board",
        components: {dropdown},
        props: ['board'],
        data() {
            return {
                id: this.board.id,
                name: this.board.name,
                archived: this.board.archived,
                statuses: this.board.statuses,
                editing: false,
                form: new Form({'name': this.board.name})
            }
        },
        methods: {
            destroy() {
                axios.delete(this.getGatewayUrl() + `boards/${this.id}`)
                    .then(response => {
                        this.$emit('deleted', response);
                        flash('Board have been deleted');
                    })
                    .catch(error => {
                        flash(error.message);
                    })
            },
            cancel() {
                this.editing = false;
            },
            update() {
                this.form.patch(this.getGatewayUrl() + `boards/${this.id}`)
                    .then(() => {
                        flash('Board have been updated');
                        this.editing = false;
                    })
                    .catch(error => {
                        flash(error.message);
                    })
            }
        }
    }
</script>

<style scoped>
    .full-link {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>

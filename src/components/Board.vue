<template>
    <li class="w-full md:w-1/3 px-3 pb-6">
        <article class="bg-white flex shadow-md relative">
            <router-link class="full-link" :to="{ name: 'show-board', params: { id: this.id }}"></router-link>
            <div class="w-full">
                <div class="flex h-32 bg-red-600">
                    <font-awesome-icon :icon="['fas', 'stream']" class="m-auto text-6xl text-white"></font-awesome-icon>
                </div>
                <div class="py-5 px-3">
                    <h2 class="font-bold text-xl"> {{ this.name }}</h2>
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
                                <li><a @click="edit" class="dropdown-item hover:bg-gray-200">Edit</a></li>
                                <li><a @click="destroy" class="dropdown-item hover:bg-gray-200">Delete</a></li>
                            </dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </li>
</template>

<script>
    import dropdown from './common/Dropdown';
    import axios from 'axios';

    export default {
        name: "Board",
        components: {dropdown},
        props: ['board'],
        data() {
            return {
                id: this.board.id,
                name: this.board.name,
                archived: this.board.archived,
                statuses: this.board.statuses
            }
        },
        methods: {
            destroy() {
                axios.delete(this.getGatewayUrl() + `boards/${this.id}`)
                    .then(() => {
                        this.flash('Board have been deleted');
                    })
                    .catch(error => {
                        this.flash(error);
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

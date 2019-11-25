<template>
    <li class="sm:w-1/2 md:w-1/4 px-3 pb-6">
        <article class="bg-white flex justify-center shadow-md relative">
            <div class="w-full">
                <div class="card-image h-32" v-if="book.image_path != null">
                    <img :src="book.image_path" alt="">
                </div>
                <div class="flex h-32 bg-green-700" v-else>
                    <i class="fas fa-book text-5xl m-auto text-white"></i>
                </div>
                <div class="py-5 px-3">
                    <h3 class="font-bold text-l"> {{ book.title }}</h3>
                    <p> {{ this.Truncate(book.review, 50) }} </p>
                    <div class="my-1 flex justify-between">
                        <div>
                            <i class="fas fa-star text-xl text-yellow-500" v-for="i in this.book.rating"></i>
                        </div>
                        <div class="flex">
                            <div class="flex">
                                <i class="fas fa-edit m-auto" @click="edit"></i>
                            </div>
                            <div class="flex">
                                <i class="fas fa-times m-auto" @click="destroy"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </li>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Book",
        props: ['book'],
        methods: {
            edit()  {

            },
            destroy() {
                axios.delete(this.getGatewayUrl() + 'books/' + this.book.id)
                    .then( response => {
                        this.$emit('deleted', response);
                    });
            }
        }
    }
</script>

<style scoped>
    i {
        display: inline-block;
        vertical-align: middle;
    }
    .fa-edit {
        margin: auto;
        padding: 5px;
        border-radius: 50% 50%;
        font-size: 18px;
    }

    .fa-edit:hover {
        cursor: pointer;
    }

    .fa-times {
        font-size: 22px;
    }

    .fa-times:hover {
        cursor: pointer;
        color: red;
    }
</style>

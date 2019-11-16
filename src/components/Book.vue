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
                    <div class="my-1">
                        <i class="fas fa-star text-xl text-yellow-500" v-for="icon in this.book.rating"></i>
                    </div>
                </div>
            </div>
        </article>
    </li>
</template>

<script>
    export default {
        name: "Book",
        props: ['book']
    }
</script>

<style scoped>
    i {
     vertical-align: middle;
    }
</style>

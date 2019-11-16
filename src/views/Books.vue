<template>
    <div>
        <button class="btn btn-primary" type="button">Add new book</button>
        <ul class="flex flex-wrap -mx-3 my-6">
            <Book v-for="(book, index) in books" :book="book"></Book>
        </ul>
    </div>
</template>

<script>
    import Book from '../components/Book';
    import axios from 'axios';

    export default {
        name: "Books",
        components: {
            'Book': Book
        },
        data() {
            return {
                bookUrl: this.getGatewayUrl() + "books",
                books: []
            }
        },
        created() {
            axios.get(this.bookUrl)
                .then(response => {
                    this.books = response.data;
                });
        }
    }
</script>

<style scoped>

</style>

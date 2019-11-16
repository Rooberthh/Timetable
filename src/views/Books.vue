<template>
    <div>
        <button class="btn btn-primary" type="button" @click="openModal">Add new book</button>
        <ul class="flex flex-wrap -mx-3 my-6">
            <Book v-for="(book, index) in books" :book="book"></Book>
        </ul>
        <addBook></addBook>
    </div>
</template>

<script>
    import Book from '../components/Book';
    import axios from 'axios';
    import addBook from '../components/modals/AddBook';

    export default {
        name: "Books",
        components: {
            'Book': Book,
            'addBook': addBook
        },
        data() {
            return {
                bookUrl: this.getGatewayUrl() + "books",
                books: []
            }
        },
        methods: {
            openModal () {
                this.$modal.show('add-book')
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

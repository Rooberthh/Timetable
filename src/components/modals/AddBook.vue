<template>
    <modal name="add-book"
            height="auto"
    >
            <form class="p-5">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                        Title
                    </label>
                    <input class="input" id="title" name="title" type="text" placeholder="Title" v-model="form.title">
                    <span class="text-red" v-if="form.errors.has('title')" v-text="form.errors.get('title')"></span>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="review">
                        Review
                    </label>
                    <textarea
                            id="review"
                            class="input"
                            rows="10"
                            placeholder="Message..."
                            v-model="form.review"
                    ></textarea>
                    <span class="text-red" v-if="form.errors.has('review')" v-text="form.errors.get('review')"></span>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="rating">
                        Rating
                    </label>
                    <div class="relative">
                        <select id="rating" name="rating" class="input" v-model="form.rating">
                            <option :value="1" :selected="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                        <span class="text-red" v-if="form.errors.has('rating')" v-text="form.errors.get('rating')"></span>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="genre_id">
                        Genre
                    </label>
                    <div class="relative">
                        <select id="genre_id" name="genre_id" class="input" v-model="form.genre_id">
                            <option v-for="(genre, index) in genres" :value="genre.id" :selected="genre.id" v-text="genre.name"></option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                        <span class="text-red" v-if="form.errors.has('genre_id')" v-text="form.errors.get('genre_id')"></span>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <button class="btn btn-primary" type="button" @click="addBook">
                        Add
                    </button>
                </div>
            </form>
    </modal>
</template>

<script>
    import axios from 'axios';
    import Form from '../Form/Form';

    export default {
        name: "AddBook",
        data() {
            return {
                genres: {},
                form: new Form({'title': '', 'review': '', 'genre_id': 0, 'rating': 0})
            }
        },
        mounted() {
            axios.get(this.getGatewayUrl() + '/genres')
                .then(response => {
                    this.genres = response.data;
                }).catch(error => {
                    alert(error.message);
                });
        },
        methods: {
            addBook() {
                this.form.post(this.getGatewayUrl() + 'books');
            }
        }
    }
</script>

<template>
    <li class="sm:w-1/2 md:w-1/4 px-3 pb-6">
        <article class="bg-white flex justify-center shadow-md relative" v-if="!editing">
            <div class="w-full">
                <div class="card-image h-32" v-if="this.item.image_path != null">
                    <img :src="this.item.image_path" alt="">
                </div>
                <div class="flex h-32 bg-green-700" v-else>
                    <i class="fas fa-book text-5xl m-auto text-white"></i>
                </div>
                <div class="py-5 px-3">
                    <h3 class="font-bold text-l"> {{ this.item.title }}</h3>
                    <p> {{ this.Truncate(this.item.review, 50) }} </p>
                    <div class="my-1 flex justify-between">
                        <div>
                            <i class="fas fa-star text-xl text-yellow-500" v-for="i in parseInt(this.item.rating)"></i>
                        </div>
                        <div class="flex">
                            <dropdown>
                                <template v-slot:trigger>
                                    <button class="font-bold text-2xl">...</button>
                                </template>
                                <li><a href="#" @click="edit" class="dropdown-item hover:bg-gray-200">Edit</a></li>
                                <li><a href="#" @click="destroy" class="dropdown-item hover:bg-gray-200">Delete</a></li>
                            </dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <article class="bg-white flex justify-center shadow-md relative" v-else>
            <div class="w-full">
                <div class="bg-gray-200 h-32 flex">
                    <div class="m-auto">
                        <ImageUpload></ImageUpload>
                    </div>
                </div>
                <div class="py-5 px-3">
                    <div class="mb-4">
                        <input class="input" id="title" name="title" type="text" placeholder="Title" v-model="form.title">
                        <span class="text-red-500" v-if="form.errors.has('title')" v-text="form.errors.get('title')"></span>
                    </div>
                    <div class="mb-4">
                        <textarea
                                id="review"
                                class="input"
                                rows="4"
                                placeholder="Message..."
                                v-model="form.review"
                        ></textarea>
                        <span class="text-red-500" v-if="form.errors.has('review')" v-text="form.errors.get('review')"></span>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="rating">
                            Rating
                        </label>
                        <div class="relative">
                            <select id="rating" name="rating" class="input" v-model="form.rating">
                                <option value="0" selected>Select a rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                            <span class="text-red-500" v-if="form.errors.has('rating')" v-text="form.errors.get('rating')"></span>
                        </div>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="genre_id">
                            Genre
                        </label>
                        <div class="relative">
                            <select id="genre_id" name="genre_id" class="input" v-model="form.genre_id">
                                <option value="0" selected>Select a genre</option>
                                <option v-for="(genre, index) in genres" :value="genre.id" v-text="genre.name"></option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                            <span class="text-red-500" v-if="form.errors.has('genre_id')" v-text="form.errors.get('genre_id')"></span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between p-5">
                    <button @click="cancel" class="btn bg-red-700 text-white">Cancel</button>
                    <button @click="update" class="btn btn-primary">Update</button>
                </div>
            </div>
        </article>
    </li>
</template>

<script>
    import axios from 'axios';
    import dropdown from './common/Dropdown';
    import ImageUpload from './ImageUpload';
    import Form from './Form/Form';

    export default {
        name: "Book",
        props: ['book'],
        components: {dropdown, ImageUpload},
        data() {
            return {
                item: {
                    title: this.book.title,
                    review: this.book.review,
                    rating: parseInt(this.book.rating),
                    genre_id: this.book.genre_id,
                    image_path: this.book.image_path
                },
                genres: [],
                editing: false,
                form: new Form(
                    {
                        'title': this.book.title,
                        'review': this.book.review,
                        'genre_id': this.book.genre_id,
                        'rating': this.book.rating,
                        'image_path': this.book.image_path
                    })
            }
        },
        methods: {
            destroy() {
                axios.delete(this.getGatewayUrl() + 'books/' + this.book.id)
                    .then( response => {
                        this.$emit('deleted', response);
                    });
            },
            edit() {
                this.editing = !this.editing;
                if(this.editing && this.genres.length < 1)
                {
                    axios.get(this.getGatewayUrl() + 'genres')
                        .then(response =>{
                            this.genres = response.data;
                        });
                }
            },
            update() {
                this.form.patch(this.getGatewayUrl() + 'books/' + this.book.id)
                    .then(response => {
                        //flash message?
                        this.item = response;
                        this.editing = false;
                    });
            },
            cancel() {
                this.editing = false;
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

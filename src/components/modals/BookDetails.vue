<template>
    <modal name="book-details"
           height="auto"
           @before-open="beforeOpen"
    >
        <article class="card p-5" v-if="!editing">
            <div class="card-top flex">
                <div class="ml-auto">
                    <button @click="edit" class="mr-4"> <font-awesome-icon :icon="['fas', 'edit']" /></button>
                    <button @click="destroy"> <font-awesome-icon :icon="['fas', 'trash']" /> </button>
                </div>
            </div>
            <div class="card-body">
                <div class="card-header">
                    <span role="heading"> {{ this.item.title }}</span>
                </div>
                <div class="card-info">
                    <span>{{ sameDay }}</span>
                </div>
            </div>
        </article>
        <article class="card p-5" v-else>
            <div class="card-body">
                <div class="mb-4">
                    <input class="input" id="title" name="title" type="text" placeholder="Title" v-model="form.name">
                </div>
            </div>
            <div class="flex justify-between">
                <button @click="cancel" class="btn bg-red-700 text-white">Cancel</button>
                <button @click="update" class="btn btn-primary">Update</button>
            </div>
        </article>
    </modal>
</template>

<script>
    export default {
        data() {
            return {
                book: {
                    title: '',
                    review: '',
                    rating: '',
                    genre: '',
                    image_path: ''
                },
            }
        },
        methods: {
            beforeOpen (e) {
                let event = e.params;

                this.book.id = event.id;
                this.book.title = event.title;
                this.book.rating = event.rating;
                this.book.description = event.description;
                this.book.genre = event.genre;
            },
        }
    }
</script>

<style scoped>

</style>

<template>
    <modal name="register"
           height="auto"
    >
        <form class="p-5 card" @submit.prevent="register">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Name
                </label>
                <input class="input" id="name" name="name" type="text" placeholder="Name" v-model="form.name">
                <span class="text-red-500" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input class="input" id="email" name="email" type="text" placeholder="Name" v-model="form.email">
                <span class="text-red-500" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="input" id="password" name="password" type="password" v-model="form.password">
                <span class="text-red-500" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password Confirmation
                </label>
                <input class="input" id="password_confirmation" name="password_confirmation" type="password" v-model="form.password_confirmation">
                <span class="text-red-500" v-if="form.errors.has('password_confirmation')" v-text="form.errors.get('password_confirmation')"></span>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </modal>
</template>

<script>
    import Form from '../Form/Form';
    export default {
        data () {
            return {
                form: new Form({'email': '', 'password': '', 'name': '', 'password_confirmation': ''})
            }
        },

        methods: {
            register () {
                this.$store
                    .dispatch('register', this.form)
                    .then(() => {
                        this.$modal.hide('register');
                    })
                    .catch(error => {
                        flash(error.message);
                    })
            }
        }
    }
</script>

<style scoped>

</style>

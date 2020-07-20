<template>
    <modal name="login"
           height="auto"
    >
        <form class="p-5 card" @submit.prevent="login">
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
                <input class="input" id="password" name="password" type="password" placeholder="Name" v-model="form.password">
                <span class="text-red-500" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </modal>
</template>

<script>
    import Form from '../Form/Form';
    export default {
        data () {
            return {
                form: new Form({'email': '', 'password': ''})
            }
        },

        methods: {
            login () {
                this.$store
                    .dispatch('login', {
                        email: this.form.email,
                        password: this.form.password
                    })
                    .then(() => {
                        this.$modal.hide('login');
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

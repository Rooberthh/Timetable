<template>
    <div>
        <button class="btn btn-primary" @click="setOfficeRed">
            Cuddles
        </button>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        methods: {
            setOfficeRed() {
                let url = `https://${process.env.VUE_APP_HUE_BRIDGE_IP}/api/${process.env.VUE_APP_HUE_USER}/7/state`;
                let data = {
                    on:true,
                    xy:[0.675,0.322],
                };
                axios.put(url, data).then(() => {
                    flash("Cuddle time");
                }).catch(error => {
                    console.log(error);
                })
            },
        },
    }
</script>

<style scoped>

</style>

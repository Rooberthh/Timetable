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
                let url = `https://${process.env.VUE_APP_HUE_BRIDGE_IP}/api/${process.env.VUE_APP_HUE_USER}/lights/7/state`;
                let data = {
                    "on":true,
                    "xy":[0.675,0.322],
                    "bri": 254
                };
                let times = 0;
                let cuddle = setInterval(function(){
                    times++;

                    if(times % 2 === 0) {
                        axios.put(url, data).then(() => {
                        }).catch(error => {
                            console.log(error);
                        });
                    } else {
                        axios.put(url, data).then(() => {
                        }).catch(error => {
                            console.log(error);
                        });
                    }

                    if(times === 10){
                        clearInterval(cuddle);
                    }
                }, 500);
            },
        },
    }
</script>

<style scoped>

</style>

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
                let lightOn = {
                    "on":true,
                    "xy":[0.675,0.322],
                    "bri": 254
                };
                let lightOff = {
                    "on":false
                };
                let times = 0;
                let cuddle = setInterval(function(){

                    if(times % 2 === 0) {
                        this.setOfficeLamp(lightOn);
                    } else {
                        this.setOfficeLamp(lightOff);
                    }
                    times++;
                    if(times === 10){
                        clearInterval(cuddle);
                    }
                }, 1000);
            },
            setOfficeLamp(data) {
                let url = `https://${process.env.VUE_APP_HUE_BRIDGE_IP}/api/${process.env.VUE_APP_HUE_USER}/lights/7/state`;

                axios.put(url, data).then(() => {
                }).catch(error => {
                    console.log(error);
                });
            }
        },
    }
</script>

<style scoped>

</style>

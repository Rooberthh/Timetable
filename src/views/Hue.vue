<template>
    <div>
        <button class="btn btn-primary" @click="setOfficeRed">
            Cuddles
        </button>
        <div class="my-4" v-for="(light, index) in lights" :key="light.id">
            {{ light.name }}
            <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input @change="setLight($event, light, index)" type="checkbox" :name="light.uniqueid" id="light.uniqueid" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" :checked="light.state.on" />
                <label :for="light.uniqueid" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                baseUrl: `https://${process.env.VUE_APP_HUE_BRIDGE_IP}/api/${process.env.VUE_APP_HUE_USER}/lights`,
                lights: {}
            }
        },
        created() {
            this.getLights();
        },
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
                let ref = this;
                let cuddle = setInterval(function(){
                    times++;
                    if(times % 2 === 0) {
                        ref.setOfficeLamp(lightOn);
                    } else {
                        ref.setOfficeLamp(lightOff);
                    }

                    if(times === 10 * 2){
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
            },
            getLights() {
                axios.get(this.baseUrl).then(response => {
                    this.lights = response.data;
                });
            },
            setLight(event, light, lightNumber) {
                let url = `https://${process.env.VUE_APP_HUE_BRIDGE_IP}/api/${process.env.VUE_APP_HUE_USER}/lights/${lightNumber}/state`;
                let data =  {
                    "on": event.currentTarget.checked,
                };

                axios.put(url, data)
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <div v-for="(objective, index) in items">
            <objective :objective="objective" @deleted="remove(index)" :key="objective.id"></objective>
        </div>

        <div>
            <new-objective :endpoint="endpoint" @created="add"></new-objective>
        </div>
    </div>
</template>

<script>
    import NewObjective from "./NewObjective";
    import Objective from "./Objective";
    import collection from '../mixins/Collection';
    import axios from 'axios';

    export default {
        name: "Objectives",
        props: ['taskId'],
        components: {
            NewObjective,
            Objective
        },
        mixins: [collection],
        data() {
            return {
                dataSet: false,
                endpoint: this.getGatewayUrl() + 'tasks/' + this.taskId + '/objectives'
            }
        },
        created(){
            this.fetch();
        },
        methods: {
            fetch(){
                axios.get(this.endpoint)
                    .then(this.refresh)
            },
            refresh({data}){
                this.dataSet = data;
                this.items = data;
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <h3 class="text-lg font-bold" v-text="name"></h3>
        <draggable :id="name" class="pb-16" v-model="tasks"  @start="drag=true" @end="drag=false" group="tasks" @change="updateTask($event, id)">
            <div v-for="task in tasks" :key="task.id">
                <task :task="task"></task>
            </div>
        </draggable>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import axios from 'axios';
    import task from './Task';

    export default {
        name: "StatusBoard",
        components: {draggable, task},
        props: ['status'],
        data() {
            return {
                id: this.status.id,
                tasks: this.status.tasks,
                name: this.status.name,
                url: this.getGatewayUrl() + "tasks/"
            }
        },
        methods: {
            updateTask(event, id) {
                if(event.added){
                    let task = event.added && event.added.element;
                    if(task)
                    {
                        task.status_id = id;
                        let url = this.getGatewayUrl() + 'tasks/' + task.id;
                        axios.patch(url, task)
                            .then(() => {
                                flash('Task updated');
                            })
                            .catch(error => {

                            });
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>

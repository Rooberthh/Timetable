<template>
    <div>
        <h3 class="text-lg font-bold" v-text="name"></h3>
        <draggable class="pb-16" v-model="tasks"  @start="drag=true" @end="drag=false" group="tasks" @change="updateTask($event, id)">
            <div v-for="task in tasks" :key="task.id">
                <task :task="task"></task>
            </div>
        </draggable>
        <div class="flex" v-if="!adding">
            <button
                type="button"
                class="w-full text-left hover:bg-gray-400 p-1 rounded"
                @click="adding = !adding"
            >
                <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
                Add Task
            </button>
        </div>
        <div v-else>
            <textarea class="input w-full" v-model="newTask.title" id="title" placeholder="Task title"></textarea>
            <div class="flex justify-between mt-3">
                <button @click="addTask" type="button" class="btn btn-primary">Add task</button>
                <button @click="adding = !adding" type="button" class="btn">Cancel</button>
            </div>
        </div>
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
                url: this.getGatewayUrl() + "tasks/",
                adding: false,
                newTask : {
                    title: '',
                    status_id: this.status.id
                }
            }
        },
        watch: {
            status: function(status) {
                this.tasks = status.tasks;
            }
        },
        methods: {
            updateTask(event, id) {
                if(event.added) {
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
                                flash(error.message);
                            });
                    }
                }
            },
            addTask(){
                let url = this.getGatewayUrl() + 'tasks/';
                axios.post(url, this.newTask)
                    .then(response => {
                        this.newTask.title = '';

                        this.tasks.push(response.data);
                        this.adding = false;

                        flash('Task added');
                    })
                    .catch(error => {
                        flash(error.message);
                    });
            }
        }
    }
</script>

<style scoped>
    textarea {
        min-height: 4rem;
        display: block;
    }
</style>

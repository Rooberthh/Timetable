<template>
    <div class="bg-white flex shadow-md p-3 my-3 task-card"
        @click="showDetails"
    >
        <p v-text="this.task.title"></p>
    </div>
</template>

<script>
    export default {
        name: "Task",
        props: ['task'],
        data() {
            return {
                description: this.task.description,
                objectives: this.task.objectives
            }
        },
        methods: {
            showDetails() {
                window.events.$emit('show-taskDetails', this.task);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .task-card:hover {
        cursor: pointer;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
</style>

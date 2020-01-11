<template>
    <div class="bg-white flex shadow-md p-3 my-3">
        <p>{{ title }}</p>
    </div>
</template>

<script>
    export default {
        name: "Task",
        props: ['task'],
        data() {
            return {
                title: this.task.title,
                description: this.task.description,
            }
        }
    }
</script>

<style scoped>

</style>

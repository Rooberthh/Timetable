<template>
    <div class="sm:w-1/2 md:w-1/3 px-3 pb-6">
        <div class="bg-white flex justify-center py-5 px-3 shadow-md">
            <div class="card-body">
                <h3 class="font-bold text-5xl text-center">{{ url }}</h3>
                <p class="text-grey-700 text-lg text-center">{{ text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StatisticsCard",
        props: ['url', 'text']
    }
</script>

<style scoped>
</style>

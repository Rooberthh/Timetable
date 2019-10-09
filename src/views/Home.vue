<template>
  <div class="home">
    <div class="flex flex-wrap -mx-3">
      <statisticsCard
        url="asdasd"
        text="Amount of Added books"
      />
      <statisticsCard
        url="asdasd"
        text="Amount of Added books"
      />
      <statisticsCard
        url="asdasd"
        text="Amount of Added books"
      />
    </div>
  </div>
</template>

<script>
import statisticCard from '../components/StatisticsCard';
export default {

  name: 'home',
  components: {
    'statisticsCard': statisticCard
  }
}
</script>

<style scoped>

</style>

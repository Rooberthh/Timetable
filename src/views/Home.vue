<template>
  <div class="home">
    <div class="flex flex-wrap -mx-3">
      <statisticsCard
        :url="bookUrl"
        text="Amount of books"
      />
      <statisticsCard
        :url="activityUrl"
        text="Amount of Activities"
      />
    </div>
  </div>
</template>

<script>
import statisticsCard from '../components/StatisticsCard';
export default {

  name: 'home',
  components: {
    'statisticsCard': statisticsCard
  },
  data() {
    return {
      bookUrl: this.getGatewayUrl() + "books",
      activityUrl: this.getGatewayUrl() + "activities"
    }
  }

}
</script>

<style scoped>

</style>

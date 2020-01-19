<template>
  <div class="home">
    <section>
      <h2 class="text-3xl">This week you spent</h2>
      <div class="flex flex-wrap -mx-3">
        <div class="sm:w-1/2 md:w-1/5 px-3 pb-6" v-for="(timeSpent, event) in weeklyTopEvents" :key="timeSpent.id">
          <div class="bg-white flex justify-center py-5 px-3 shadow-md">
            <div class="card-body">
              <h3 class="font-bold text-5xl text-center" v-text="getHoursFromMins(timeSpent)"></h3>
              <p class="text-grey-700 text-lg text-center">Hours spent {{ event }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2 class="text-3xl">Tasks</h2>
      <div class="flex flex-wrap -mx-3">
        <div class="sm:w-1/2 md:w-1/4 px-3 pb-6" v-for="status in statuses" :key="status.id">
          <div class="bg-white flex justify-center py-5 px-3 shadow-md">
            <div class="card-body">
              <h3 class="font-bold text-5xl text-center"> {{ status.tasks.length }}</h3>
              <p class="text-grey-700 text-lg text-center">Tasks in <span class="font-bold">{{ status.name }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import statisticsCard from '../components/StatisticsCard';
import axios from 'axios';

export default {

  name: 'home',
  components: {
    'statisticsCard': statisticsCard
  },
  created() {
    this.fetch();
  },
  data() {
    return {
      bookUrl: this.getGatewayUrl() + "books",
      statuses: [],
      weeklyTopEvents: []
    }
  },
  methods: {
    fetch() {
      axios.get(this.getGatewayUrl() + 'statuses')
        .then(response => {
          this.statuses = response.data;
        })
        .catch(error => {
          flash(error.message);
        });

      axios.get(this.getGatewayUrl() + 'events/top')
        .then(response => {
          this.weeklyTopEvents = response.data;
        })
        .catch(error => {
          flash(error.message);
        });
    }
  }
}
</script>

<style scoped>

</style>

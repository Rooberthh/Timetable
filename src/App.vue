<template>
  <div id="app">
    <AppNav/>
    <main class="container mx-auto">
      <router-view/>
    </main>
  </div>
</template>

<script>
  import AppNav from './components/layout/AppNav';
  export default {
    name: 'app',
    components: {
      'AppNav': AppNav
    }
  }

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

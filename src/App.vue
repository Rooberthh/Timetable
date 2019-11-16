<template>
  <div id="app">
    <AppNav/>
    <main class="container mx-auto">
      <router-view/>
    </main>
    <AppFooter></AppFooter>
    <modals-container/>
  </div>
</template>

<script>
  import AppNav from './components/layout/AppNav';
  import AppFooter from './components/layout/AppFooter';

  export default {
    name: 'app',
    components: {
      'AppNav': AppNav,
      'AppFooter': AppFooter
    }
  }

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafafa;
  font-size: 16px;
}
</style>

<template>
  <div id="app">
    <AppNav/>
    <main class="container mx-auto min-h-screen">
      <router-view/>
    </main>
    <AppFooter></AppFooter>
    <flash-message message=""></flash-message>
    <modals-container/>
  </div>
</template>

<script>
  import AppNav from './components/layout/AppNav';
  import AppFooter from './components/layout/AppFooter';
  import Flash from './components/common/FlashMessage';

  export default {
    name: 'app',
    components: {
      'AppNav': AppNav,
      'AppFooter': AppFooter,
      'flash-message': Flash
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

<template>
<div class="container">
  <TheNavbar></TheNavbar>
  <TheMain></TheMain>
</div>
</template>

<script>
import TheNavbar from './components/layout/TheNavbar.vue'
import TheMain from './components/layout/TheMain.vue'
export default {
  name: 'App',
  components: {
   TheNavbar,TheMain
  },
}
</script>

<style>
@import url(./css/main.css);
</style>

<template>
<div class="main">
    <TheHeader></TheHeader>
    <TheContent></TheContent>
</div>
 
</template>
<script>
import TheHeader from "./TheHeader.vue"
import TheContent from "./TheContent.vue"

export default {
  name: "TheMain",
  components:{
    TheHeader, TheContent
  }
};
</script>
<style scoped>
</style>

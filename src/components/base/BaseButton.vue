<template>
  <button
    :class="{
      btn: true,
      'btn-primary': isprimary,
      'dialog__btn--acept': true,
      'btn-secondary': isSecondary,
    }"
  >
    {{ btnText }}
  </button>
</template>
<script>
export default {
    props: {
        isprimary: {
            type: Boolean,
            default:true
        },
        isSecondary:{
            type: Boolean,
            default:false
        },
        btnText:String
    }
};
</script>
<style scoped>
</style>
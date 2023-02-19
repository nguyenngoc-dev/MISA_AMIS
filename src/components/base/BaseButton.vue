<template>
  <button
    :class="{
      btn: true,
      'btn-primary': isprimary,
      'dialog__btn--acept': true,
      'btn-secondary': isSecondary,
      'tooltip':isShowTooltip
    }"
  >
    {{ btnText }}
    <span v-show="isShowTooltip" style="padding: 0; font-weight: 100" class="tooltiptext"
      >{{tooltipContent}}</span
    >
  </button>
</template>
<script>
export default {
  props: {
    isprimary: {
      type: Boolean,
      default: true,
    },
    isSecondary: {
      type: Boolean,
      default: false,
    },
    btnText: String,
    isShowTooltip: {
       type: Boolean,
      default: false,
    },
    tooltipContent:String

  },
};
</script>
<style scoped>
</style>
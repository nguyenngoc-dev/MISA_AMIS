<template>
  <input
    :type="inputType"
    :class="{
      'textfield__input': true,
      'textfield--error-input': isErrorInput,
      'modal-textfield__input': true,
    }"
    v-model="value"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script>
export default {
  props: {
    modelValue: [Array, Object, String],
    inputType: String,
    isErrorInput: {
      default: false,
      type: Boolean,
    },
  },
  emits: ["update:modelvalue"],
  watch: {
    modelValue: function (newValue) {
      this.value = newValue;
      
    },
  },
  created() {
    
  },
  data() {
    return {
      value: null,
    };
  },
};
</script>
<style scoped>
</style>
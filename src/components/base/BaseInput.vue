<template>
  <input
    :type="inputType"
    :class="{
      textfield__input: true,
      'textfield--error-input': isErrorInput,
      'modal-textfield__input': true,
    }"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :ref="name"
    :name="name"
  />
</template>
<script>
import {inputValidation} from "../../js/base/common.js"
export default {
  name: "BaseInput",
  emits: [
    "errorInputMessage"
  ],
  props: {
    modelValue: String,
    inputType: String,
    isErrorInput: {
      default: false,
      type: Boolean,
    },
    name:String,
    rules:{
      default: new Array(),
      type:Array,
    },

  },
  methods: {
     /**
     * author:Nguyễn Văn Ngọc(2/1/2023)
     * Focus vào ô input
     */
    onFocus() {
      this.$refs[this.name].focus();
    },
    /**
     * * author:Nguyễn Văn Ngọc(2/1/2023)
     * check validate input
     */
    checkValidate(){
      if(this.rules.length > 0){
        var msgErrorInput = inputValidation(this.rules,this.name,this.modelValue);
        this.$emit("errorInputMessage",this.name, msgErrorInput);
      }
    },
  }
};
</script>
<style scoped>
</style>
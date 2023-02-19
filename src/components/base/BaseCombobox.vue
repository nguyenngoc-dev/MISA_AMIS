<template>
  <label for="" class="textfield__label modal-label">
    {{ comboName }}<span class="required">*</span>
    <label
      for="donvi"
      class="modal-icon textfield__icon modal-main-container-unit"
      @click="isCheck()"
    >
      <div class="icon-dropdown"></div>
    </label>
  </label>
  <input
    type="text"
    :class="{
      textfield__input: true,
      'modal-textfield__input': true,
      'textfield--error-input': this.isUnit,
    }"
    tabindex="3"
    v-model="textSelected"
    @focus="isCheck()"
    @input="onSearchItem()"
    @keydown="onKeyDown"
    @blur="onBlurInput"
    :ref="name"
    :name="name"
  />
  <p class="text-error">{{ errorMessage }}</p>
  <ul
    :class="{
      'textfield-list': true,
      'modal-list': true,
      'show-list': isCheckDV,
    }"
  >
    <li
      :class="{
        'textfield-item': true,
        active: index === itemActive,
      }"
      v-for="(item, index) in this.entityFilter"
      :key="index"
      @click="onSelectItem(item, index)"
      :value="item[propValue]"
    >
      {{ item[propName] }}
    </li>
  </ul>
</template>
<script>
import axios from "axios";
import KEYDOWN from "../../js/base/enums.js";
import {inputValidation} from "../../js/base/common.js"
export default {
  name: "BaseCombobox",
  props: {
    comboName:String,
    errorMessage:String,
    api:String,
    isUnit:Boolean,
    propName:String,
    propValue:String,
    modelValue:String,
    name:String, 
    rules:{
      default: new Array(),
      type:Array,
    },
  },
  emits: ["invalidUnit","update:modelValue"],
  computed() {},
  created() {
    if (this.api) {
      axios.get(this.api).then((response) => {
        this.entities = response.data;
        this.entityFilter = response.data;
        this.setItemSelected();
      });
    }
  },
  data() {
    return {
      isCheckDV: false, // check để sổ dữ liệu phòng ban
      entities: [], // Danh sách bản ghi
      entityFilter: [], // Danh sách bản ghi sổ ra dữ liệu
      textSelected: "", // Tên bản ghi được chọn
      itemActive: 0, // set class active cho list item selected
    };
  },
  methods: {
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm isCheck set trạng thái khi click vào icon dropdown của đơn vị
     */
    isCheck(state) {
      this.isCheckDV = !this.isCheckDV;
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onSelectItem xử lí khi click vào một item trong danh sách
     */
    onSelectItem(item, index) {
      this.entityFilter = this.entities;
      this.textSelected = item[this.propName];
      this.isCheckDV = false;
      this.itemActive = index;
      this.$emit("invalidUnit", false);
      this.$emit("update:modelValue", item[this.propValue]);
      
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm setItemSelected lấy ra tên của bản ghi được chọn
     */
    setItemSelected() {
      var me = this;
      let itemSelected = this.entities.find(
        (item) => item[me.propValue] === me.modelValue
      );
      if (itemSelected) {
        this.textSelected = itemSelected[this.propName];
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm onSearchItem tìm kiếm bản ghi khi gõ tên vào input
     */
    onSearchItem() {
      var me = this;
      this.entityFilter = this.entities.filter((item) =>
        item[me.propName].toLowerCase().includes(me.textSelected.toLowerCase())
      );
      if (this.entityFilter.length > 0) {
        this.isCheckDV = true;
      } else {
        this.isCheckDV = false;
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm onKeyDown xử lí khi nhấn các phím
     */
    onKeyDown(e) {
      const key = e.keyCode;
      switch (key) {
        case KEYDOWN.ENTER:
          this.onSelectItem(
            this.entityFilter[this.itemActive],
            this.itemActive
          );
          break;
        case KEYDOWN.UPARROW:
          this.isCheckDV = true;
          if (this.itemActive > 0) this.itemActive--;
          break;
        case KEYDOWN.DOWNARROW:
          // eslint-disable-next-line
          let max = this.entityFilter.length;
          this.isCheckDV = true;
          if (this.itemActive < max - 1 ) this.itemActive++;
          break;
        case KEYDOWN.TAB:
          this.isCheckDV = false;
          break;
        default:
          break;
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm onBlurInput xử lí khi nhấn blur khỏi ô input
     */
    onBlurInput() {
     
      if (!this.textSelected) {
        this.$emit("invalidUnit", "Đơn vị không được để trống");
      }
      if(this.textSelected) {
        const validValue = this.entities.find(item => item[this.propName] === this.textSelected);
        if(!validValue) {
        this.$emit("invalidUnit", "Đơn vị không được để trống");
        this.$emit("update:modelValue", "");
        }
      }
    },
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
  },
  mounted() {},
  watch: {
    modelValue: {
      handler: function (newValue) {
        if (!newValue) {
          this.textSelected = "";
        }
      },immediate: true,
    },
    textSelected: {
      handler: function (newValue) {
        if (!newValue) {
          this.$emit("update:modelValue", "");
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
</style>
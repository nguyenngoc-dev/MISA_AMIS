<template>
  <div class="overlay" >
    <div class="modal" >
      <div class="modal__header">
        <div class="modal__header-left">
          <div class="modal__header-left-text">{{ formTitle }}</div>
         
        </div>
        <div class="modal__header-right">
          <div class="icon-help tooltip">
            <span class="tooltiptext" style="min-width: 113px;left: -7px;">Đang phát triển</span>
          </div>
          <div
            @click="isChangeData()"
            class="icon-close tooltip"
            for="show-modal"
          >
            <span class="tooltiptext" style="min-width: 80px;">Đóng (Esc)</span>
          </div>
        </div>
      </div>
      <div class="modal-main">
        <div class="modal-main-container">
          <div class="pb-16 flex-start">
            <div class="textfield">
              <label for="" class="textfield__label modal-label">
                Mã sản phẩm<span class="required">*</span>
              </label>
              <BaseInput
                :isErrorInput =" this.isDuplicateCode || !!this.errorOject['EmployeeCode'] "
                style="min-width: 149px; width: 149px; margin-right: 6px"
                v-model="products.ProductCode"
                :name="'EmployeeCode'"
                :rules="['NOT_EMPTY','MAX_LENGTH|20']"
                :tooltipMessage="errorCodeMessage"
                placeholder="NV-12345"
                @errorInputMessage="validateInput"
                ref="EmployeeCode"
                tabindex="1"
                @keydown.shift.tab.prevent="onFocusCancelButton()"
              />
              <div class="text-error">{{ errorCodeMessage  }}</div>
            </div>
            <div class="textfield">
              <label for="" class="textfield__label modal-label">
                Tên sản phẩm<span class="required">*</span>
              </label>
              <BaseInput
                :isErrorInput ="!!this.errorOject['FullName']"
                style="min-width: 233px; width: 233px"
                :inputType="'text'"
                v-model="products.ProductName"
                :rules="['NOT_EMPTY','MAX_LENGTH|100']"
                @errorInputMessage="validateInput"
                :name="'FullName'"
                ref="FullName"
                tabindex="1"
              />
              <p class="text-error">{{this.errorOject['FullName']}} </p>
            </div>
          </div>

          <div class="textfield modal-textfield" style="margin-bottom: 16px">
            <BaseCombobox
              :comboName="'Danh mục'"
              :errorMessage="this.errorOject['CategoryId']?'Danh mục không hợp lệ': null"
              :isUnit="!!errorOject['CategoryId']"
              :api="'https://localhost:44314/api/v1/Categorys'"
              :propName="'CategoryName'"
              :rules="['NOT_EMPTY']"
              @errorInputMessage="validateInput"
              :propValue="'CategoryId'"
              @invalidUnit="invalidUnit"
              :name="'CategoryId'"
              ref="CategoryId"
              v-model="this.products.CategoryId"
            />
          </div>
        </div>
        <div class="flex-start" style="flex-direction: column; width: 414px">
          <div class="pb-16 flex-start">
            <div
              class="textfield modal-textfield"
              style="min-width: 168px; width: 168px; margin-right: 6px"
            >
              <label for="" class="tooltip textfield__label modal-label pt-16">
               
              Số lượng
              </label>
              <BaseInput
                style="min-width: 168px; width: 168px"
                v-model="products.Quantity"
                tabindex="4"
                :isErrorInput ="!!this.errorOject['IdentityNumber']"
                ref="IdentityNumber"
                :name="'IdentityNumber'"
                @errorInputMessage="validateInput"
              />
              <p class="text-error">{{ this.errorOject['IdentityNumber'] }}</p>
            </div>
            <div
              class="textfield modal-textfield"
              style="min-width: 251px; width: 242px; margin-right: 6px"
            >
              <label for="" class="tooltip textfield__label modal-label pt-16">
              
                Giảm giá(%)
              </label>
              <BaseInput
                style="min-width: 250px; width: 242px"
                v-model="products.Discount"
                tabindex="4"
                :isErrorInput ="!!this.errorOject['IdentityNumber']"
                ref="IdentityNumber"
                :name="'IdentityNumber'"
                @errorInputMessage="validateInput"
              />
              <p class="text-error">{{ this.errorOject['IdentityNumber'] }}</p>
            </div>
          </div>
          <div class="pb-16 flex-start">
            <div
              class="textfield modal-textfield"
              style=" margin-right: 6px"
            >
              <label for="" class="tooltip textfield__label modal-label pt-16">
               Giá bán
              </label>
              <BaseInput
                style="max-width: 423px;width: 423px;"
                v-model="products.Price"
                tabindex="4"
                :isErrorInput ="!!this.errorOject['IdentityNumber']"
                ref="IdentityNumber"
                :name="'IdentityNumber'"
                @errorInputMessage="validateInput"
              />
              <p class="text-error">{{ this.errorOject['IdentityNumber'] }}</p>
            </div>
          
          </div>
        </div>
        
  <div class="modal-contact">
          <div class="modal-contact__content">
            <div
              class="textfield modal-textfield full-w"
              style="margin-bottom: 18px"
            >
              <label for="" class="textfield__label modal-label">
              Chọn ảnh
              </label>
              <BaseInput
                :type="'file'"
                tabindex="7"
                class="full-w inputfile"
                v-model="products.ImageUrl"
                :isErrorInput ="!!this.errorOject['Address']"
                ref="Address"
                :name="'Address'"
                :rules="['MAX_LENGTH|255']"
                @errorInputMessage="validateInput"
              />
              <BaseInput
              :type="'text'"
                tabindex="7"
                class="full-w"
                v-model="products.ImageUrl"
                :isErrorInput ="!!this.errorOject['Address']"
                ref="Address"
                :name="'Address'"
                :rules="['MAX_LENGTH|255']"
                @errorInputMessage="validateInput"
              />
              <img :src="products.ImageUrl" alt="Lỗi">
              <p class="text-error">{{ this.errorOject['Address'] }}</p>
            </div>
            <div
              class="textfield modal-textfield full-w"
              style="margin-bottom: 18px"
            >
              <label for="" class="textfield__label modal-label">
                Mô tả ngắn 
              </label>
              <BaseInput
                tabindex="7"
                class="full-w"
                v-model="products.ShortDescription"
                :isErrorInput ="!!this.errorOject['Address']"
                ref="Address"
                :name="'Address'"
                :rules="['MAX_LENGTH|255']"
                @errorInputMessage="validateInput"
              />
              <p class="text-error">{{ this.errorOject['Address'] }}</p>
            </div>
            <div
              class="textfield modal-textfield full-w"
              style="margin-bottom: 18px"
            >
              <label for="" class="textfield__label modal-label">
                Mô tả chi tiết
              </label>
              <editor
                api-key="6evpakssynqtlwg5jb2oddpfql37uf3vp6zd7lluieshqwik"
                v-model="products.DetailDescription"
              />
              <p class="text-error">{{ this.errorOject['Address'] }}</p>
            </div>
          
          </div>
        </div>
      </div>
     
      <div class="modal-footer">
        <BaseButton
          class="btn btn-secondary modal-btn-cancel"
          tabindex="16"
          @click="$emit('hideDialog')"
          ref="Cancel"
          :btnText="'Hủy'"
          :name="'Cancel'"
          :isprimary="false"
          @keydown.tab.prevent="onFocusFirstInput()"
          @keydown.shift.tab.prevent="onFocusButton()"
        />
        <div class="modal-footer__wrapper">
          <BaseButton
            class="modal-btn__secondary"
            :isSecondary="true"
            :isprimary="false"
            @click="onSavebtn(false)"
            :btnText="'Cất'"
            :isShowTooltip="true"
            tabindex="14"
            ref="Save"
            :tooltipContent="'Cất (Ctrl + S)'"
          >
          </BaseButton>
          <BaseButton
            @click="onSavebtn(true)"
            :btnText="'Cất và thêm'"
            :isShowTooltip="true"
            tabindex="15"
            :tooltipContent="'Cất và thêm(Ctrl+Shift+S)'"
            ref="SaveAndAdd"
            :name="'SaveAndAdd'"
          >
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
  <BaseDialog
    :errorMessage="titleLossData"
    v-if="isShowDialog"
    :isNotice="isNotice"
    :isDelete="false"
    :isQuestion="isQuestion"
    @onHideDialog="onShowDialog(false)"
    :questionMessage="questionMessage"
    :showBtnCancel="showBtnCancel"
    :btnCancelText="'Hủy'"
    :dialogHeader="'Cảnh báo'"
    :showBtnChangeVal="showBtnChangeVal"
    @onHideEmpDetail="$emit('hideDialog')"
    @onSaveBtn="this.onSavebtn(false)"
  />
</template>
<script>
import BaseInput from "../../components/base/BaseInput.vue";
import BaseDatePicker from '../../components/base/BaseDatePicker.vue'
import RESOURCES from "../../js/base/resouce.js";
import ENUMS from "../../js/base/enums.js";
import Editor from '@tinymce/tinymce-vue'
import { HTTP, HTTPCategorys,HTTPProductImages } from "../../js/api/ConnectApi.js";

export default {
  components: {
    BaseInput,
    'editor': Editor
  },

  emits: [
    "hideDialog",
    "onLoadData",
    "onshowToast",
    "onhideToast",
    "changeToastMsg",
  ],
  props: ["productIdUpdate", "isDuplicate","isShowForm",'productImageId'],

  data() {
    return {
      formTitle: RESOURCES.FORM_TITLE.PRODUCT.ADD, // Title form
      isShowDialog: false, // show dialog báo lỗi khi nhập liệu
      validateError: [], //
      categories: [], //Danh sách phòng ban
      categoryFilter: [], //Danh sách phòng ban tìm kiếm
      products: this.onDefaultEmployee(), // object nhân viên
      productImages:{},
      categorySelected: {}, // phòng ban được chọn
      oldEmployee:{},//nhân viên ban 
      errorOject:{},// object chứa lỗi 
      isName: false, // .... tên không hợp lệ
      newEmployeeCode:"",// lấy ra mã nhân viên mỗi lần click thêm mới
      isSaveAndAdd: false, // check xem có phải thêm và cất hay k
      isIndentityDate: false,
      RESOURCES,
      isUnit: false,
      isDuplicateCode: false, // mã bị trùng
      titleLossData: "", // Thông báo khi nhập liệu sai
      errorCodeMessage: "", // thông báo lỗi của mã nhân viên
      isNotice: true, // có phải dialog cảnh báo
      isQuestion: false, // có phải dialog cảnh báo thay đổi dữ liệu
      questionMessage: "",
      itemActive: null, // set class active cho list item selected
      showBtnCancel: false, // show nút không ở dialog
      showBtnChangeVal: false, // show nút thay đổi ở dialog khi click vào x
    };
  },

  watch: {
    isDuplicate: {
      async handler(newValue) {
        if(newValue == true) {
          const newCode = await this.getNewEmCode();
          this.products.ProductCode = newCode;
        }
      },
      immediate:true
    }
  },
  computed: {
    /**
     * author:Nguyễn Văn Ngọc(2/1/2023)
     * Hàm isAdd để check khi click nút cất là thêm hay sửa
     */
    // check xem là thêm hay sửa
    isAdd() {
      if (this.productIdUpdate) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    // Thay đổi form title
    if (this.isDuplicate) {
      this.formTitle = RESOURCES.FORM_TITLE.PRODUCT.DUPLICATE;
    } else if (this.productIdUpdate) {
      this.formTitle = RESOURCES.FORM_TITLE.PRODUCT.UPDATE;
    } else {
      this.formTitle = RESOURCES.FORM_TITLE.PRODUCT.ADD;
    }
    // lấy dữ liệu phòng ban đẩy vào combobox
    this.getDepartment();
    // Truyền dữ liệu vào input khi Sửa
    if (this.productIdUpdate || this.isDuplicate) {
      try {
        // gọi api lấy dữ liệu truyền vào th employee
        HTTP.get(`/${this.productIdUpdate}`).then((response) => {
          this.products = response.data;
          for(const property in this.products) {
            this.oldEmployee[property] = this.products[property]
          }
          // Lấy ra department được chọn
          const categorySelected = this.categories.find(
            (category) =>
            category.CategoryId === this.products?.CategoryId
          );
          this.products.CategoryName = categorySelected.CategoryName;
        });
      } catch (error) {
        console.log(error);
        this.handleException(error);
      }
    }
    // click vào thêm mới hoặc nhân bản thì  gọi api lấy mã nhân viên mới để truyền vào input Mã nhân viên
    if (this.isAdd || this.isDuplicate) {
       this.getNewEmCode();
    }
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
    // forcus vào ô mã nhân viên khi hiển thị form chi tiết
    this.$refs.EmployeeCode.onFocus();
    //this.watchFileInput();
  },
  unmounted() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  methods: {
    // watchFileInput() {
    //         // will notify a file input
    //         document.getElementsByTagName('input[type="file"]').change(this.notifyFileInput.bind(this));
    //     },
        
    //     notifyFileInput: function(event) {
    //         var fileName = event.target.files[0].name;
    //         // update file name value
    //         this.file = fileName;
    //         console.log(event.target.files[0]);
    //     },
       /**
     * author:Nguyễn Văn Ngọc(21/2/2023)
     * Hàm onKeyDown xử lí khi nhấn phím tắt
     */
    onKeyDown(event) {
      var me = this;
      if(this.isShowForm) {
        if(event.ctrlKey &&  event.key === "s") {
        event.preventDefault();
        me.onSavebtn(false)
      }
      else if (event.ctrlKey && event.key === "S") {
        event.preventDefault();
        me.onSavebtn(true)
      }
       else if(event.key == "Escape") {
        event.preventDefault();
        me.isChangeData();
      }
      }
      
      },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm validateInput check validate ô input
     */
    validateInput(name,errorMessage) {
      this.errorOject[name] = errorMessage;
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm getEmpById Lấy ra dữ liệu của phòng ban truyền vào combobox
     */
    async getEmpById() {
      try {
        const res = await HTTP.get(`/${this.productIdUpdate}`);
        this.products = res.data;
      } catch (error) {
        this.handleException(error);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm getDepartment Lấy ra dữ liệu của phòng ban truyền vào combobox
     */

    async getDepartment() {
      try {
        var res = await HTTPCategorys.get();
        this.categories = res.data;
        this.categoryFilter = res.data;
      } catch (error) {
        this.handleException(error);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onFocusFirstInput tab index nhảy vào ô đầu tiên
     */
    onFocusFirstInput() {
      this.$refs.ProductCode.onFocus();
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onFocusCancelButton shift tab index nhảy vào nút hủy
     */
    onFocusCancelButton() {
      this.$refs.Cancel.onFocus();
    },
      /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onFocusButton button Hủy shift tab index nhảy vào button thêm và cất
     */
    onFocusButton() {
      this.$refs.SaveAndAdd.onFocus();
    },
     /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onchecked enter để check gender
     */
    onchecked(e) {
      this.products.Gender = e.target.childNodes[0]._value;
    },
    /**
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm reset employee về mặc định
     */
    onDefaultEmployee() {
      return {
        ProductCode: "",
        ProductName: "",
        Price: null,
        Quantity: 0,
        CategoryId: "",
        CategoryName: "",
        Discount: null,
        ShortDescription: "",
        DetailDescription: "",
        ImageUrl:"",
      };
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onSavebtn Xử lí khi click nút cất
     */
    async onSavebtn(isSaveAndAdd) {
      console.log(this.products);
      console.log(this.productImages);

      var me = this;
      // validate
      if (!this.validate()) {
        this.onShowDialogChangeData(false,true,this.errorCodeMessage,null,this.titleLossData);
      } else {
        // Chuyển số lượng tính thành số
        this.products.Quantity = parseInt(this.products.Quantity);
        this.products.Discount = parseInt(this.products.Discount);
        this.products.Price = parseInt(this.products.Price);
        if (this.isAdd || this.isDuplicate) {
          //Xử lí khi thêm
          this.handleOnSave(isSaveAndAdd, true, RESOURCES.FORM_MODE.ADD);
        } else {
          // xử lí khi sửa
          this.handleOnSave(isSaveAndAdd, false, RESOURCES.FORM_MODE.EDIT);
        }
      }
    },
    /**
     * Xử lý exception khi thêm, sửa
     * Author: Nguyễn Văn Ngọc (6/2/2023)
     */
    handleException(error) {
      var me = this;
      if (error.response.status == RESOURCES.STATUSCODE.BadRequest) {
        switch (error.response.data.MoreInfo.ErrorCode) {
          case ENUMS.ERRORCODE.DuplicateCode:
            this.isDuplicateCode = true;
            this.onShowDialogChangeData(false,true,RESOURCES.FORM_MESSAGE.ERROR.DUPLICATE_CODE,"",error.response.data.MoreInfo.UserMsg);
            this.$refs.EmployeeCode.onFocus();
            break;
          // eslint-disable-next-line
          case ENUMS.ERRORCODE.InvalidInput:
            this.onShowDialogChangeData(false,true, null,"", error.response.data.MoreInfo.MoreInfo[0]);
            break;
          default:
            break;
        }
      } 
      else if (error.response.status == RESOURCES.STATUSCODE.ServerError) {
        this.$emit("changeToastMsg",RESOURCES.FORM_MODE.ERROR,true,false,RESOURCES.NOTIFICATION_TITLE.ERROR);
        this.$emit("onshowToast");
      }
      else {
        for(const property in RESOURCES.STATUSCODES) {
          if(error.response.status == property.Code) {
            this.$emit("changeToastMsg",RESOURCES.FORM_MODE.ERROR,true,false,property.Message);
            this.$emit("onshowToast");
          }
        }
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(2/1/2023)
     * Hàm handleOnSave xử lí khi thêm hoặc sửa
     */
    async handleOnSave(isSaveAndAdd, isAdd, toastMessage) {
      try {
        this.productImages.productImageId = this.productImageId;
        this.productImages.ImageUrl = this.products.ImageUrl || "";
        this.productImages.ProductId = this.productIdUpdate;
        const response = isAdd
          ? await HTTP.post("", this.products)
          : await HTTP.put(`/${this.productIdUpdate}`, this.products);
          if(this.productImages && this.productImageId !=="00000000-0000-0000-0000-000000000000")
          {
            const res = isAdd ? await HTTPProductImages.post("", this.productImages)
          : await HTTPProductImages.put(`/${this.productImageId}`, this.productImages);
          }
        
        this.$emit("changeToastMsg",toastMessage,false,true, RESOURCES.NOTIFICATION_TITLE.SUCCESS);
        this.$emit("onshowToast");
        this.$emit("onLoadData");
        this.isDuplicateCode = false;
        this.errorCodeMessage = "";
        this.productImages = {};
        if (isSaveAndAdd) {
          this.products = this.onDefaultEmployee();
          this.formTitle = RESOURCES.FORM_TITLE.PRODUCT.ADD;
          this.getNewEmCode();
        }
        
        else {
          this.$emit("hideDialog");
        }
      } catch (error) {
        this.handleException(error);
        console.log(error);
      }
    },

    /**
     * author:Nguyễn Văn Ngọc(2/1/2023)
     * Hàm getNewEmCode lấy mã nhân viên mới
     */
    async getNewEmCode() {
      const response = await HTTP.get(`/new-product-code`);
      this.products.ProductCode = response.data;
      //this.newEmployeeCode = response.data;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onShowDialog Xử lí ẩn hiện dialog thông báo
     */
    onShowDialog(state) {
      this.isShowDialog = state;
      if(this.isDuplicateCode) {
        this.$refs.EmployeeCode.onFocus();
      }
      for(const property in this.errorOject) {
        if(this.errorOject[property]) {
          this.$refs[property].onFocus();
          return;
        }
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onShowDialogChangeData Xử lí dialog thông báo
     * data thay đổi khi click vào nút x
     */
    onShowDialogChangeData(isChange,isNotice,errorCodeMessage = "",questionMessage,titleLossData) {
      this.isShowDialog = true;
      this.isNotice = isNotice;
      this.showBtnCancel = isChange;
      this.isQuestion = isChange;
      this.showBtnChangeVal = isChange;
      this.errorCodeMessage = errorCodeMessage;
      this.questionMessage = questionMessage;
      this.titleLossData =titleLossData;
    },
     /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm isChangeData Xử lí dialog thông báo
     * data thay đổi khi click vào nút x
     */
    isChangeData() {
      if(this.isAdd) {
       if(JSON.stringify(this.onDefaultEmployee()) != JSON.stringify(this.products)) {
        this.onShowDialogChangeData(true,false,'', RESOURCES.MODAL_MESSAGE.INFO,'');
       }
       else {
          this.$emit("hideDialog");
       }
      }   
      else {
        if(JSON.stringify(this.oldEmployee) != JSON.stringify(this.products)){
            this.onShowDialogChangeData(true,false,'', RESOURCES.MODAL_MESSAGE.INFO,'');
          }
        else {
          this.$emit("hideDialog");
        }
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm validate validate khi click nút cất hoặc cất và thêm
     */
    validate() {
      var me = this;
      for(const property in RESOURCES.FORM_FIELD) {
        if(me.$refs[property])
        {
          me.$refs[property].checkValidate();
        }
      }
      var isValid = true;
      isValid = this.processPopup(); // Thông báo nếu có lỗi
      return isValid;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm invalidUnit kiểm tra đơn vị có hợp lệ hay không
     */
    invalidUnit(isInvalid) {
      this.errorOject.CategoryId = isInvalid;
    },

    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm processPopup xử lí thông báo khi nhập liệu
     */
    processPopup() {
      let isValid = true;
      for(const property in this.errorOject) {
        if(this.errorOject[property]) {
            if(property == RESOURCES.CategoryId) {
              this.titleLossData = RESOURCES.FORM_MESSAGE.ERROR.ERROR_DEPARTMENT;
            }
            else {
              this.titleLossData = this.errorOject[property];
            }
          this.errorCodeMessage = this.errorOject[property];
          isValid = false;
          return;
        }
      }
      return isValid;
    },
  },

};
</script>
<style  scoped>
@import "../../css/components/datepicker.css";

</style>


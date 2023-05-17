<template>
  <div class="overlay">
    <div class="modal saleorders">
      <div class="modal__header">
        <div class="modal__header-left">
          <div class="modal__header-left-text">{{ formTitle }}</div>

        </div>
        <div class="modal__header-right">
          <div class="icon-help tooltip">
            <span class="tooltiptext" style="min-width: 113px;left: -7px;">Đang phát triển</span>
          </div>
          <div @click="isChangeData()" class="icon-close tooltip" for="show-modal">
            <span class="tooltiptext" style="min-width: 80px;">Đóng (Esc)</span>
          </div>
        </div>
      </div>
      <div class="modal-main saleorders">
        <div class="modal-main-container">
          <div class="pb-16 ">
            <div class="flex mb-12">
              <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Mã hóa đơn<span class="required">*</span>
                </label>
                <BaseInput :isErrorInput="this.isDuplicateCode || !!this.errorOject['EmployeeCode']"
                  style="min-width: 300px; width: 300px; margin-right: 12px;" v-model="saleorders.SaleOrderCode"
                  :name="'EmployeeCode'" :rules="['NOT_EMPTY', 'MAX_LENGTH|20']" :tooltipMessage="errorCodeMessage"
                  placeholder="NV-12345" @errorInputMessage="validateInput" tabindex="1"
                  @keydown.shift.tab.prevent="onFocusCancelButton()" disabled />
                <div class="text-error">{{ errorCodeMessage }}</div>
              </div>
              <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Họ <span class="required">*</span>
                </label>
                <BaseInput :isErrorInput="!!this.errorOject['FullName']" style="min-width: 300px; width: 300px"
                  :inputType="'text'" v-model="saleorders.FirstName" :rules="['NOT_EMPTY', 'MAX_LENGTH|100']"
                  @errorInputMessage="validateInput" :name="'FullName'" tabindex="1" disabled />
                <p class="text-error">{{ this.errorOject['FullName'] }} </p>
              </div>
            </div>
            <div class="flex mb-12">
              <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Tên<span class="required">*</span>
                </label>
                <BaseInput :isErrorInput="!!this.errorOject['FullName']"
                  style="min-width: 300px; width: 300px;margin-right: 12px;" :inputType="'text'"
                  v-model="saleorders.LastName" :rules="['NOT_EMPTY', 'MAX_LENGTH|100']" @errorInputMessage="validateInput"
                  :name="'FullName'" tabindex="1" disabled />
                <p class="text-error">{{ this.errorOject['FullName'] }} </p>
              </div>
              <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Địa chỉ<span class="required">*</span>
                </label>
                <BaseInput :isErrorInput="!!this.errorOject['FullName']" style="min-width: 300px; width: 300px"
                  :inputType="'text'" v-model="saleorders.CustomerAddress" :rules="['NOT_EMPTY', 'MAX_LENGTH|100']"
                  @errorInputMessage="validateInput" :name="'FullName'" tabindex="1" disabled />
                <p class="text-error">{{ this.errorOject['FullName'] }} </p>
              </div>
            </div>
            <div class="flex mb-12">
              <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Số điện thoại<span class="required">*</span>
                </label>
                <BaseInput :isErrorInput="!!this.errorOject['FullName']"
                  style="min-width: 300px; width: 300px;margin-right: 12px;" :inputType="'text'"
                  v-model="saleorders.CustomerPhone" :rules="['NOT_EMPTY', 'MAX_LENGTH|100']"
                  @errorInputMessage="validateInput" :name="'FullName'" tabindex="1" disabled />
                <p class="text-error">{{ this.errorOject['FullName'] }} </p>

              </div>
              <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Tình trạng<span class="required">*</span>
                </label>
                <BaseInput :isErrorInput="!!this.errorOject['FullName']"
                  style="min-width: 300px; width: 300px;margin-right: 12px;" :inputType="'number'"
                  v-model="saleorders.Status" :name="'FullName'" tabindex="1" max="3" min="0" />
                <p class="text-error">{{ this.errorOject['FullName'] }} </p>
              </div>
            </div>
            <div class="flex mb-12">

              <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Tổng tiền<span class="required">*</span>
                </label>
                <BaseInput :isErrorInput="!!this.errorOject['FullName']" style="min-width: 300px; width: 300px"
                  :inputType="'text'" v-model="saleorders.TotalPrice" :rules="['NOT_EMPTY', 'MAX_LENGTH|100']"
                  @errorInputMessage="validateInput" :name="'FullName'" tabindex="1" disabled />
                <p class="text-error">{{ this.errorOject['FullName'] }} </p>
              </div>
              <div style="display: flex; align-items: center; margin-left: 12px; flex: 1;">
                <div class="textfield" style="width: 100%;">
                  <label for="" class="textfield__label modal-label">
                    Tình Trạng <span class="required">*</span>
                    <label for="dropbtn" class="textfield__icon" style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 36px;
                    width: 36px;
                    top: 22px;
                    right: 13px;
                  " @click="showPageList()" tabindex="0">
                      <div class="icon-dropdown"></div>
                    </label>
                    <!-- <input type="checkbox" name="" id="dropbtn" /> -->
                  </label>

                  <BaseInput :class="{
                    'show-list': showListPage,
                  }" v-model="currentPageSizeText"
                  style="width: 300px;"
                  />
                  <ul style="width: 96%;" :class="{ 'textfield-list': true, 'show-list': showListPage }">
                    <li v-for="(item, index) in pageSizeList" :key="index" :class="{
                      'textfield-item': true,
                      active: index === itemActive,
                    }" @click="onSelectPageSize(index, item)">
                      {{ item.text }}
                    </li>
                  </ul>
                </div>
                <!-- Phân trang -->
                <paginate :page-count="totalPage" :page-range="3" :margin-pages="1" :click-handler="clickCallback"
                  :prev-text="'Trước'" :next-text="'Sau'" :prev-class="'prev-btn'" :next-class="'next-btn'"
                  :container-class="'pagination'" :page-class="'page-item'" :v-show="this.totalPage">
                </paginate>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="modal-footer">
        <BaseButton class="btn btn-secondary modal-btn-cancel" tabindex="16" @click="$emit('hideDialog')" ref="Cancel"
          :btnText="'Hủy'" :name="'Cancel'" :isprimary="false" @keydown.tab.prevent="onFocusFirstInput()"
          @keydown.shift.tab.prevent="onFocusButton()" />
        <div class="modal-footer__wrapper">
          <BaseButton   @click="onSavebtn(false)"
            :btnText="'Cất'" :isShowTooltip="true" tabindex="14" ref="Save" :tooltipContent="'Cất (Ctrl + S)'">
          </BaseButton>
          <!-- <BaseButton @click="onSavebtn(true)" :btnText="'Cất và thêm'" :isShowTooltip="true" tabindex="15"
            :tooltipContent="'Cất và thêm(Ctrl+Shift+S)'" ref="SaveAndAdd" :name="'SaveAndAdd'">
          </BaseButton> -->
        </div>
      </div>
    </div>
  </div>
  <BaseDialog :errorMessage="titleLossData" v-if="isShowDialog" :isNotice="isNotice" :isDelete="false"
    :isQuestion="isQuestion" @onHideDialog="onShowDialog(false)" :questionMessage="questionMessage"
    :showBtnCancel="showBtnCancel" :btnCancelText="'Hủy'" :dialogHeader="'Cảnh báo'" :showBtnChangeVal="showBtnChangeVal"
    @onHideEmpDetail="$emit('hideDialog')" @onSaveBtn="this.onSavebtn(false)" />
</template>
<script>
import BaseInput from "../../components/base/BaseInput.vue";
import BaseDatePicker from '../../components/base/BaseDatePicker.vue'
import RESOURCES from "../../js/base/resouce.js";
import ENUMS from "../../js/base/enums.js";
import Editor from '@tinymce/tinymce-vue'
import { HTTP, HTTPOrders } from "../../js/api/ConnectApi.js";

export default {
  components: {
    BaseInput
  },

  emits: [
    "hideDialog",
    "onLoadData",
    "onshowToast",
    "onhideToast",
    "changeToastMsg",
  ],
  props: ["orderIdUpdate", "isDuplicate", "isShowForm", 'categoryImageId'],

  data() {
    return {
      formTitle: RESOURCES.FORM_TITLE.ORDER.ADD, // Title form
      isShowDialog: false, // show dialog báo lỗi khi nhập liệu
      validateError: [], //
      saleorders: this.onDefaultEmployee(), // object nhân viên
      productImages: {},
      userSelected: {}, // phòng ban được chọn
      oldEmployee: {},//nhân viên ban 
      errorOject: {},// object chứa lỗi 
      isName: false, // .... tên không hợp lệ
      newEmployeeCode: "",// lấy ra mã nhân viên mỗi lần click thêm mới
      isSaveAndAdd: false, // check xem có phải thêm và cất hay k
      isIndentityDate: false,
      showListPage: false, // show ra list page size
      isUnit: false,
      isDuplicateCode: false, // mã bị trùng
      titleLossData: "", // Thông báo khi nhập liệu sai
      errorCodeMessage: "", // thông báo lỗi của mã nhân viên
      isNotice: true, // có phải dialog cảnh báo
      isQuestion: false, // có phải dialog cảnh báo thay đổi dữ liệu
      questionMessage: "",
      showBtnCancel: false, // show nút không ở dialog
      showBtnChangeVal: false, // show nút thay đổi ở dialog khi click vào x
      currentPageSizeText: RESOURCES.ORDERSTATUS[0].text,
      pageSizeList: RESOURCES.ORDERSTATUS, // mảng phân trang
      itemActive: 0, // set class active cho list item selected
    };
  },

  watch: {
    isDuplicate: {
      async handler(newValue) {
        if (newValue == true) {
          const newCode = await this.getNewEmCode();
          this.saleorders.CategoryCode = newCode;
        }
      },
      immediate: true
    }
  },
  computed: {
    /**
     * author:Nguyễn Văn Ngọc(2/1/2023)
     * Hàm isAdd để check khi click nút cất là thêm hay sửa
     */
    // check xem là thêm hay sửa
    isAdd() {
      if (this.orderIdUpdate) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    // Thay đổi form title
    if (this.isDuplicate) {
      this.formTitle = RESOURCES.FORM_TITLE.ORDER.DUPLICATE;
    } else if (this.orderIdUpdate) {
      this.formTitle = RESOURCES.FORM_TITLE.ORDER.UPDATE;
    } else {
      this.formTitle = RESOURCES.FORM_TITLE.ORDER.ADD;
    }
    // Truyền dữ liệu vào input khi Sửa
    if (this.orderIdUpdate || this.isDuplicate) {
      try {
        // gọi api lấy dữ liệu truyền vào th employee
        HTTPOrders.get(`/${this.orderIdUpdate}`).then((response) => {
          this.saleorders = response.data;
          for (const property in this.saleorders) {
            this.oldEmployee[property] = this.saleorders[property]
          }

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
    //   this.$refs.EmployeeCode.onFocus();
    //this.watchFileInput();
  },
  unmounted() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  methods: {
    /**
       * author:Nguyễn Văn Ngọc(10/1/2023)
       * Hàm onSelectPageSize chọn số bản ghi trên một trang
       */
       async onSelectPageSize(index, item) {
        try {
          this.isShowLoading = !this.isShowLoading;
          // gọi api lấy số bản ghi trên trang dựa vào value
          var res = await HTTPOrders.get()
          this.saleOrders = res.data;
          this.totalPage = res.data.TotalPage;
          this.isShowLoading = false;
          this.currentPageSizeText = item.text;
          this.currentPageSize = item.value;
          this.showListPage = false;
          this.textSearch = "";
          this.itemActive = index;
        } catch (error) {
          this.handleExeption(error);
        }
      },
      /**
       * author:Nguyễn Văn Ngọc(10/1/2023)
       * Hàm showListPage khi click vào nút dropdown sẽ show list page size
       */
       showPageList() {
        this.showListPage = !this.showListPage;
      },
    /**
  * author:Nguyễn Văn Ngọc(21/2/2023)
  * Hàm onKeyDown xử lí khi nhấn phím tắt
  */
    onKeyDown(event) {
      var me = this;
      if (this.isShowForm) {
        if (event.ctrlKey && event.key === "s") {
          event.preventDefault();
          me.onSavebtn(false)
        }
        else if (event.ctrlKey && event.key === "S") {
          event.preventDefault();
          me.onSavebtn(true)
        }
        else if (event.key == "Escape") {
          event.preventDefault();
          me.isChangeData();
        }
      }

    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm validateInput check validate ô input
     */
    validateInput(name, errorMessage) {
      this.errorOject[name] = errorMessage;
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm getEmpById Lấy ra dữ liệu của phòng ban truyền vào combobox
     */
    async getEmpById() {
      try {
        const res = await HTTPOrders.get(`/${this.orderIdUpdate}`);
        this.saleorders = res.data;
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
        var res = await HTTPOrders.get();
        this.saleorders = res.data;
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
      this.$refs.CategoryCode.onFocus();
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
      this.saleorders.Gender = e.target.childNodes[0]._value;
    },
    /**
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm reset employee về mặc định
     */
    onDefaultEmployee() {
      return {
        CategoryCode: "",
        SaleOrderCode: ""
      };
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onSavebtn Xử lí khi click nút cất
     */
    async onSavebtn(isSaveAndAdd) {
      console.log(this.saleorders);
      var me = this;
      // validate
      if (!this.validate()) {
        this.onShowDialogChangeData(false, true, this.errorCodeMessage, null, this.titleLossData);
      } else {
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
            this.onShowDialogChangeData(false, true, RESOURCES.FORM_MESSAGE.ERROR.DUPLICATE_CODE, "", error.response.data.MoreInfo.UserMsg);
            this.$refs.EmployeeCode.onFocus();
            break;
          // eslint-disable-next-line
          case ENUMS.ERRORCODE.InvalidInput:
            this.onShowDialogChangeData(false, true, null, "", error.response.data.MoreInfo.MoreInfo[0]);
            break;
          default:
            break;
        }
      }
      else if (error.response.status == RESOURCES.STATUSCODE.ServerError) {
        this.$emit("changeToastMsg", RESOURCES.FORM_MODE.ERROR, true, false, RESOURCES.NOTIFICATION_TITLE.ERROR);
        this.$emit("onshowToast");
      }
      else {
        for (const property in RESOURCES.STATUSCODES) {
          if (error.response.status == property.Code) {
            this.$emit("changeToastMsg", RESOURCES.FORM_MODE.ERROR, true, false, property.Message);
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
        const response = isAdd
          ? await HTTPOrders.post("", this.saleorders)
          : await HTTPOrders.put(`/${this.orderIdUpdate}`, this.saleorders);
        this.$emit("changeToastMsg", toastMessage, false, true, RESOURCES.NOTIFICATION_TITLE.SUCCESS);
        this.$emit("onshowToast");
        this.$emit("onLoadData");
        this.isDuplicateCode = false;
        this.errorCodeMessage = "";
        this.productImages = {};
        if (isSaveAndAdd) {
          this.saleorders = this.onDefaultEmployee();
          this.formTitle = RESOURCES.FORM_TITLE.ORDER.ADD;
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
      this.saleorders.CategoryCode = response.data;
      //this.newEmployeeCode = response.data;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onShowDialog Xử lí ẩn hiện dialog thông báo
     */
    onShowDialog(state) {
      this.isShowDialog = state;
      if (this.isDuplicateCode) {
        this.$refs.EmployeeCode.onFocus();
      }
      for (const property in this.errorOject) {
        if (this.errorOject[property]) {
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
    onShowDialogChangeData(isChange, isNotice, errorCodeMessage = "", questionMessage, titleLossData) {
      this.isShowDialog = true;
      this.isNotice = isNotice;
      this.showBtnCancel = isChange;
      this.isQuestion = isChange;
      this.showBtnChangeVal = isChange;
      this.errorCodeMessage = errorCodeMessage;
      this.questionMessage = questionMessage;
      this.titleLossData = titleLossData;
    },
    /**
    * author:Nguyễn Văn Ngọc(4/1/2023)
    * Hàm isChangeData Xử lí dialog thông báo
    * data thay đổi khi click vào nút x
    */
    isChangeData() {
      if (this.isAdd) {
        if (JSON.stringify(this.onDefaultEmployee()) != JSON.stringify(this.saleorders)) {
          this.onShowDialogChangeData(true, false, '', RESOURCES.MODAL_MESSAGE.INFO, '');
        }
        else {
          this.$emit("hideDialog");
        }
      }
      else {
        if (JSON.stringify(this.oldEmployee) != JSON.stringify(this.saleorders)) {
          this.onShowDialogChangeData(true, false, '', RESOURCES.MODAL_MESSAGE.INFO, '');
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
      for (const property in RESOURCES.FORM_FIELD) {
        if (me.$refs[property]) {
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
      this.errorOject.SaleOrderId = isInvalid;
    },

    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm processPopup xử lí thông báo khi nhập liệu
     */
    processPopup() {
      let isValid = true;
      for (const property in this.errorOject) {
        if (this.errorOject[property]) {
          if (property == RESOURCES.SaleOrderId) {
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

.modal.saleorders {
  min-width: 600px;
  max-width: 675px;
  width: 700px;
  background-color: #fff;
  transition: all 0.1s linear;
  animation: down 0.1s linear;
}

.modal-main.saleorders {
  padding: 0 22px 0 32px;
  display: block;
  flex-wrap: wrap;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.mb-12 {
  margin-bottom: 12px;
}
</style>
  
  
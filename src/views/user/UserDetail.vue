<template>
    <div class="overlay" >
      <div class="modal user" >
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
        <div class="modal-main user">
          <div class="modal-main-container">
            <div class="pb-16 ">
                <div class="flex mb-12">
                <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Tên tài khoản<span class="required">*</span>
                </label>
                <BaseInput
                  :isErrorInput =" this.isDuplicateCode || !!this.errorOject['EmployeeCode'] "
                  style="min-width: 300px; width: 300px; margin-right: 12px;"
                  v-model="users.UserName"
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
                  Mật khẩu<span class="required">*</span>
                </label>
                <BaseInput
                  :isErrorInput ="!!this.errorOject['FullName']"
                  style="min-width: 300px; width: 300px"
                  :inputType="'text'"
                  v-model="users.Password"
                  :rules="['NOT_EMPTY','MAX_LENGTH|100']"
                  @errorInputMessage="validateInput"
                  :name="'FullName'"
                  ref="FullName"
                  tabindex="1"
                />
                <p class="text-error">{{this.errorOject['FullName']}} </p>
              </div>
                </div>
              <div class="flex mb-12">
                <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Họ<span class="required">*</span>
                </label>
                <BaseInput
                  :isErrorInput ="!!this.errorOject['FullName']"
                  style="min-width: 300px; width: 300px;margin-right: 12px;"
                  :inputType="'text'"
                  v-model="users.FirstName"
                  :rules="['NOT_EMPTY','MAX_LENGTH|100']"
                  @errorInputMessage="validateInput"
                  :name="'FullName'"
                  ref="FullName"
                  tabindex="1"
                />
                <p class="text-error">{{this.errorOject['FullName']}} </p>
              </div>

              <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Tên<span class="required">*</span>
                </label>
                <BaseInput
                  :isErrorInput ="!!this.errorOject['FullName']"
                  style="min-width: 300px; width: 300px"
                  :inputType="'text'"
                  v-model="users.LastName"
                  :rules="['NOT_EMPTY','MAX_LENGTH|100']"
                  @errorInputMessage="validateInput"
                  :name="'FullName'"
                  ref="FullName"
                  tabindex="1"
                />
                <p class="text-error">{{this.errorOject['FullName']}} </p>
              </div>
              </div>
               <!-- <div class="flex mb-12 ">
                   <div class="textfield modal-textfield user-combo" style="max-width: 300px; width: 300px;margin-right: 12px;">
                 <BaseCombobox
                   :comboName="'Tỉnh thành'"
                   :errorMessage="this.errorOject['RegionID']?'Danh mục không hợp lệ': null"
                   :isUnit="!!errorOject['RegionID']"
                   :api="'https://localhost:44314/api/v1/Regions?parentID=234'"
                   :propName="'RegionName'"
                   :rules="['NOT_EMPTY']"
                   @errorInputMessage="validateInput"
                   :propValue="'RegionID'"
                   @invalidUnit="invalidUnit"
                   :name="'RegionID'"
                   ref="RegionID"
                   v-model="this.province"
                 />
               </div>                
               <div class="textfield modal-textfield user-combo" style="max-width: 300px; width: 300px">
                 <BaseCombobox
                   :comboName="'Quận huyện'"
                   :errorMessage="this.errorOject['RegionID']?'Danh mục không hợp lệ': null"
                   :isUnit="!!errorOject['RegionID']"
                   :api="'https://localhost:44314/api/v1/Regions?parentID=234'"
                   :propName="'RegionName'"
                   :rules="['NOT_EMPTY']"
                   @errorInputMessage="validateInput"
                   :propValue="'RegionID'"
                   @invalidUnit="invalidUnit"
                   :name="'RegionID'"
                   ref="RegionID"
                   v-model="this.province"
                 />
               </div>
              </div> -->
              <div class="flex mb-12">
                <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Địa chỉ<span class="required">*</span>
                </label>
                <BaseInput
                  :isErrorInput ="!!this.errorOject['FullName']"
                  style="min-width: 300px; width: 300px;margin-right: 12px;"
                  :inputType="'text'"
                  v-model="users.Address"
                  :rules="['NOT_EMPTY','MAX_LENGTH|100']"
                  @errorInputMessage="validateInput"
                  :name="'FullName'"
                  ref="FullName"
                  tabindex="1"
                />
                <p class="text-error">{{this.errorOject['FullName']}} </p>
              </div>
              <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Vai trò<span class="required">*</span>
                </label>
                <BaseInput
                  :isErrorInput ="!!this.errorOject['FullName']"
                  style="min-width: 300px; width: 300px"
                  :inputType="'text'"
                  v-model="users.Role"
                  :rules="['NOT_EMPTY','MAX_LENGTH|100']"
                  @errorInputMessage="validateInput"
                  :name="'FullName'"
                  ref="FullName"
                  tabindex="1"
                />
                <p class="text-error">{{this.errorOject['FullName']}} </p>
              </div>
              </div>
              <div class="flex mb-12">
                <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Email<span class="required">*</span>
                </label>
                <BaseInput
                  :isErrorInput ="!!this.errorOject['FullName']"
                  style="min-width: 300px; width: 300px;margin-right: 12px;"
                  :inputType="'text'"
                  v-model="users.Email"
                  :rules="['NOT_EMPTY','MAX_LENGTH|100']"
                  @errorInputMessage="validateInput"
                  :name="'FullName'"
                  ref="FullName"
                  tabindex="1"
                />
                <p class="text-error">{{this.errorOject['FullName']}} </p>
              </div>
              <div class="textfield">
                <label for="" class="textfield__label modal-label">
                  Số điện thoại<span class="required">*</span>
                </label>
                <BaseInput
                  :isErrorInput ="!!this.errorOject['FullName']"
                  style="min-width: 300px; width: 300px"
                  :inputType="'text'"
                  v-model="users.PhoneNumber"
                  :rules="['NOT_EMPTY','MAX_LENGTH|100']"
                  @errorInputMessage="validateInput"
                  :name="'FullName'"
                  ref="FullName"
                  tabindex="1"
                />
                <p class="text-error">{{this.errorOject['FullName']}} </p>
              </div>
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
  import { HTTP, HTTPUsers,HTTPProductImages } from "../../js/api/ConnectApi.js";
  
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
    props: ["userIdUpdated", "isDuplicate","isShowForm",'categoryImageId'],
  
    data() {
      return {
        formTitle: RESOURCES.FORM_TITLE.USER.ADD, // Title form
        isShowDialog: false, // show dialog báo lỗi khi nhập liệu
        validateError: [], //
        users: this.onDefaultEmployee(), // object nhân viên
        productImages:{},
        userSelected: {}, // phòng ban được chọn
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
        province:"",
        district:"",
        commune:"",
      };
    },
  
    watch: {
      isDuplicate: {
        async handler(newValue) {
          if(newValue == true) {
            const newCode = await this.getNewEmCode();
            this.users.CategoryCode = newCode;
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
        if (this.userIdUpdated) {
          return false;
        } else {
          return true;
        }
      },
    },
    created() {
      // Thay đổi form title
      if (this.isDuplicate) {
        this.formTitle = RESOURCES.FORM_TITLE.USER.DUPLICATE;
      } else if (this.userIdUpdated) {
        this.formTitle = RESOURCES.FORM_TITLE.USER.UPDATE;
      } else {
        this.formTitle = RESOURCES.FORM_TITLE.USER.ADD;
      }
      // Truyền dữ liệu vào input khi Sửa
      if (this.userIdUpdated || this.isDuplicate) {
        try {
          // gọi api lấy dữ liệu truyền vào th employee
          HTTPUsers.get(`/${this.userIdUpdated}`).then((response) => {
            this.users = response.data;
            for(const property in this.users) {
              this.oldEmployee[property] = this.users[property]
            }
            // Lấy ra department được chọn
            const userSelected = this.users.find(
              (user) =>
              user.UserId === this.users?.UserId
            );
            this.users.UserName = userSelected.UserName;
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
          const res = await HTTPUsers.get(`/${this.userIdUpdated}`);
          this.users = res.data;
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
          var res = await HTTPUsers.get();
          this.users = res.data;
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
        this.users.Gender = e.target.childNodes[0]._value;
      },
      /**
       * author:Nguyễn Văn Ngọc(10/1/2023)
       * Hàm reset employee về mặc định
       */
      onDefaultEmployee() {
        return {
          CategoryCode:"",
          UserName:""
        };
      },
      /**
       * author:Nguyễn Văn Ngọc(4/1/2023)
       * Hàm onSavebtn Xử lí khi click nút cất
       */
      async onSavebtn(isSaveAndAdd) {
        console.log(this.users);
        var me = this;
        // validate
        if (!this.validate()) {
          this.onShowDialogChangeData(false,true,this.errorCodeMessage,null,this.titleLossData);
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
          const response = isAdd
            ? await HTTPUsers.post("", this.users)
            : await HTTPUsers.put(`/${this.userIdUpdated}`, this.users);
          this.$emit("changeToastMsg",toastMessage,false,true, RESOURCES.NOTIFICATION_TITLE.SUCCESS);
          this.$emit("onshowToast");
          this.$emit("onLoadData");
          this.isDuplicateCode = false;
          this.errorCodeMessage = "";
          this.productImages = {};
          if (isSaveAndAdd) {
            this.users = this.onDefaultEmployee();
            this.formTitle = RESOURCES.FORM_TITLE.USER.ADD;
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
        this.users.CategoryCode = response.data;
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
         if(JSON.stringify(this.onDefaultEmployee()) != JSON.stringify(this.users)) {
          this.onShowDialogChangeData(true,false,'', RESOURCES.MODAL_MESSAGE.INFO,'');
         }
         else {
            this.$emit("hideDialog");
         }
        }   
        else {
          if(JSON.stringify(this.oldEmployee) != JSON.stringify(this.users)){
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
        this.errorOject.UserId = isInvalid;
      },
  
      /**
       * author:Nguyễn Văn Ngọc(4/1/2023)
       * Hàm processPopup xử lí thông báo khi nhập liệu
       */
      processPopup() {
        let isValid = true;
        for(const property in this.errorOject) {
          if(this.errorOject[property]) {
              if(property == RESOURCES.UserId) {
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
  .modal.user {
    min-width: 600px;
    max-width: 675px;
    width: 700px;
    background-color: #fff;
    transition: all 0.1s linear;
    animation: down 0.1s linear;
  }
  .modal-main.user {
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
  .user-combo.modal-textfield .modal-textfield__input {
    width: 300px;
  }
  </style>
  
  
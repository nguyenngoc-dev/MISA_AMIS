<template>
  <div class="overlay" >
    <div class="modal" >
      <div class="modal__header">
        <div class="modal__header-left">
          <div class="modal__header-left-text">{{ formTitle }}</div>
          <label for="checkbox1" class="modal__header-left-wrapper tooltip">
            <input type="checkbox"   name="customer" value="customer"  id="checkbox1" />
            <span class="tooltiptext" style="min-width: 113px;padding: 0;left: -7px;">Đang phát triển</span>
            <div class="icon-checked"></div>
          </label>
          <span>Là khách hàng</span>
          <label for="checkbox2" class="modal__header-left-wrapper tooltip">
            <input type="checkbox"  name="supplier" value="supplier" id="checkbox2" />
            <span class="tooltiptext" style="min-width: 113px;padding: 0;left: -7px;">Đang phát triển</span>
            <div class="icon-checked"></div>
          </label>
          <span>Là nhà cung cấp</span>
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
            <span class="tooltiptext">Đóng (Esc)</span>
          </div>
        </div>
      </div>
      <div class="modal-main">
        <div class="modal-main-container">
          <div class="pb-16 flex-start">
            <div class="textfield">
              <label for="" class="textfield__label modal-label">
                Mã <span class="required">*</span>
              </label>
              <BaseInput
                :isErrorInput ="this.isCode || this.isCodeLoss || this.errorOject['EmployeeCode']"
                style="min-width: 149px; width: 149px; margin-right: 6px"
                v-model="employees.EmployeeCode"
                :name="'EmployeeCode'"
                :rules="['NOT_EMPTY','HAS_FORMAT']"
                :isCode="true"
                :tooltipMessage="errorCodeMessage"
                :errorMessage="this.errorOject['EmployeeCode']"
                placeholder="NV-12345"
                @errorInputMessage="validateInput"
                ref="EmployeeCode"
                tabindex="1"
              />
              <div class="text-error">{{ errorCodeMessage  }}</div>
              <!-- <div class="m-input__error-msg m-input__error-msg-short">{{ errorCodeMessage == "Mã hiện tại đang bị trùng"?errorCodeMessage:this.errorOject['EmployeeCode'] }}</div> -->
            </div>
            <div class="textfield">
              <label for="" class="textfield__label modal-label">
                Tên <span class="required">*</span>
              </label>
              <BaseInput
                :isErrorInput ="this.errorOject['FullName']"
                style="min-width: 233px; width: 233px"
                :inputType="'text'"
                v-model="employees.FullName"
                :rules="['NOT_EMPTY','MAX_LENGTH']"
                @errorInputMessage="validateInput"
                :name="'FullName'"
                ref="FullName"
                tabindex="1"
                
              />
              <p class="text-error">{{this.errorOject['FullName']}} </p>
              <!-- <p class="m-input__error-msg">{{ this.errorOject['FullName'] }}</p> -->
            </div>
          </div>

          <div class="textfield modal-textfield" style="margin-bottom: 16px">
            <BaseCombobox
              :comboName="'Đơn vị'"
              :errorMessage="this.errorOject['DepartmentId']?'Đơn vị không hợp lệ': null"
              :isUnit="errorOject['DepartmentId']"
              :api="'https://localhost:44387/api/v1/Departments'"
              :propName="'DepartmentName'"
              :rules="['NOT_EMPTY']"
              @errorInputMessage="validateInput"
              :propValue="'DepartmentId'"
              @invalidUnit="invalidUnit"
              :name="'DepartmentId'"
              ref="DepartmentId"
              v-model="this.employees.DepartmentId"
            />
          </div>
          <div class="textfield modal-textfield" style="margin-bottom: 12px">
            <label for="" class="textfield__label modal-label">
              Chức danh
            </label>
            <BaseInput 
            v-model="employees.Position" 
            tabindex="1" 
            :isErrorInput ="this.errorOject['Position']"
            :inputType="'text'"
            :rules="['MAX_LENGTH']"
            @errorInputMessage="validateInput"
            :name="'Position'"  
            ref="Position"
            />
          <p class="text-error">{{ this.errorOject['Position'] }}</p>
          </div>
        </div>
        <div class="flex-start" style="flex-direction: column; width: 414px">
          <div class="pb-16 flex-start">
            <div
              class="textfield modal-textfield"
              style="min-width: 166px; width: 166px"
            >
              <label for="" class="textfield__label modal-label pt-16">
                Ngày sinh
              </label>
              <BaseDatePicker
              v-model="employees.DateOfBirth"
              @errorInputMessage="validateInput"
              :tabIndex="2"
              :name="'DateOfBirth'"
              dateName="'DateOfBirthPicker'"
              :isErrorInput ="this.errorOject['DateOfBirth']"
              :rules="['ADULT']"
              :errorMsg="this.errorOject['DateOfBirth']"
              ref="DateOfBirth"
              />
              <!-- <div class="m-input__error-msg m-input__error-msg-short">{{this.errorOject['DateOfBirth']}}</div> -->
            </div>
            <div style="padding-left: 10px; margin-left: 6px">
              <label class="textfield__label modal-label pt-16">
                Giới tính
              </label>
              <div class="modal__gender">
                <label for="malegender" class="modal__gender-item" tabindex="2"
                @keyup.enter="onchecked($event)">
                  <input
                    type="radio"
                    name="gioitinh"
                    checked
                    id="malegender"
                    v-model="employees.Gender"
                    value="0"
                    tabindex="2"
                  />
                  <div class="icon-radio-checked"></div>
                </label>
                <span style="margin-left: 10px; margin-right: 20px">Nam</span>
                <label for="femalegender" class="modal__gender-item" tabindex="2"
                @keyup.enter="onchecked($event)"
                >
                  <input
                    type="radio"
                    name="gioitinh"
                    id="femalegender"
                    v-model="employees.Gender"
                    value="1"
                    tabindex="2"
                  />
                  <div class="icon-radio-checked"></div>
                </label>
                <span style="margin-left: 10px; margin-right: 20px">Nữ</span>
                <label for="other" class="modal__gender-item" tabindex="2"
                @keyup.enter="onchecked($event)">
                  <input
                    type="radio"
                    name="gioitinh"
                    id="other"
                    v-model="employees.Gender"
                    value="2"
                    tabindex="2"  
                  />
                  <div class="icon-radio-checked"></div>
                </label>
                <span style="margin-left: 10px">Khác</span>
              </div>
            </div>
          </div>
          <div class="pb-16 flex-start">
            <div
              class="textfield modal-textfield"
              style="min-width: 251px; width: 242px; margin-right: 6px"
            >
              <label for="" class="tooltip textfield__label modal-label pt-16">
                <span
                  class="tooltiptext"
                  style="width: 242px; font-size: 12px; left: -12%;"
                  >Số chứng minh nhân dân</span
                >
                Số CMND
              </label>
              <BaseInput
                style="min-width: 250px; width: 242px"
                v-model="employees.IdentityNumber"
                tabindex="4"
                :isErrorInput ="this.errorOject['IdentityNumber']"
                ref="IdentityNumber"
                :name="'IdentityNumber'"
                :rules="['HAS_FORMAT']"
                @errorInputMessage="validateInput"
              />
              <p class="text-error">{{ this.errorOject['IdentityNumber'] }}</p>
              <!-- <div class="m-input__error-msg ">{{ this.errorOject['IdentityNumber'] }}</div> -->
            </div>
            <div
              class="textfield modal-textfield pt-16"
              style="min-width: 166px; width: 166px"
            >
              <label for="" class="textfield__label modal-label">
                Ngày cấp
              </label>
              <BaseDatePicker
              v-model="employees.IdentityDate"
              @errorInputMessage="validateInput"
              :tabIndex="4"
              :name="'IdentityDate'"
              dateName="'IdentityDatePicker'"
              :isErrorInput ="this.errorOject['IdentityDate']"
              :rules="['ADULT']"
              :errorMsg="this.errorOject['IdentityDate']"
              ref="IdentityDate"
              />
              <!-- <div class="m-input__error-msg m-input__error-msg-short">{{this.errorOject['IdentityDate']}}</div> -->
            </div>
          </div>

          <div class="textfield modal-textfield" style="margin-bottom: 12px">
            <label for="" class="textfield__label modal-label"> Nơi cấp </label>
            <BaseInput
              style="min-width: 423px; width: 414px"
              v-model="employees.IdentityPlace"
              tabindex="6"
            />
          </div>
        </div>
        <div class="modal-contact">
          <div class="modal-contact__content">
            <div
              class="textfield modal-textfield full-w"
              style="margin-bottom: 18px"
            >
              <label for="" class="textfield__label modal-label">
                Địa chỉ
              </label>
              <BaseInput
                tabindex="7"
                class="full-w"
                v-model="employees.Address"
              />
            </div>
            <div class="modal-contact__content--middle">
              <div class="textfield" style="float: left; margin-bottom: 16px">
                <label for="" class="textfield__label modal-label">
                  Điện thoại di động
                </label>
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.PhoneNumber"
                  tabindex="8"
                  :isErrorInput ="this.errorOject['PhoneNumber']"
                  :name="'PhoneNumber'"
                  :rules="['HAS_FORMAT']"
                  @errorInputMessage="validateInput"
                  ref="PhoneNumber"
                />
                <p class="text-error">{{ this.errorOject['PhoneNumber'] }}</p>
                <!-- <div class="m-input__error-msg m-input__error-msg-normal">{{ this.errorOject['PhoneNumber'] }}</div> -->
              </div>
              <div class="textfield" style="float: left; margin-bottom: 16px">
                <label for="" class="textfield__label modal-label">
                  Điện thoại cố định
                </label>
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.LandlineNumber"
                  tabindex="9"
                  :isErrorInput ="this.errorOject['LandlineNumber']"
                  :rules="['HAS_FORMAT']"
                  @errorInputMessage="validateInput"
                  :name="'LandlineNumber'"
                  ref="LandlineNumber"
                />
              <p class="text-error">{{ this.errorOject['LandlineNumber'] }}</p>
              <!-- <div class="m-input__error-msg m-input__error-msg-normal">{{ this.errorOject['LandlineNumber'] }}</div> -->
              </div>
              <div class="textfield" style="float: left; margin-bottom: 16px">
                <label for="" class="textfield__label modal-label">
                  Email
                </label>
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.Email"
                  :isErrorInput ="this.errorOject['Email']"
                  placeholder="nguyen@gmail.com"
                  :rules="['HAS_FORMAT','MAX_LENGTH']"
                  @errorInputMessage="validateInput"
                  ref="Email"
                  :name="'Email'"
                  tabindex="10"
                />
                <p class="text-error">{{ this.errorOject['Email'] }}</p>
                <!-- <div class="m-input__error-msg m-input__error-msg-normal">{{ this.errorOject['Email'] }}</div> -->

              </div>
            </div>
            <div class="modal-contact__content--bottom">
              <div class="textfield" style="float: left; margin-bottom: 18px">
                <label for="" class="textfield__label modal-label">
                  Tài khoản ngân hàng
                </label>
                <BaseInput
                  tabindex="11"
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  :isErrorInput ="this.errorOject['BankAccount']"
                  v-model="employees.BankAccount"
                  ref="BankAccount"
                  :name="'BankAccount'"
                  :rules="['HAS_FORMAT']"
                  @errorInputMessage="validateInput"
                />
                <p class="text-error">{{ this.errorOject['BankAccount'] }}</p>
                <div class="m-input__error-msg m-input__error-msg-normal">{{ this.errorOject['BankAccount'] }}</div>

              </div>
              <div class="textfield" style="float: left; margin-bottom: 18px">
                <label for="" class="textfield__label modal-label">
                  Tên ngân hàng
                </label>
                <BaseInput
                  tabindex="12"
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.BankName"
                />
              </div>
              <div class="textfield" style="float: left; margin-bottom: 18px">
                <label for="" class="textfield__label modal-label">
                  Chi nhánh
                </label>
                <BaseInput
                  tabindex="13"
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.BankBranch"
                />
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
          :btnText="'Hủy'"
          :isprimary="false"
          @keydown.tab.prevent="onFocusFirstInput()"
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
            :tooltipContent="'Cất (Ctrl + S)'"
          >
          </BaseButton>
          <BaseButton
            @click="onSavebtn(true)"
            :btnText="'Cất và thêm'"
            :isShowTooltip="true"
            tabindex="15"
            :tooltipContent="'(Ctrl+Shift+S)'"
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
import axios from "axios";
import { ref } from "vue";
import BaseInput from "../../components/base/BaseInput.vue";
import BaseDatePicker from '../../components/base/BaseDatePicker.vue'
import RESOURCES from "../../js/base/resouce.js";
import KEYDOWN from "../../js/base/enums.js";
import { HTTP, HTTPDepartments } from "../../js/api/ConnectApi.js";

export default {
  components: {
    BaseInput,
    BaseDatePicker
  },
  emits: [
    "hideDialog",
    "onLoadData",
    "onshowToast",
    "onhideToast",
    "changeToastMsg",
  ],
  props: ["employeeIdUpdate", "isDuplicate"],

  data() {
    return {
      formTitle: RESOURCES.FORM_TITLE.ADD, // Title form
      isShowDialog: false, // show dialog báo lỗi khi nhập liệu
      validateError: [], //
      Departments: [], //Danh sách phòng ban
      DepartmentFilter: [], //Danh sách phòng ban tìm kiếm
      employees: this.onDefaultEmployee(), // object nhân viên
      departmentSelected: {}, // phòng ban được chọn
      isCode: false, // cờ thông báo mã khong hợp lệ
      oldEmployee:{},//nhân viên ban 
      errorOject:{},// object chứa lỗi 
      isName: false, // .... tên không hợp lệ
      newEmployeeCode:"",// lấy ra mã nhân viên mỗi lần click thêm mới
      isSaveAndAdd: false, // check xem có phải thêm và cất hay k
      isIndentityDate: false,
      RESOURCES,
      isUnit: false,
      isCodeLoss: false, // mã bị trùng
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
          this.employees.EmployeeCode = newCode;
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
      if (this.employeeIdUpdate) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    // Thay đổi form title
    if (this.isDuplicate) {
      this.formTitle = RESOURCES.FORM_TITLE.DUPLICATE;
    } else if (this.employeeIdUpdate) {
      this.formTitle = RESOURCES.FORM_TITLE.UPDATE;
    } else {
      this.formTitle = RESOURCES.FORM_TITLE.ADD;
    }
    // lấy dữ liệu phòng ban đẩy vào combobox
    this.getDepartment();
    // Truyền dữ liệu vào input khi Sửa
    if (this.employeeIdUpdate || this.isDuplicate) {
      try {
        // gọi api lấy dữ liệu truyền vào th employee
        HTTP.get(`/${this.employeeIdUpdate}`).then((response) => {
          this.employees = response.data;
          for(const property in this.employees) {
            this.oldEmployee[property] = this.employees[property]
          }
          // Lấy ra department được chọn
          const departmentSelected = this.Departments.find(
            (deparment) =>
              deparment.DepartmentId === this.employees?.DepartmentId
          );
          this.employees.DepartmentName = departmentSelected.DepartmentName;
        });
      } catch (error) {
        console.log(error);
      }
    }
    // click vào thêm mới hoặc nhân bản thì  gọi api lấy mã nhân viên mới để truyền vào input Mã nhân viên
    if (this.isAdd || this.isDuplicate) {
      this.employees.EmployeeCode = this.getNewEmCode();
    }
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
    // forcus vào ô mã nhân viên khi hiển thị form chi tiết
    var me = this;
    this.$refs.EmployeeCode.onFocus();
  },

  methods: {
       /**
     * author:Nguyễn Văn Ngọc(21/2/2023)
     * Hàm onKeyDown xử lí khi nhấn phím tắt
     */
    onKeyDown(event) {
      if(event.ctrlKey && (event.key === "S" || event.key === "s")) {
        event.preventDefault();
        this.onSavebtn(false)
      }
      if (event.ctrlKey && event.shiftKey && (event.key === "S" || event.key === "s")) {
        event.preventDefault();
        this.onSavebtn(true)
      }
      if(event.key == "Escape") {
        event.preventDefault();
        this.isChangeData();
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
        const res = await HTTP.get(`/${this.employeeIdUpdate}`);
        this.employees = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm getDepartment Lấy ra dữ liệu của phòng ban truyền vào combobox
     */

    async getDepartment() {
      try {
        var res = await HTTPDepartments.get();
        this.Departments = res.data;
        this.DepartmentFilter = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onBlurInput xử lí khi blur khỏi ô input
     */
    onBlurInput(inputName) {
      switch (inputName) {
        case this.employees.EmployeeCode:
          this.isValidFiled(this.employees.EmployeeCode, "EmployeeCode"); // kiểm tra mã
          break;
        case this.employees.FullName:
          this.isValidFiled(this.employees.FullName, "FullName"); // kiểm tra tên
          break;
        default:
          break;
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onFocusFirstInput tab index nhảy vào ô đầu tiên
     */
    onFocusFirstInput() {
      this.$refs.EmployeeCode.onFocus();
    },
     /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onFocusFirstInput tab index nhảy vào ô đầu tiên
     */
    onchecked(e) {
      this.employees.Gender = e.target.childNodes[0]._value;
    },
    /**
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm reset employee về mặc định
     */
    onDefaultEmployee() {
      return {
        EmployeeCode: "",
        FullName: "",
        DateOfBirth: null,
        Gender: 0,
        DepartmentId: "",
        IdentityNumber: "",
        IdentityDate: null,
        Position: "",
        IdentityPlace: "",
        Address: "",
        PhoneNumber: "",
        LandlineNumber: "",
        Email: "",
        BankAccount: "",
        BankName: "",
        BankBranch: "",
      };
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onSavebtn Xử lí khi click nút cất
     */
    async onSavebtn(isSaveAndAdd) {
      var me = this;
      // validate
      if (!this.validate()) {
        this.onShowDialogChangeData(false,true,this.errorCodeMessage,null,this.titleLossData);
      } else {
        // Chuyển giới tính thành số
        this.employees.Gender = parseInt(this.employees.Gender);
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
          case RESOURCES.ERRORCODE.DuplicateCode:
            this.isCodeLoss = true;
            this.onShowDialogChangeData(false,true,RESOURCES.FORM_MESSAGE.ERROR.DUPLICATE_CODE,"",error.response.data.MoreInfo.UserMsg);
            break;
          // eslint-disable-next-line
          case RESOURCES.ERRORCODE.InvalidInput:
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
          ? await HTTP.post("", this.employees)
          : await HTTP.put(`/${this.employeeIdUpdate}`, this.employees);
        this.$emit("changeToastMsg",toastMessage,false,true, RESOURCES.NOTIFICATION_TITLE.SUCCESS);
        this.$emit("onshowToast");
        this.$emit("onLoadData");
        this.isCodeLoss = false;
        this.errorCodeMessage = "";
        if (isSaveAndAdd) {
          this.employees = this.onDefaultEmployee();
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
      const response = await HTTP.get(`/new-employee-code`);
      this.employees.EmployeeCode = response.data;
      this.newEmployeeCode = response.data;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onShowDialog Xử lí ẩn hiện dialog thông báo
     */
    onShowDialog(state) {
      this.isShowDialog = state;
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
       if(JSON.stringify(this.onDefaultEmployee()) != JSON.stringify(this.employees)) {
        this.onShowDialogChangeData(true,false,'', RESOURCES.MODAL_MESSAGE.INFO,'');
       }
       else {
          this.$emit("hideDialog");
       }
      }   
      else {
        if(JSON.stringify(this.oldEmployee) != JSON.stringify(this.employees)){
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
        me.$refs[property].checkValidate()
      }
      var isValid = true;
      isValid = this.processPopup(); // Thông báo nếu có lỗi
      return isValid;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm isValidFiled kiểm tra các trường bắt buộc
     */
    isValidFiled(object, error) {
      if (!object) {
        this.errorOject[error] = "lỗi";
        this.errorCodeMessage = RESOURCES.FORM_MESSAGE.ERROR.INVALID_CODE
      } else {
        this.errorOject[error] = null;
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm invalidUnit kiểm tra đơn vị có hợp lệ hay không
     */
    invalidUnit(isInvalid) {
      this.errorOject.DepartmentId = isInvalid;
    },

    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm processPopup xử lí thông báo khi nhập liệu
     */
    processPopup() {
      let isValid = true;
      for(const property in this.errorOject) {
        if(this.errorOject[property]) {
            if(property == 'DepartmentId') {
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


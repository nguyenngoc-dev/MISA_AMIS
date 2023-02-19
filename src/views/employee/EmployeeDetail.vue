<template>
  <div class="overlay" @keydown.ctrl.s.prevent="onSavebtn(false)"
  @keyup.ctrl.shift.s="onSavebtn(true)">
    <div class="modal"  @keydown.esc="isChangeData()">
      <div class="modal__header">
        <div class="modal__header-left">
          <div class="modal__header-left-text">{{ formTitle }}</div>
          <label for="radio1" class="modal__header-left-wrapper">
            <input type="radio" name="doituong" checked id="radio1" />
            <div class="icon-checked"></div>
          </label>
          <span>Là khách hàng</span>
          <label for="radio2" class="modal__header-left-wrapper">
            <input type="radio" name="doituong" id="radio2" />
            <div class="icon-checked"></div>
          </label>
          <span>Là nhà cung cấp</span>
        </div>
        <div class="modal__header-right">
          <div class="icon-help tooltip">
            <span class="tooltiptext">Giúp (F1)</span>
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
          <div class="pb-12 flex-start">
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
                placeholder="NV-12345"
                @errorInputMessage="validateInput"
                ref="EmployeeCode"
                tabindex="1"
                @blur="onBlurInput(employees.EmployeeCode)"
              />
              <p class="text-error">{{ errorCodeMessage }}</p>
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
                :rules="['NOT_EMPTY']"
                @errorInputMessage="validateInput"
                :name="'FullName'"
                ref="FullName"
                tabindex="1"
                @blur="onBlurInput(employees.FullName)"
              />

              <p class="text-error">Tên nhân viên không được để trống</p>
            </div>
          </div>

          <div class="textfield modal-textfield" style="padding-bottom: 12px">
            <BaseCombobox
              :comboName="'Đơn vị'"
              :errorMessage="'Đơn vị không hợp lệ'"
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
          <div class="textfield modal-textfield" style="padding-bottom: 12px">
            <label for="" class="textfield__label modal-label">
              Chức danh
            </label>
            <BaseInput v-model="employees.Position" tabindex="5" />
          </div>
        </div>
        <div class="flex-start" style="flex-direction: column; width: 414px">
          <div class="pb-12 flex-start">
            <div
              class="textfield modal-textfield"
              style="min-width: 166px; width: 166px"
            >
              <label for="" class="textfield__label modal-label pt-16">
                Ngày sinh
              </label>

              <DatePicker
                style="min-width: 166px; width: 166px"
                class="textfield__input datepicker"
                v-model="employees.DateOfBirth"
                :format="format"
                tabindex="2"
                :disabled-dates="disabledDate"
                :enable-time-picker="false"
                @update:modelValue="changeDateValue()"
                :esc-close="true"
                placeholder="DD/MM/YYYY"
                ref="DateOfBirth"
                locale="vi"
                text-input
                now-button-label="Hôm nay"
                auto-apply
                close-on-scroll
                show-now-button
                :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
              />
            </div>

            <div style="padding-left: 10px; margin-left: 6px">
              <label class="textfield__label modal-label pt-16">
                Giới tính
              </label>
              <div class="modal__gender">
                <label for="malegender" class="modal__gender-item">
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
                <label for="femalegender" class="modal__gender-item">
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
                <label for="other" class="modal__gender-item">
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
          <div class="pb-12 flex-start">
            <div
              class="textfield modal-textfield"
              style="min-width: 242px; width: 242px; margin-right: 6px"
            >
              <label for="" class="tooltip textfield__label modal-label pt-16">
                <span
                  class="tooltiptext"
                  style="width: 200px; font-size: 12px; left: -12%;"
                  >Số chứng minh nhân dân</span
                >
                Số CMND
              </label>
              <BaseInput
                style="min-width: 242px; width: 242px"
                v-model="employees.IdentityNumber"
                tabindex="4"
                :isErrorInput ="this.errorOject['IdentityNumber']"
                ref="IdentityNumber"
                  :name="'IdentityNumber'"
                placeholder="038205673319"
                :rules="['HAS_FORMAT']"
                @errorInputMessage="validateInput"
              />
              <p class="text-error">Số căn cước không hợp lệ</p>
            </div>
            <div
              class="textfield modal-textfield pt-16"
              style="min-width: 166px; width: 166px"
            >
              <label for="" class="textfield__label modal-label">
                Ngày cấp
              </label>

              <DatePicker
                style="min-width: 166px; width: 166px"
                class="textfield__input datepicker"
                v-model="employees.IdentityDate"
                :format="format"
                tabindex="4"
                ref="IdentityDate"
                :disabled-dates="disabledDate"
                :enable-time-picker="false"
                @update:modelValue="changeDateValue"
                placeholder="DD/MM/YYYY"
                locale="vi"
                text-input
                now-button-label="Hôm nay"
                auto-apply
                close-on-scroll
                show-now-button
                :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
              />
            </div>
          </div>

          <div class="textfield modal-textfield" style="padding-bottom: 12px">
            <label for="" class="textfield__label modal-label"> Nơi cấp </label>
            <BaseInput
              style="min-width: 414px; width: 414px"
              v-model="employees.IdentityPlace"
              tabindex="6"
            />
          </div>
        </div>
        <div class="modal-contact">
          <div class="modal-contact__content">
            <div
              class="textfield modal-textfield full-w"
              style="padding-bottom: 12px"
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
              <div class="textfield" style="float: left; padding-bottom: 12px">
                <label for="" class="textfield__label modal-label">
                  Điện thoại di động
                </label>
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.PhoneNumber"
                  placeholder="0333258458"
                  tabindex="8"
                  :isErrorInput ="this.errorOject['PhoneNumber']"
                  :name="'PhoneNumber'"
                  :rules="['HAS_FORMAT']"
                  @errorInputMessage="validateInput"
                  ref="PhoneNumber"
                />
                <p class="text-error">Số diện thoại không hợp lệ</p>
              </div>
              <div class="textfield" style="float: left; padding-bottom: 12px">
                <label for="" class="textfield__label modal-label">
                  Điện thoại cố định
                </label>
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.LandlineNumber"
                  placeholder="0333258458"
                  tabindex="9"
                  :isErrorInput ="this.errorOject['LandlineNumber']"
                  :rules="['HAS_FORMAT']"
                  @errorInputMessage="validateInput"
                  :name="'LandlineNumber'"
                  ref="LandlineNumber"
                />
              <p class="text-error">Số diện thoại cố định không hợp lệ</p>
              </div>
              <div class="textfield" style="float: left; padding-bottom: 12px">
                <label for="" class="textfield__label modal-label">
                  Email
                </label>
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.Email"
                  :isErrorInput ="this.errorOject['Email']"
                  placeholder="nguyen@gmail.com"
                  :rules="['HAS_FORMAT']"
                  @errorInputMessage="validateInput"
                  ref="Email"
                  :name="'Email'"
                  tabindex="10"
                />
                <p class="text-error">Email không hợp lệ</p>
              </div>
            </div>
            <div class="modal-contact__content--bottom">
              <div class="textfield" style="float: left; padding-bottom: 12px">
                <label for="" class="textfield__label modal-label">
                  Tài khoản ngân hàng
                </label>
                <BaseInput
                  tabindex="11"
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  placeholder="533325845758"
                  :isErrorInput ="this.errorOject['BankAccount']"
                  v-model="employees.BankAccount"
                  ref="BankAccount"
                  :name="'BankAccount'"
                  :rules="['HAS_FORMAT']"
                  @errorInputMessage="validateInput"
                />
                <p class="text-error">Số tài khoản ngân hàng không hợp lệ</p>
              </div>
              <div class="textfield" style="float: left; padding-bottom: 12px">
                <label for="" class="textfield__label modal-label">
                  Tên ngân hàng
                </label>
                <BaseInput
                  tabindex="12"
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.BankName"
                />
              </div>
              <div class="textfield" style="float: left; padding-bottom: 12px">
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
      <div class="line"></div>
      <div class="modal-footer">
        <BaseButton
          class="btn btn-secondary modal-btn-cancel"
          tabindex="14"
          @click="$emit('hideDialog')"
          :btnText="'Hủy'"
          :isprimary="false"
        />
        <div class="modal-footer__wrapper">
          <BaseButton
            class="modal-btn__secondary"
            :isSecondary="true"
            :isprimary="false"
            @click="onSavebtn(false)"
            :btnText="'Cất'"
            :isShowTooltip="true"
            tabindex="15"
            :tooltipContent="'Cất (Ctrl + S)'"
          >
          </BaseButton>
          <BaseButton
            @click="onSavebtn(true)"
            :btnText="'Cất và thêm'"
            :isShowTooltip="true"
            tabindex="16"
            :tooltipContent="'Cất và thêm'"
            @keydown.tab.prevent="onFocusFirstInput()"
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
import RESOURCES from "../../js/base/resouce.js";
import KEYDOWN from "../../js/base/enums.js";
import { HTTP, HTTPDepartments } from "../../js/api/ConnectApi.js";

export default {
  components: {
    BaseInput,
  },
  setup() {
    var me = this;
    const date = ref(new Date());
    // In case of a range picker, you'll receive [Date, Date]
    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    };

    return {
      date,
      format,
    };
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
      employees: this.onDefaultEmployee(""), // object nhân viên
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
    employees: {
      handler: function (newValue) {},
      deep: true,
    },
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
    // forcus vào ô mã nhân viên khi hiển thị form chi tiết
    var me = this;
    this.$refs.EmployeeCode.onFocus();
  },

  methods: {
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm validateInput check vidate ô input
     */
    validateInput(name,errorMessage) {
      this.errorOject[name] = errorMessage;
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm changeDateValue đóng menu khi chọn ngày
     */
    changeDateValue() {
      this.$refs.DateOfBirth.closeMenu();
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
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm reset employee về mặc định
     */
    onDefaultEmployee(employeeCode) {
      return {
        EmployeeCode: employeeCode,
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
      // Chuyển giới tính thành số
      // validate
      if (!this.validate()) {
        this.onShowDialogChangeData(false,true,this.errorCodeMessage,null,this.titleLossData);
      } else {
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
      } else if (error.response.status == RESOURCES.STATUSCODE.ServerError) {
        // Chọn toast sửa
        this.$emit("changeToastMsg",RESOURCES.FORM_MODE.ERROR,true,false,RESOURCES.NOTIFICATION_TITLE.ERROR);
        this.$emit("onshowToast");
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
          this.employees = this.onDefaultEmployee("");
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
      // trường hợp thêm mới
      if(this.isAdd) {
       if(JSON.stringify(this.onDefaultEmployee(this.newEmployeeCode)) != JSON.stringify(this.employees)) {
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
      console.log(this.errorOject)
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
     * Disable ngày lớn hơn ngày hiện tại
     * Author: Nguyễn Văn Ngọc (10/2/2023)
     */

    disabledDate(time) {
      return time.getTime() > Date.now();
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
          this.titleLossData = this.errorOject[property];
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


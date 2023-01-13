<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__header">
        <div class="modal__header-left">
          <div class="modal__header-left-text">Thông tin nhân viên</div>
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
            @click="onShowDialogChangeData()"
            class="icon-close tooltip"
            for="show-modal"
          >
            <span class="tooltiptext">Đóng (Esc)</span>
          </div>
        </div>
      </div>
      <div class="modal-main">
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            width: 414px;
            padding-right: 26px;
          "
        >
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
              padding-bottom: 12px;
            "
          >
            <div class="textfield">
              <label for="" class="textfield__label modal-label">
                Mã <span class="required">*</span>
              </label>
              <BaseInput
                :class="{
                  'textfield--error-input': this.isCode || this.isCodeLoss,
                }"
                style="min-width: 149px; width: 149px; margin-right: 6px"
                v-model="employees.EmployeeCode"
                ref="EmployeeCode"
              />
              <p class="text-error">{{ errorCodeMessage }}</p>
            </div>
            <div class="textfield">
              <label for="" class="textfield__label modal-label">
                Tên <span class="required">*</span>
              </label>
              <BaseInput
                :isErrorInput="this.isName"
                :class="{
                  'textfield--error-input': this.isName,
                }"
                style="min-width: 233px; width: 233px"
                :inputType="'text'"
                v-model="employees.FullName"
                @focus="employees.isName = false"
                
              />

              <p class="text-error">Tên nhân viên không được để trống</p>
            </div>
          </div>
          <div class="textfield modal-textfield" style="padding-bottom: 12px">
            <label for="" class="textfield__label modal-label">
              Đơn vị <span class="required">*</span>
              <label
                for="donvi"
                class="modal-icon textfield__icon"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  transform: translate(-1px, -2px);
                  height: 35px !important;
                "
                tabindex="0"
                @click="isCheck()"
              >
                <div class="icon-dropdown"></div>
              </label>
              <!-- <input
                ref="checkDv"
                :checked="isCheckDV"
                type="checkbox"
                name=""
                id="donvi"
              /> -->
            </label>
            <input
              type="text"
              :class="{
                textfield__input: true,
                'modal-textfield__input': true,
                'textfield--error-input': this.isUnit,
              }"
              v-model="employees.DepartmentName"
              @focus="this.isUnit = false"
            />
            <p class="text-error">Đơn vị không được để trống</p>
            <ul
              :class="{
                'textfield-list': true,
                'modal-list': true,
                'show-list': isCheckDV,
              }"
            >
              <li class="textfield-item">CÔNG TY CỔ PHẦN MISA</li>
              <li
                :class="{'textfield-item':true,
                  active: index === itemActive}"
                v-for="(item, index) in Departments"
                :key="index"
                @click="setDepartment(item,index)"
                :value="item.DepartmentId"
              >
                {{ item.DepartmentName }}
              </li>
            </ul>
          </div>
          <div class="textfield modal-textfield" style="padding-bottom: 12px">
            <label for="" class="textfield__label modal-label">
              Chức danh
            </label>
            <BaseInput v-model="employees.PositionName" />
            <!-- <input
              type="text"
              class="textfield__input modal-textfield__input"
              property-name="PositionName"
              v-model="employees.PositionName"
            /> -->
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            width: 414px;
          "
        >
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
              padding-bottom: 12px;
            "
          >
            <div
              class="textfield modal-textfield"
              style="min-width: 166px; width: 166px"
            >
              <label for="" class="textfield__label modal-label">
                Ngày sinh
              </label>

              <DatePicker
                style="min-width: 166px; width: 166px"
                class="textfield__input datepicker"
                v-model="employees.DateOfBirth"
                :format="format"
              />
            </div>

            <div style="padding-left: 10px; margin-left: 6px">
              <label class="textfield__label modal-label"> Giới tính </label>
              <div class="modal__gender">
                <label for="malegender" class="modal__gender-item">
                  <input
                    type="radio"
                    name="gioitinh"
                    checked
                    id="malegender"
                    v-model="employees.Gender"
                    value="0"
                  />
                  <div class="icon-radio-checked"></div>
                </label>
                <span style="margin-left: 10px; margin-right: 20px">Nam</span>
                <label for="femalegender" class="modal__gender-item">
                  <input
                    type="radio"
                    name="gioitinh"
                    id="femalegender"
                    property-name="GenderName"
                    v-model="employees.Gender"
                    value="1"
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
                  />
                  <div class="icon-radio-checked"></div>
                </label>
                <span style="margin-left: 10px">Khác</span>
              </div>
            </div>
          </div>
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
              padding-bottom: 12px;
            "
          >
            <div
              class="textfield modal-textfield"
              style="min-width: 242px; width: 242px; margin-right: 6px"
            >
              <label for="" class="tooltip textfield__label modal-label">
                <span
                  class="tooltiptext"
                  style="width: 200px; font-size: 12px; left: 27%"
                  >Số chứng minh nhân dân</span
                >
                Số CMND
              </label>
              <!-- <input
                type="text"
                class="textfield__input modal-textfield__input"
                style="min-width: 242px; width: 242px"
                v-model="employees.IdentityNumber"
              /> -->
              <BaseInput
                style="min-width: 242px; width: 242px"
                v-model="employees.IdentityNumber"
              />
            </div>
            <div
              class="textfield modal-textfield"
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
              />
            </div>
          </div>

          <div class="textfield modal-textfield" style="padding-bottom: 12px">
            <label for="" class="textfield__label modal-label"> Nơi cấp </label>
            <!-- <input
              type="text"
              class="textfield__input modal-textfield__input"
              style="min-width: 414px; width: 414px"
              v-model="employees.IdentityPlace"
            /> -->
            <BaseInput
              style="min-width: 414px; width: 414px"
              v-model="employees.IdentityPlace"
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
              <!-- <input
                type="text"
                class="textfield__input modal-textfield__input full-w"
                v-model="employees.Address"
              /> -->
              <BaseInput class="full-w" v-model="employees.Address" />
            </div>
            <div class="modal-contact__content--middle">
              <div class="textfield" style="float: left; padding-bottom: 12px">
                <label for="" class="textfield__label modal-label">
                  Điện thoại di động
                </label>
                <!-- <input
                  type="text"
                  class="textfield__input"
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.PhoneNumber"
                /> -->
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.PhoneNumber"
                />
              </div>
              <div class="textfield" style="float: left; padding-bottom: 12px">
                <label for="" class="textfield__label modal-label">
                  Điện thoại cố định
                </label>
                <!-- <input
                  type="text"
                  class="textfield__input"
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.PhoneNumber"
                /> -->
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.PhoneNumber"
                />
              </div>
              <div class="textfield" style="float: left; padding-bottom: 12px">
                <label for="" class="textfield__label modal-label">
                  Email
                </label>
                <!-- <input
                  type="text"
                  class="textfield__input"
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  id="Email"
                  v-model="employees.Email"
                /> -->
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  v-model="employees.Email"
                />
              </div>
            </div>
            <div class="modal-contact__content--bottom">
              <div class="textfield" style="float: left; padding-bottom: 12px">
                <label for="" class="textfield__label modal-label">
                  Tài khoản ngân hàng
                </label>
                <!-- <input
                  type="text"
                  class="textfield__input"
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                  id="BankAccount"
                /> -->
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                />
              </div>
              <div class="textfield" style="float: left; padding-bottom: 12px">
                <label for="" class="textfield__label modal-label">
                  Tên ngân hàng
                </label>
                <!-- <input
                  type="text"
                  class="textfield__input"
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                /> -->
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                />
              </div>
              <div class="textfield" style="float: left; padding-bottom: 12px">
                <label for="" class="textfield__label modal-label">
                  Chi nhánh
                </label>
                <!-- <input
                  type="text"
                  class="textfield__input"
                  style="min-width: 186px; width: 186px; margin-right: 12px"
                /> -->
                <BaseInput
                  style="min-width: 186px; width: 186px; margin-right: 12px"
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
          tabindex="0"
          @click="$emit('hideDialog')"
          :btnText="'Hủy'"
          :isprimary="false"
        />

        <div class="modal-footer__wrapper">
          <!-- <BaseButton
            class="tooltip modal-btn__secondary"
            :isSecondary="true"
            :isprimary="false"
            @click="onSavebtn()"
          >
          Cất
            <span style="padding: 0; font-weight: 100" class="tooltiptext"
              >Cất (Ctrl + S)</span>
          </BaseButton> -->
          <button
            id="btn-save"
            class="tooltip btn btn-secondary modal-btn__secondary"
            @click="onSavebtn()"
          >
            Cất
            <span style="padding: 0; font-weight: 100" class="tooltiptext"
              >Cất (Ctrl + S)</span
            >
          </button>
          <button
            @click="onSaveAndAddBtn()"
            id="btn-save-add"
            class="tooltip btn btn-primary"
          >
            Cất và thêm
            <span style="padding: 0" class="tooltiptext">Cất và thêm</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <BaseDialog
    :errorMessage="titleLossData"
    v-if="isShowDialog"
    :isNotice="isNotice"
    :isDelete="isDelete"
    :isQuestion="isQuestion"
    @onHideDialog="onShowDialog(false)"
    :questionMessage="questionMessage"
    :showBtnCancel="showBtnCancel"
    :btnCancelText="'Hủy'"
    :dialogHeader="'Cảnh báo'"
    :showBtnChangeVal="showBtnChangeVal"
    @onHideEmpDetail="$emit('hideDialog')"
    @onSaveBtn="this.onSavebtn"
  />
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import BaseInput from "../../components/base/BaseInput.vue";
import {toastMsgText} from "../../js/base/resouce.js"
export default {
  components: {
    BaseInput,
  },
  setup() {
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
    "nullIdSelected",
    "changeToastMsg"
  ],
  props: ["employeeIdUpdate", "employeeList", "isDuplicate"],

  data() {
    return {
      isShowDialog: false, // show dialog báo lỗi khi nhập liệu
      validateError: [], //
      Departments: [], //Danh sách phòng ban
      isCheckDV: false, // check để sổ dữ liệu phòng ban
      employees: {}, // object nhân viên
      DepartmentIdSelected: "", // id phòng ban được chọn
      isCode: false, // cờ thông báo mã khong hợp lệ
      isName: false, // .... tên không hợp lệ
      isEmail: false, // .. email khoog hợp lệ
      isDateOfBirth: false, // .. ngày tháng không hợp lệ
      isIndentityDate: false,
      isUnit: false,
      isCodeLoss: false, // mã bị trùng
      titleLossData: "", // Thông báo khi nhập liệu sai
      errorCodeMessage: "", // thông báo lỗi của mã nhân viên
      isDelete: false, // có phải dialog xóa?
      isNotice: true, // có phải dialog cảnh báo
      isQuestion: false, // có phải dialog cảnh báo thay đổi dữ liệu
      questionMessage: "",
      itemActive: null, // set class active cho list item selected
      showBtnCancel: false, // show nút không ở dialog
      showBtnChangeVal: false, // show nút thay đổi ở dialog khi click vào x
    };
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
    // lấy dữ liệu phòng ban đẩy vào combobox
    this.getDepartment();
    // Truyền dữ liệu vào input khi Sửa
    if (this.employeeIdUpdate || this.isDuplicate) {
      // gọi api lấy dữ liệu truyền vào th employee
      axios
        .get(
          `https://cukcuk.manhnv.net/api/v1/Employees/${this.employeeIdUpdate}`
        )
        .then((response) => {
          this.employees = response.data;
          // Lấy ra department được chọn
          const departmentSelected = this.Departments.find(
            (deparment) =>
              deparment.DepartmentId === this.employees?.DepartmentId
          );
          this.employees.DepartmentName = departmentSelected.DepartmentName;
          console.log("deparment: ", departmentSelected.DepartmentName);
        });
    }

    // click vào thêm mới hoặc nhân bản thì  gọi api lấy mã nhân viên mới để truyền vào input Mã nhân viên
    if (this.isAdd || this.isDuplicate) {
      this.getNewEmCode();
    }
  },
  mounted() {
    // forcus vào ô mã nhân viên khi hiển thị form chi tiết
  },

  methods: {
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm getEmpById Lấy ra dữ liệu của phòng ban truyền vào combobox
     */
    async getEmpById() {
      const res = await axios.get(
        `https://cukcuk.manhnv.net/api/v1/Employees/${this.employeeIdUpdate}`
      );
      this.employees = res.data;
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm getDepartment Lấy ra dữ liệu của phòng ban truyền vào combobox
     */

    async getDepartment() {
      const res = await axios.get("https://cukcuk.manhnv.net/api/v1/Departments");
      this.Departments = res.data;
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm isCheck set trạng thái khi click vào icon dropdown của đơn vị
     */
    isCheck(state) {
      this.isCheckDV = !this.isCheckDV;
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm setDepartment truyền name và id cho employee khi click vào một phòng ban
     */
    setDepartment(item,index) {
      this.employees.DepartmentName = item.DepartmentName;
      this.employees.DepartmentId = item.DepartmentId;
      this.isCheckDV = false;
      this.itemActive = index;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onSavebtn Xử lí khi click nút cất
     */
    async onSavebtn() {
      // validate
      if (!this.validate()) {
        this.isShowDialog = true;
        this.isNotice = true;
        this.showBtnCancel = false;
        this.isQuestion = false;
        this.showBtnChangeVal = false;
        this.questionMessage = "";
      } else {
        if (this.isAdd) {
          // ckeck mã trùng
          if (!this.checkCode(this.employees.EmployeeCode)) {
            this.errorCodeMessage = "Mã nhân viên đã tồn tại";
            this.titleLossData = "Mã nhân viên đã tồn tại";
          }
          console.log(this.isCodeLoss);
          // xử lí khi thêm
          // gọi đến api thêm nhân viên
          await axios
            .post(`https://cukcuk.manhnv.net/api/v1/Employees`, this.employees)
            .then((response) => {
              console.log(response);
              // hiển thị toast thông báo thành công
              this.$emit('changeToastMsg');
              this.$emit("onshowToast");
            });

          // load lại danh sách
          this.$emit("onLoadData");
          // đóng form
          this.$emit("hideDialog");
        } else {
          // xử lí khi sửa
          // gọi đến api thêm nhân viên
          await axios
            .put(
              `https://cukcuk.manhnv.net/api/v1/Employees/${this.employeeIdUpdate}`,
              this.employees
            )
            .then((response) => {
              console.log(response);
              // hiển thị toast thông báo thành công
              this.$emit("onshowToast");
            });

          // load lại danh sách
          this.$emit("onLoadData");
          // đóng form
          this.$emit("hideDialog");
        }
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(7/1/2023)
     * Hàm onSaveAndAddBtn Xử lí khi click nút cất và thêm
     */
    async onSaveAndAddBtn() {
      console.log(this.employees);
      if (!this.validate()) {
        this.isShowDialog = true;
        this.isNotice = true;
        this.showBtnCancel = false;
        this.isQuestion = false;
        this.showBtnChangeVal = false;
        this.questionMessage = "";
      } else {
        if (this.isAdd) {
          // ckeck mã trùng

          if (!this.checkCode(this.employees.EmployeeCode)) {
            this.errorCodeMessage = "Mã nhân viên đã tồn tại";
            this.titleLossData = "Mã nhân viên đã tồn tại";
          }
          // xử lí khi thêm
          // gọi đến api thêm nhân viên
          
          await axios
            .post(`https://cukcuk.manhnv.net/api/v1/Employees`, this.employees)
            .then((response) => {
              console.log(response);
              console.log("nv", this.employees);
            });

          // load lại danh sách
          this.$emit("onLoadData");
          // Làm mới form
          this.employees = {};
          // lấy mã nhân viên với
          this.getNewEmCode();
        } else {
          // xử lí khi sửa
          // gọi đến api thêm nhân viên
          await axios
            .put(
              `https://cukcuk.manhnv.net/api/v1/Employees/${this.employeeIdUpdate}`,
              this.employees
            )
            .then((response) => {
              console.log(response);
            });
          // load lại danh sách
          this.$emit("onLoadData");
          // Làm mới form
          this.employees = {};
          // lấy mã nhân viên với
          this.getNewEmCode();
          // set id update = null
          //this.$emit("nullIdSelected");
        }
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(2/1/2023)
     * Hàm getNewEmCode lấy mã nhân viên mới
     */
    getNewEmCode() {
      axios
        .get(`https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode`)
        .then((response) => {
          this.employees.EmployeeCode = response.data;
        });
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onShowDialog Xử lí ẩn hiện dialog thông báo
     */
    onShowDialog(state) {
      this.isShowDialog = state;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onShowDialogChangeData Xử lí dialog thông báo
     * data thay đổi khi click vào nút x
     */
    onShowDialogChangeData() {
      this.isQuestion = true;
      this.isNotice = false;
      this.isShowDialog = true;
      this.showBtnCancel = true;
      this.showBtnChangeVal = true;
      this.titleLossData = "";
      this.questionMessage = "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?";
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm validate validate khi click nút cất hoặc cất và thêm
     */
    validate() {
      var ch = true;
      if (
        !this.employees.EmployeeCode ||
        !this.employees.FullName ||
        !this.employees.DepartmentName
      ) {
        ch = false;
      } else {
        ch = true;
      }
      this.valiCode(); // kiểm tra mã
      this.valiName(); // kiểm tra tên
      //this.valiEmail(); // kiểm tra email

      this.valiUnit(); // kiểm tra phòng ban
      this.processPopup();
      return ch;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm valiCode kiểm tra mã
     */
    valiCode() {
      // mã khongo được để trống
      if (!this.employees.EmployeeCode) {
        this.isCode = true;
      } else {
        this.isCode = false;
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm valiUnit kiểm tra phòng ban
     */
    valiUnit() {
      // phòng ban không được để trống
      if (!this.employees.DepartmentName) {
        this.isUnit = true;
      } else {
        this.isUnit = false;
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm valiUnit kiểm tra tên
     */
    valiName() {
      // tên không được đẻ trống
      if (!this.employees.FullName) {
        this.isName = true;
      } else {
        this.isName = false;
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm valiEmail kiểm tra email
     */
    valiEmail() {
      // email phải đúng định dạng
      var regex = /^\w+\@\w+\.\w+$/;
      var check = true;
      if (this.employees.Email != null && !regex.test(this.employees.Email)) {
        this.isEmail = true;
        check = false;
      }
      //khong được dể trống
      return check;
    },

    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm valiDateTime kiểm tra ngày tháng
     */
    valiDateTime(str) {
      let check = true;
      if (str != null) {
        let dob = new Date(str);
        if (dob instanceof Date && !isNaN(dob)) {
          if (dob - new Date() >= 0) {
            check = false;
          } else {
            check = true;
          }
        } else {
          check = false;
        }
      }
      return check;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm checkCode kiểm tra mã trùng
     */
    checkCode(res) {
      let check = true;
      for (const e of this.employeeList) {
        if (res == e.EmployeeCode) {
          // Nếu trùng thì thông báo
          check = false;
          this.isCodeLoss = true;
          break;
        }
        this.isCodeLoss = false;
      }
      return check;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm processPopup xử lí thông báo khi nhập liệu
     */
    processPopup() {
      if (this.isCode) {
        this.titleLossData = "Mã nhân viên không được để trống";
        this.errorCodeMessage = "Mã nhân viên không được để trống";
      } else if (this.isName) {
        this.titleLossData = "Tên nhân viên không được để trống";
      } else if (this.isDateOfBirth || this.isIndentityDate) {
        this.titleLossData = "Ngày tháng không hợp lệ";
      } else if (this.isUnit) {
        this.titleLossData = "Đơn vị không được để trống";
      }
      // else if (!this.valiEmail()) {
      //   this.titleLossData = "Email không đúng định dạng";
      //}
      else {
        this.titleLossData = "";
      }
    },
  },
};
</script>
<style >
.dp__input_icon_pad {
  padding-left: 0;
}
.dp__input {
  border: none !important;
}
.dp__clear_icon {
  display: none;
}
.dp__input_icon {
  left: unset;
  right: 0;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -125px -310px;
  margin-right: 0;
}
.dp__input:hover {
  background-color: #f6f6f6;
}
.dp__input_icons {
  display: inline-block;
  width: 0;
  height: 1rem;
  stroke-width: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 3px 12px;
  color: var(--dp-icon-color);
  box-sizing: content-box;
}
</style>
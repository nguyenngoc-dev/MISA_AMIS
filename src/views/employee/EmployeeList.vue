<template>
  <div class="content" @keydown.insert="showDialog(true)">
    <div class="content__header" @keydown.insert="showDialog(true)">
      <div class="content__header-text">Nhân viên</div>
      <BaseButton
        :btnText="'Thêm mới nhân viên'"
        @click="showDialog(true)"
        class="btn-add-emp"
      />
    </div>
    <div class="content-wrapper">
      <div
        class="content-wrapper__action"
        style="justify-content: space-between"
      >
        <div class="content-wrapper__action--muiltiple">
        <button
          class="btn btn-secondary modal-btn-cancel content-wrapper-btn--muiltiple"
          :class="{'disable-btn' : isDisableButton}"
          :isprimary="false"
          :disabled = isDisableButton
          @click="this.isShowBtnDelete = !this.isShowBtnDelete"
        >
        Thực hiện hàng loạt
          <div class="icon-dropdown content-wrapper-btn-icon" ></div> 
          <div
          v-show="this.isShowBtnDelete"
            @click="onDeleteClick(true)"
            class = "btn btn-secondary modal-btn-cancel content-wrapper-btn--action"
          >Xóa </div>
        </button>
        </div>

        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div class="textfield">
            <label for="" class="textfield__label">
              <div
                @click="searchData()"
                class="icon-search sidebar-item__icon content-icon"
              ></div>
            </label>
            <input
              class="textfield__input"
              v-model="textSearch"
              placeholder="Tìm kiếm trong danh sách"
              @change="searchData()"
            />
          </div>
          <div
            class="
              tooltip
              icon-export
              sidebar-item__icon
              content-wrapper__action-refresh
            "
            @click="exportData()"
          >
            <span class="tooltiptext">Xuất khẩu</span>
          </div>
          <div
            class="
              tooltip
              icon-reload
              sidebar-item__icon
              content-wrapper__action-refresh
            "
            @click="onLoadCurrentpage(this.currentPageNum)"
          >
            <span class="tooltiptext">Lấy dữ liệu</span>
          </div>
        </div>
      </div>
      <div class="grid-table">
        <table class="tbl">
          <!-- <thead> -->
          <tbody>
            <tr class="tbl-row" style="position: sticky; top: 0; z-index: 10">
              <th class="tbl-col" style="z-index: 99">
                <BaseInput
                  type="checkbox"
                  id="checkAll"
                  @change="handleCheckAll"
                  :checked="
                    checkList.length != 0 &&
                    checkList.length === employees.length &&
                    checkAll()
                  "
                />
                <label for="checkAll" class="mask">
                  <div class="icon-checked"></div>
                </label>
              </th>
              <th class="tbl-col">Mã nhân viên</th>
              <th class="tbl-col tbl-col--large">Tên nhân viên</th>
              <th class="tbl-col">Giới tính</th>
              <th class="tbl-col" style="text-align: center">Ngày sinh</th>
              <th class="tbl-col tbl-col--large">Vị trí</th>
              <th class="tbl-col">Số điện thoại</th>
              <th class="tbl-col">Số tài khoản</th>
              <th class="tbl-col tbl-col--large">Tên ngân hàng</th>
              <th class="tbl-col tbl-col--large">Chi nhánh ngân hàng</th>
              <th class="tbl-col">chức năng</th>
            </tr>
            <!-- </thead>    -->

            <tr
              class="tbl-row"
              v-for="(employee, index) in employees"
              :key="index"
              @dblclick="rowOnDblClick(employee)"
            >
              <td class="tbl-col">
                <input
                  name="checkEmp"
                  class="check-col"
                  type="checkbox"
                  :value="employee.EmployeeId"
                  :id="employee.EmployeeId"
                  :checked="checkList.includes(employee.EmployeeId)"
                  v-model="checkList"
                />
                <label :for="employee.EmployeeId" class="mask">
                  <div class="icon-checked"></div>
                </label>
              </td>
              <td class="tbl-col">
                <div>
                  <span>{{ employee.EmployeeCode || "" }}</span>
                </div>
              </td>
              <td class="tbl-col tbl-col--large">
                {{ employee.FullName || "" }}
              </td>
              <td class="tbl-col">
                {{ GenderTransform(employee.Gender) || "" }}
              </td>
              <td class="tbl-col" style="text-align: center">
                {{ formatDate(employee.DateOfBirth) || "" }}
              </td>
              <td class="tbl-col tbl-col--large">
                {{ employee.Position || "" }}
              </td>
              <td class="tbl-col">{{ employee.PhoneNumber || "" }}</td>
              <td class="tbl-col">{{ employee.BankAccount }}</td>
              <td class="tbl-col tbl-col--large">{{ employee.BankName }}</td>
              <td class="tbl-col tbl-col--large">{{ employee.BankBranch }}</td>
              <td class="tbl-col">
                <div class="tbl-col__action">
                  <label
                    class="tbl-col__action-edit"
                    @click="rowOnDblClick(employee)"
                    >Sửa</label
                  >
                  <label
                    @click="handleOpenListAction($event, employee)"
                    class="sidebar-item__icon "
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div class="icon-action-dropdown">
                      <!-- <input type="checkbox" hidden /> -->
                    </div>
                  </label>
                </div>
              </td>
            </tr>

            <!-- Action List -->
            <ul
              class="tbl-col__action-list textfield-list"
              v-if="listAction.isShow"
              :style="listAction.style"
            >
              <label
                @click="onDuplicate()"
                for="action"
                class="tbl-col__action-item"
                tabindex="0"
              >
                Nhân bản
              </label>
              <label
                @click="onDeleteClick()"
                for="action"
                class="tbl-col__action-item btn-delete"
              >
                <label for="show-modal__confirm">Xóa</label>
              </label>
              <label for="action" class="tbl-col__action-item">
                Ngừng sử dụng
              </label>
            </ul>
            <BaseLoading v-if="isShowLoading" />
          </tbody>
        </table>
      </div>

      <div class="content-footer">
        <div>
          Tổng: <strong id="pagetotal">{{ pageTotal }}</strong> bản ghi
        </div>
        <div style="display: flex; align-items: center">
          <div class="textfield">
            <label for="" class="textfield__label">
              <label
                for="dropbtn"
                class="textfield__icon"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
                @click="showPageList()"
                tabindex="0"
              >
                <div class="icon-dropdown"></div>
              </label>
              <!-- <input type="checkbox" name="" id="dropbtn" /> -->
            </label>

            <BaseInput
              :class="{
                'textfield-max-content': true,
                'show-list': showListPage,
              }"
              v-model="currentPageSizeText"
            />
            <ul :class="{ 'textfield-list': true, 'show-list': showListPage }">
              <li
                v-for="(item, index) in pageSizeList"
                :key="index"
                :class="{
                  'textfield-item': true,
                  active: index === itemActive,
                }"
                @click="onSelectPageSize(index, item)"
              >
                {{ item.text }}
              </li>
            </ul>
          </div>
          <!-- Phân trang -->
          <paginate
            :page-count="totalPage"
            :page-range="2"
            :margin-pages="1"
            :click-handler="clickCallback"
            :prev-text="'Trước'"
            :next-text="'Sau'"
            :prev-class="'prev-btn'"
            :next-class="'next-btn'"
            :container-class="'pagination'"
            :page-class="'page-item'"
          >
          </paginate>
        </div>
      </div>
    </div>
  </div>

  <EmployeeDetail
    v-if="isShowDialog"
    @hideDialog="showDialog(false)"
    @onLoadData="onLoadCurrentpage(this.currentPageNum)"
    :employeeIdUpdate="employeeIdSelected"
    @onshowToast="onshowToast"
    @onhideToast="onhideToast"
    :isDuplicate="employeeIdDuplicate"
    @changeToastMsg="changeToastMsg"
  ></EmployeeDetail>
  <BaseDialog
    @onBtnAccept="deleteEmployee"
    :dialogTitle="dialogTitle"
    v-if="isShowDeleteDialog"
    :showBtnCancel="showBtnCancel"
    :btnCancelText="'Không'"
    @onHideDialog="onShowDeleteDialog(false)"
    :dialogHeader="'Xóa nhân viên'"
    :isDelete="isDelete"
    :isNotice="isNotice"
  />
  <BaseToast
    v-if="isShowToast"
    @closeToast="onhideToast"
    @onhideToast="onhideToast"
    :toastType="toastContent"
    :toastTitle="toastTitle"
    :isSuccessToast="isSuccessToast"
    :isErrorToast="isErrorToast"
  />
</template>
<script>
import paginate from "vuejs-paginate/src/components/Paginate.vue";
import EmployeeDetail from "../../views/employee/EmployeeDetail.vue";
import BaseInput from "../../components/base/BaseInput.vue";
import {
  formatDate,
  formatMoney,
  GenderTransform,
} from "../../js/base/common.js";
import axios from "axios";
import { HTTP } from "../../js/api/ConnectApi.js";
import RESOURCES from "../../js/base/resouce.js";

export default {
  name: "EmployeeList",
  components: {
    EmployeeDetail,
    BaseInput,
    paginate,
  },
  data() {
    return {
      employees: [], // mảng hứng dữ liệu đổ vào bảng
      isShowDialog: false, // Show chi tiết nhân viên
      isShowLoading: false, // Show loading
      textSearch: "", // nội dung ô tìm kiếm
      listAction: {
        // object list khi click nút sửa
        isShow: false,
        style: {
          top: 0,
          right: 0,
        },
      },
      dialogTitle: "", // title thông báo khi xóa
      isDisableButton:true,//disable button xóa hàng loạt
      isDelete: true, // có phải dialog xóa
      isNotice: false, // dialog cảnh báo
      isShowBtnDelete:false,//show nút xóa nhiều
      showBtnCancel: true, //hiện button không
      checkList: [], // mảng chứa các check box checked
      employeeIdSelected: null, // id của nhân viên khi click nút sửa
      isShowDeleteDialog: false, // show dialog thông báo khi xóa
      employeeIdDelete: null, // lấy ra id khi xóa nhân viên
      employeeIdDuplicate: false, // lấy id nhân viên để nhân bản
      isShowToast: false, //show toast message
      isCheckAll: false, // check all
      formatDate, // Hàm xử lí ngày tháng
      formatMoney, // Hàm xử lí tiền tệ
      GenderTransform, //Hàm  xử lí giới tính
      totalPage: 1, // Tổng số trang
      currentPageSizeText: RESOURCES.PAGINATION[0].text, // Tổng số bản ghi trên một trang text
      currentPageSize: 20, //Tổng số bản ghi trên một trang number
      showListPage: false, // show ra list page size
      currentPageNum: 1, // Trang hiện tại
      itemActive: null, // set class active cho list item selected
      toastContent: RESOURCES.FORM_MODE.DELETE, // nội dung toast message
      toastTitle: RESOURCES.NOTIFICATION_TITLE.SUCCESS, // Tiêu đề toast,
      isErrorToast: false, // Icon toast lỗi
      isSuccessToast: true, // icon toast thành công
      pageTotal: 0, // tổng số bản ghi
      pageSizeList: RESOURCES.PAGINATION, // mảng phân trang
      RESOURCES,
    };
  },
  created() {
    // Lấy ra 20 bản ghi đầu tiên
    this.getEmployeesFirst();
  },
  methods: {
    /**
     * author:Nguyễn Văn Ngọc(2/1/2023)
     * Hàm getEmployeesFirst lấy ra số nhân viên trang đầu tiên
     */
    async getEmployeesFirst() {
      try {
        // show loading
        this.isShowLoading = true;

        HTTP.post(`/filter`, this.getFilterParams("", 20, 1)).then((res) => {
          this.employees = res.data.Data;
          this.totalPage = res.data.TotalPage;
          this.isShowLoading = false;
          this.pageTotal = res.data.TotalRecord;
        });
      } catch (error) {
        console.log(error);
      }
    },
    // Ẩn hiện form nhân viên
    /**
     * author:Nguyễn Văn Ngọc(2/1/2023)
     * Hàm showDialog ẩn hiện form chi tiết
     */
    showDialog(state) {
      this.isShowDialog = state;
      this.employeeIdSelected = null;
      this.employeeIdDuplicate = false;
      this.showListPage = false;
      this.listAction.isShow = false;
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm showDialog ẩn hiện dialog thông báo khi xóa
     */
    // Ẩn hiện dialog xóa
    onShowDeleteDialog(state) {
      this.isShowDeleteDialog = state;
      this.listAction.isShow = false;
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onDeleteClick hiện dialog thông báo khi xóa
     */
    onDeleteClick(isMultiple) {
      // show dialog thông báo
      this.isNotice = false;
      this.showBtnCancel = true;
      this.isDelete = true;
      this.onShowDeleteDialog(true);
      if(isMultiple) {
        this.dialogTitle = RESOURCES.MODAL_MESSAGE.WARNING;
      }
    },

    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm deleteEmployee xóa nhân viên
     */
    //Xóa nhân viên
    async deleteEmployee() {
      try {
        // đóng Dialog
        this.onShowDeleteDialog(false);
        // Show loading
        this.isShowLoading = true;
        // gọi api xóa nhân viên
        var res = await HTTP.delete("", { data: [...this.checkList] });
        this.toastContent = RESOURCES.FORM_MODE.DELETE;
        this.isErrorToast = false;
        this.isSuccessToast = true;
        this.toastTitle = RESOURCES.NOTIFICATION_TITLE.SUCCESS;
        this.isShowToast = true;
        this.checkList = [];
        this.listAction.isShow = false;

        // Load lại dữ liệu
        await this.onLoadCurrentpage(this.currentPageNum);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onshowToast  hiện Toast thông báo
     */
    onshowToast() {
      this.isShowToast = true;
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onhideToast ẩn  Toast thông báo
     */
    onhideToast() {
      this.isShowToast = false;
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm handleOpenListAction Xử lí vị trí của list khi click nút sửa
     */

    handleOpenListAction(e, emp) {
      if (emp.EmployeeId) {
        this.employeeIdSelected = emp.EmployeeId;
        this.employeeIdDelete = emp.EmployeeId;
        this.dialogTitle = `Bạn có thực sự muốn xóa Nhân viên <${emp.EmployeeCode}> không?`;
        this.checkList = [this.employeeIdSelected];
      } else {
        this.employeeIdDelete = null;
      }
      const target = e.target;
      const position = target.getBoundingClientRect();
      this.listAction = {
        isShow: !this.listAction.isShow,
        style: {
          top: position.top + position.height + "px",
          right:
            document.body.offsetWidth - position.left - position.width + "px",
        },
      };
        // if(this.listAction.isShow) {
        //   e.target.style.border = "1px solid #0075c0";
        //   e.target.style.height = "16px";
        // }
        // else {
        //   e.target.style.border = 'unset';
        //   e.target.style.height = "24px";
        // }
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm searchData Tìm kiếm theo tên
     */
    async searchData() {
      try {
        // hiện loading
        this.isShowLoading = true;
        // gọi api lấy nv theo tên
        const response = await HTTP.post(
          `/filter`,
          this.getFilterParams(this.textSearch, 20, 1)
        );
        this.employees = response.data.Data;
        this.isShowLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm handleCheckAll xử lí check all khi click vào checkall
     */
    handleCheckAll(e) {
      if (e.target.checked) {
        this.checkList = [...this.employees.map((item) => item.EmployeeId)];
      } else {
        this.checkList = [];
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm checkAll xử lí checked của check all
     */
    checkAll() {
      var me = this;
      let isCheck = true;
      let count = 0;
      this.employees.forEach((item) => {
        if (this.checkList.includes(item.EmployeeId)) {
          count++;
        }
      });
      if (count == this.employees.length) return true;
      else return false;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm rowOnDblClick xử lí check all khi double click mỗi hàng
     */
    rowOnDblClick(item) {
      this.employeeIdSelected = item.EmployeeId;
      this.employeeIdDuplicate = false;
      this.isShowDialog = true;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onDuplicate hiện form nhân viên khi click vào nút nhân bản
     */
    onDuplicate() {
      this.employeeIdDuplicate = true;
      this.isShowDialog = true;
      this.listAction.isShow = false;
    },
    /**
     * author:Nguyễn Văn Ngọc(8/1/2023)
     * Hàm clickCallback phân trang khi người dùng click vào số trang
     */
    clickCallback(pageNum) {
      try {
        this.isShowLoading = true;
        HTTP.post(
          `/filter`,
          this.getFilterParams("", this.currentPageSize, pageNum)
        ).then((res) => {
          this.employees = res.data.Data;
          this.totalPage = res.data.TotalPage;
          this.isShowLoading = false;
        });
        this.textSearch = "";
        this.currentPageNum = pageNum;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(8/1/2023)
     * Hàm onLoadCurrentpage load lại trang hiện tại khi cất
     */
    async onLoadCurrentpage(num) {
      try {
        this.isShowLoading = true;
        var res = await HTTP.post(
          `/filter`,
          this.getFilterParams("", this.currentPageSize, num)
        );
        this.employees = res.data.Data;
        this.totalPage = res.data.TotalPage;
        this.isShowLoading = false;
        this.pageTotal = res.data.TotalRecord;
        this.checkList = [];
        this.textSearch = "";
        this.employeeIdSelected = null;
      } catch (error) {
        console.log(error);
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
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm onSelectPageSize chọn số bản ghi trên một trang
     */
    async onSelectPageSize(index, item) {
      try {
        this.isShowLoading = !this.isShowLoading;
        // gọi api lấy số bản ghi trên trang dựa vào value
        var res = await HTTP.post(`/filter`, {
          EmployeeFilter: "",
          PageSize: item.value,
          PageNumber: 1,
        });
        this.employees = res.data.Data;
        this.totalPage = res.data.TotalPage;
        this.isShowLoading = false;
        this.currentPageSizeText = item.text;
        this.currentPageSize = item.value;
        this.showListPage = false;
        this.textSearch = "";
        this.itemActive = index;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm changeToastMsg(text) thay đổi toast text
     *
     */
    changeToastMsg(text, error, success, title) {
      this.toastContent = text;
      this.isErrorToast = error;
      this.isSuccessToast = success;
      this.toastTitle = title;
    },
    /**
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm getFilterParams(text) lấy ra object để gọi api filter
     *
     */
    getFilterParams(EmployeeFilter, PageSize, PageNumber) {
      return {
        EmployeeFilter: EmployeeFilter,
        PageSize: PageSize,
        PageNumber: PageNumber,
      };
    },
    /**
     * author:Nguyễn Văn Ngọc(14/2/2023)
     * Hàm exportData(text) xuất dữ liệu employees ra file exel
     *
     */
    async exportData() {
      var me = this;
      // Call API lấy dữ liệu:
      try {
        // Hiển thị Loading
        me.isShowLoading = true;
        const response = await HTTP.get("/get-employees-excel", {
          responseType: "blob",
        });
        // Lấy ra URL
        const url = URL.createObjectURL(new Blob([response.data]));
        // Tạo thẻ a
        const link = document.createElement("a");
        // Set href của thẻ a là url
        link.href = url;
        // Set attribute của thẻ a và tên của file excel
        link.setAttribute("download", "Danh_sach_can_bo_giao_vien.xlsx");
        document.body.appendChild(link);
        link.click();
        // Ẩn Loading
        me.isShowLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  updated() {},
  watch: {
    currentPageNum: {
      handler: function (newValue) {
        this.checkAll();
      },
      immediate: true,
    },
    checkList: {
      handler:function (newValue){
        if(this.checkList.length > 0) {
          this.isDisableButton = false
        }
        else {
          this.isDisableButton = true;
          this.isShowBtnDelete = false;
        }
      },
      immediate:true
    }
  },
};
</script>
<style>
.pagination {
  list-style: none;
}

.page-item {
  padding: 0 8px;
  margin: 0 4px;
}
.page-item.active {
  border: 1px solid #50b83c;
}
.prev-btn.disabled,
.next-btn.disabled {
  cursor: default !important;
  color: #9e9e9e;
}
</style>

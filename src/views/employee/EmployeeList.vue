<template>
  <div class="content">
    <div class="content__header">
      <div class="content__header-text">Nhân viên</div>
      <BaseButton
        :btnText="'Thêm mới nhân viên'"
        @click="showDialog(true)"
        class="btn btn-primary btn-add-emp"
      />
    </div>
    <div class="content-wrapper">
      <div class="content-wrapper__action">
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
          <!-- <BaseInput
            v-model="this.textSearch"
            placeholder="Tìm kiếm trong danh sách"
          /> -->
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
                    checkList.length !== 0 &&
                    checkList.length === employees.length
                  "
                />
                <label for="checkAll" class="mask">
                  <div class="icon-checked"></div>
                </label>
              </th>
              <th class="tbl-col">mã nhân viên</th>
              <th class="tbl-col tbl-col--large">tên nhân viên</th>
              <th class="tbl-col">giới tính</th>
              <th class="tbl-col" style="text-align: center">ngày sinh</th>
              <th class="tbl-col tbl-col--large">vị trí</th>
              <th class="tbl-col">số điện thoại</th>
              <th
                class="tbl-col"
                style="text-align: right; width: 129px; min-width: 129px"
              >
                tiền lương
              </th>
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
              <td class="tbl-col">{{ employee.GenderName || "" }}</td>
              <td class="tbl-col" style="text-align: center">
                {{ formatDate(employee.DateOfBirth) || "" }}
              </td>
              <td class="tbl-col tbl-col--large">
                {{ employee.PositionName || "" }}
              </td>
              <td class="tbl-col">{{ employee.PhoneNumber || "" }}</td>
              <td
                class="tbl-col"
                style="text-align: right; width: 129px; min-width: 129px"
              >
                {{ formatMoney(employee.Salary) || "" }}
              </td>
              <td class="tbl-col"></td>
              <td class="tbl-col tbl-col--large"></td>
              <td class="tbl-col tbl-col--large"></td>
              <td class="tbl-col">
                <div class="tbl-col__action">
                  <label
                    class="tbl-col__action-edit"
                    @click="rowOnDblClick(employee)"
                    >Sửa</label
                  >
                  <label
                    @click="handleOpenListAction($event, employee)"
                    class="sidebar-item__icon"
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
    @onLoadData="onLoadCurrentpage(1)"
    :employeeIdUpdate="employeeIdSelected"
    :employeeList="employeeList"
    @onshowToast="onshowToast"
    @onhideToast="onhideToast"
    :isDuplicate="employeeIdDuplicate"
    @nullIdSelected="nullIdSelected"
    @changeToastMsg="changeToastMsg(text)"
  ></EmployeeDetail>
  <BaseDialog
    @onBtnAccept="deleteEmployee"
    :dialogTitle="dialogTitle"
    v-if="isShowDeleteDialog"
    :btnCancelText="'Không'"
    @onHideDialog="onShowDeleteDialog(false)"
    :dialogHeader="'Xóa nhân viên'"
  />
  <BaseToast
    v-if="isShowToast"
    @closeToast="onhideToast"
    @onhideToast="onhideToast"
    :toastContent="toastContent"
  />
</template>
<script>
import paginate from "vuejs-paginate/src/components/Paginate.vue";
import EmployeeDetail from "../../views/employee/EmployeeDetail.vue";
import BaseInput from "../../components/base/BaseInput.vue";
import { formatDate, formatMoney } from "../../js/base/common.js";
import axios from "axios";
import Employee from "../../js/api/EmployeeApi.js";
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
      checkList: [], // mảng chứa các check box checked
      employeeIdSelected: null, // id của nhân viên khi click nút sửa
      isShowDeleteDialog: false, // show dialog thông báo khi xóa
      employeeIdDelete: null, // lấy ra id khi xóa nhân viên
      employeeIdDuplicate: false, // lấy id nhân viên để nhân bản
      isShowToast: false, //show toast message
      formatDate, // Hàm xử lí ngày tháng
      formatMoney, // Hàm xử lí tiền tệ
      totalPage: 1, // Tổng số trang
      employeeList: [], // lấy ra toàn bộ nhân viên để truyền vào prop employeeList
      currentPageSizeText: "", // Tổng số bản ghi trên một trang text
      currentPageSize: 10, //Tổng số bản ghi trên một trang number
      showListPage: false, // show ra list page size
      currentPageNum: 1, // Trang hiện tại
      itemActive: null, // set class active cho list item selected
      toastContent: "", // nội dung toast message
      pageTotal: 0, // tổng số bản ghi
      pageSizeList: [
        {
          value: 20,
          text: "20 bản ghi trên một trang",
        },
        {
          value: 50,
          text: "50 bản ghi trên một trang",
        },
        {
          value: 100,
          text: "100 bản ghi trên một trang",
        },
        {
          value: 120,
          text: "120 bản ghi trên một trang",
        },
      ],
    };
  },
  async created() {
    /**
     * author:Nguyễn Văn Ngọc(2/1/2023)
     * Hàm getAllEmployees lấy ra số nhân viên trang đầu tiên
     */
    const getEmployeesFirst = async () => {
      try {
        // show loading
        this.isShowLoading = true;
        axios
          .get(
            `https://cukcuk.manhnv.net/api/v1/Employees/filter?pageSize=20&pageNumber=1`
          )
          .then((res) => {
            this.employees = res.data.Data;
            this.totalPage = res.data.TotalPage;
            this.isShowLoading = false;
            this.pageTotal = res.data.TotalRecord;
          });
        // gọi api lấy nhân viên
        // const response = await Employee.getEmployee();
        // this.employees = [...response.data];
      } catch (error) {
        console.log(error);
      }
    };

    await getEmployeesFirst();
    // đóng loading

    /**
     * author:Nguyễn Văn Ngọc(8/1/2023)
     * Hàm getAllEmployees lấy ra toàn bộ nhân viên
     */
    const getAllEmployees = () => {
      try {
        axios.get("https://cukcuk.manhnv.net/api/v1/Employees").then((res) => {
          this.employeeList = [...res.data];
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAllEmployees();
  },
  methods: {
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
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onDeleteClick hiện dialog thông báo khi xóa
     */
    onDeleteClick() {
      // show dialog thông báo
      this.onShowDeleteDialog(true);
    },

    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm deleteEmployee xóa nhân viên
     */
    //Xóa nhân viên
    async deleteEmployee() {
      // đóng Dialog
      this.onShowDeleteDialog(false);
      // gọi api xóa nhân viên
      await axios
        .delete(
          `https://cukcuk.manhnv.net/api/v1/Employees/${this.employeeIdDelete}`
        )
        .then((response) => {
          console.log(response);
          this.isShowToast = true;
        });
      this.listAction.isShow = false;
      // Load lại dữ liệu
      this.onLoadData();
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
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm searchData Tìm kiếm theo tên
     */
    async searchData() {
      // hiện loading
      this.isShowLoading = true;
      // gọi api lấy nv theo tên
      const response = await axios.get(
        `https://cukcuk.manhnv.net/api/v1/Employees/filter?employeeFilter=${this.textSearch}`
      );

      this.employees = response.data.Data;
      // this.employees = response.data.Data;
      this.isShowLoading = false;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm handleCheckAll xử lí check all khi click vào checkall
     */
    handleCheckAll(e) {
      if (e.target.checked) {
        this.checkList = [...this.employees.map((item) => item.EmployeeId)];
        console.log(this.checkList);
      } else {
        this.checkList = [];
        console.log(this.checkList);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm rowOnDblClick xử lí check all khi double click mỗi hàng
     */
    // handleCheckBox(e) {
    //   const value = e.target.value;
    //   if (!this.checkList.includes(value)) {
    //     this.checkList.push(value);
    //   } else {
    //     this.checkList.splice(this.checkList.indexOf(value), 1);
    //   }
    //     console.log(this.checkList)

    // }
    // Xử lí khi double click vào mỗi hàng
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
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onLoadData Load lại dữ liệu khi click vào icon reload
     */
    async onLoadData() {
      const getAllEmployees = async () => {
        try {
          this.isShowLoading = true;
          const response = await Employee.getEmployee();
          this.employees = [...response.data];
          this.textSearch = "";
        } catch (error) {
          console.log(error);
        }
      };

      await getAllEmployees();
      this.isShowLoading = false;
    },
    /**
     * author:Nguyễn Văn Ngọc(8/1/2023)
     * Hàm clickCallback phân trang khi người dùng click vào số trang
     */
    clickCallback(pageNum) {
      this.isShowLoading = true;
      axios
        .get(
          `https://cukcuk.manhnv.net/api/v1/Employees/filter?pageSize=${this.currentPageSize}&pageNumber=${pageNum}`
        )
        .then((res) => {
          this.employees = res.data.Data;
          this.totalPage = res.data.TotalPage;
          this.isShowLoading = false;
        });
      this.textSearch = "";
      this.currentPageNum = pageNum;
    },
    /**
     * author:Nguyễn Văn Ngọc(8/1/2023)
     * Hàm onLoadCurrentpage load lại trang hiện tại khi cất
     */
    onLoadCurrentpage(num) {
      this.isShowLoading = true;
      axios
        .get(
          `https://cukcuk.manhnv.net/api/v1/Employees/filter?pageSize=${this.currentPageSize}&pageNumber=${num}`
        )
        .then((res) => {
          this.employees = res.data.Data;
          this.totalPage = res.data.TotalPage;
          this.isShowLoading = false;
        });
      this.textSearch = "";
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
    onSelectPageSize(index, item) {
      this.isShowLoading = !this.isShowLoading;
      // gọi api lấy số bản ghi trên trang dựa vào value
      axios
        .get(
          `https://cukcuk.manhnv.net/api/v1/Employees/filter?pageSize=${item.value}&pageNumber=1`
        )
        .then((res) => {
          this.employees = res.data.Data;
          this.totalPage = res.data.TotalPage;
          this.isShowLoading = false;
        });

      this.currentPageSizeText = item.text;
      this.currentPageSize = item.value;
      this.showListPage = false;
      this.textSearch = "";
      this.itemActive = index;
    },
    /**
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm nullIdSelected chọn số bản ghi trên một trang
     */
    nullIdSelected() {
      this.employeeIdSelected = null;
    },
     /**
     * author:Nguyễn Văn Ngọc(10/1/2023)
     * Hàm changeToastMsg(text) thay đổi toast text
     * 
     */
    changeToastMsg(text) {
      this.toastContent = text;
    }

  },

  updated() {},
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

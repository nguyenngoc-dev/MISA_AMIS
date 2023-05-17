<template>
  <div class="content">
    <div class="content__header">
      <div class="content__header-text">Tổng quan</div>
    </div>
    <div class="content-wrapper sumary">
      <div class="sumary-block-container">
        <div class="sumary-block product-quantity">
          <div class="sumary-block-icon-container">
            <div class="sumary-block-icon">
              <img class="sumary-block-icon-img" src="../../assets/img/perfume.png" alt="">
            </div>
          </div>
          <div class="sumary-block-text">Tổng số sản phẩm</div>
          <div class="sumary-block-value">{{ totalProduct }}</div>
        </div>
        <div class="sumary-block product-perchased">
          <div class="sumary-block-icon-container">
            <div class="sumary-block-icon">
              <img class="sumary-block-icon-img" src="../../assets/img/sale.png" alt="" w>
            </div>
          </div>
          <div class="sumary-block-text">Số lượng đã bán</div>
          <div class="sumary-block-value">{{ totalProductPerchased }}</div>
        </div>
        <div class="sumary-block order">
          <div class="sumary-block-icon-container">
            <div class="sumary-block-icon">
              <img class="sumary-block-icon-img" src="../../assets/img/order.png" alt="">
            </div>
          </div>
          <div class="sumary-block-text">Số lượng đơn hàng</div>
          <div class="sumary-block-value">{{ totalOrder }}</div>
        </div>
        <div class="sumary-block value">
          <div class="sumary-block-icon-container">
            <div class="sumary-block-icon">
              <img class="sumary-block-icon-img" src="../../assets/img/value.png" alt="">
            </div>
          </div>
          <div class="sumary-block-text">Tổng thu nhập</div>
          <div class="sumary-block-value">{{ formatMoney(totalValue) }}</div>
        </div>
      </div>
      <div class="sumary-block-filter">
        <div class="sumary-block-filter-text">
          Lọc theo ngày tháng
        </div>
        <div class="sumary-block-filter-date">
          <div class="textfield modal-textfield" style="min-width: 200px; width: 200px;margin-right: 24px;">
            <label for="" class="textfield__label modal-label pt-16">
              Từ ngày
            </label>
            <BaseDatePicker v-model="fromDate" :tabIndex="2" :name="'DateOfBirth'" dateName="'DateOfBirthPicker'"
              ref="DateOfBirth" />
          </div>
          <div class="textfield modal-textfield" style="min-width: 200px; width: 200px; margin-right: 24px;">
            <label for="" class="textfield__label modal-label pt-16">
              Đến ngày
            </label>
            <BaseDatePicker v-model="toDate" :tabIndex="2" :name="'DateOfBirth'" dateName="'DateOfBirthPicker'"
              ref="DateOfBirth" />
          </div>
          <BaseButton :btnText="'Lọc'" @click="onFilterOrder" class="btn-add-emp btn-filter" />
          <div
            class="tooltip icon-export sidebar-item__icon content-wrapper__action-refresh"
            style="bottom: 9px"
            @click="exportData()"
          >
            <span class="tooltiptext" style="min-width: 100px;left: 6%;">Xuất báo cáo (Shift + P)</span>
          </div>
        </div>

      </div>
      <div class="grid-table">
        <table class="tbl home-page-order">
          <!-- <thead> -->
          <tbody class="home-page-order-body">
            <tr class="tbl-row" style="position: sticky; top: 0; z-index: 10">
              <th class="tbl-col" style="width: 120px;min-width: 120px;z-index: 5">Mã hóa đơn</th>
              <th class="tbl-col" style="width: 120px;min-width: 120px">Ngày đặt</th>
              <th class="tbl-col tbl-col--large">Tên Khách hàng</th>
              <th class="tbl-col tbl-col--large">Địa chỉ </th>
              <th class="tbl-col" style="text-align: center">Số điện thoại</th>
              <th class="tbl-col tooltip tbl-col--large" style="display: table-cell">
                Tình trạng
              </th>
              <th class="tbl-col">Tổng tiền</th>
            </tr>
            <!-- </thead>    -->

            <tr class="tbl-row" v-for="(saleOrder, index) in saleOrders" :key="index"
              @dblclick="rowOnDblClick(saleOrder)">
              <td class="tbl-col tooltip" style="width: 200px;">
                <div>
                  {{ saleOrder.SaleOrderCode || "" }}
                </div>
              </td>
              <td class="tbl-col tooltip" style="width: 200px;">
                <div>
                  {{ formatDate(saleOrder.CreatedDate) || "" }}
                </div>
              </td>
              <td class="tbl-col tbl-col--large tooltip">
                <div class=" ">
                  {{ saleOrder.FirstName + " " + saleOrder.LastName || "" }}
                  <span class="tooltiptext" style="top:100%">{{ saleOrder.ProductName }}</span>
                </div>
              </td>
              <td class="tbl-col">
                {{ saleOrder.CustomerAddress || "" }}
              </td>
              <td class="tbl-col">
                {{ saleOrder.CustomerPhone || "" }}
              </td>
              <td class="tbl-col tooltip">
                <div class="">
                  {{ formatStatus(saleOrder.Status) || "" }}
                </div>
              </td>
              <td class="tbl-col  tooltip">
                <div class="">
                  {{ formatMoney(saleOrder.TotalPrice) || "0" }}
                </div>
              </td>
            </tr>

            <!-- Action List -->
            <ul class="tbl-col__action-list textfield-list" v-if="listAction.isShow" :style="listAction.style">
              <label @click="onDuplicate()" for="action" class="tbl-col__action-item" tabindex="0">
                Nhân bản
              </label>
              <label @click="onDeleteClick(false)" for="action" class="tbl-col__action-item btn-delete">
                <label for="show-modal__confirm">Xóa</label>
              </label>
              <label for="action" class="tbl-col__action-item">
                Ngừng sử dụng
              </label>
            </ul>
            <BaseLoading v-if="isShowLoading" />
          </tbody>
        </table>
        <div class="empty-data" v-if="this.saleOrders.length === 0">
          <img src="../../assets/img/emptyData.svg" alt="" />
          <div class="empty-data-text">Không có dữ liệu</div>
        </div>
      </div>
      <div class="content-footer">
        <div>
          Tổng: <strong id="pagetotal">{{ pageTotal }}</strong> bản ghi
        </div>
        <div style="display: flex; align-items: center">
          <!-- Phân trang -->
          <paginate
            :page-count="totalPage"
            :page-range="3"
            :margin-pages="1"
            :click-handler="clickCallback"
            :prev-text="'Trước'"
            :next-text="'Sau'"
            :prev-class="'prev-btn'"
            :next-class="'next-btn'"
            :container-class="'pagination'"
            :page-class="'page-item'"
            :v-show="this.totalPage"
          >
          </paginate>
        </div>
      </div>
    </div>
  </div>

  <OrderDetail v-if="isShowDialog" @hideDialog="showDialog(false)" @onLoadData="onLoadCurrentpage(this.currentPageNum)"
    :orderIdUpdate="orderIdSelected" :productImageId="productImageIdSelected" @onshowToast="onshowToast"
    @onhideToast="onhideToast" :isDuplicate="productIdDuplicate" :isShowForm="isShowDialog"
    @changeToastMsg="changeToastMsg"></OrderDetail>
  <BaseDialog @onBtnAccept="deleteEmployee" :dialogTitle="dialogTitle" v-if="isShowDeleteDialog"
    :showBtnCancel="showBtnCancel" :btnCancelText="'Không'" @onHideDialog="onShowDeleteDialog(false)"
    :dialogHeader="'Xóa nhân viên'" :isDelete="isDelete" :isNotice="isNotice" />
  <BaseToast v-if="isShowToast" @closeToast="onhideToast" @onhideToast="onhideToast" :toastType="toastContent"
    :toastTitle="toastTitle" :isSuccessToast="isSuccessToast" :isErrorToast="isErrorToast" />
</template>
<script>
import paginate from "vuejs-paginate/src/components/Paginate.vue";
import OrderDetail from "../order/OrderDetail.vue";
import BaseInput from "../../components/base/BaseInput.vue";
import { formatDate, formatMoney } from "../../js/base/common.js";
import { HTTP, HTTPOrders } from "../../js/api/ConnectApi.js";
import RESOURCES from "../../js/base/resouce.js";
import BaseDatePicker from '../../components/base/BaseDatePicker.vue'
export default {
  name: "EmployeeList",
  components: {
    OrderDetail,
    paginate,
    BaseDatePicker
  },
  data() {
    return {
      saleOrders: [], // mảng hứng dữ liệu đổ vào bảng
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
      productImageIdSelected: null,
      dialogTitle: "", // title thông báo khi xóa
      isDisableButton: true, //disable button xóa hàng loạt
      isDelete: true, // có phải dialog xóa
      isNotice: false, // dialog cảnh báo
      isShowBtnDelete: false, //show nút xóa nhiều
      isSingle: true,//có phải xóa 1
      showBtnCancel: true, //hiện button không
      checkList: [], // mảng chứa các check box checked
      orderIdSelected: null, // id của nhân viên khi click nút sửa
      isShowDeleteDialog: false, // show dialog thông báo khi xóa
      productDelete: [],// mảng xóa một nhân viên
      productIdDelete: null, // lấy ra id khi xóa nhân viên
      productIdDuplicate: false, // lấy id nhân viên để nhân bản
      isShowToast: false, //show toast message
      formatDate, // Hàm xử lí ngày tháng
      totalPage: 1, // Tổng số trang
      currentPageSizeText: RESOURCES.PAGINATION[0].text, // Tổng số bản ghi trên một trang text
      currentPageSize: 20, //Tổng số bản ghi trên một trang number
      showListPage: false, // show ra list page size
      currentPageNum: 1, // Trang hiện tại
      itemActive: 0, // set class active cho list item selected
      toastContent: RESOURCES.FORM_MODE.DELETE, // nội dung toast message
      toastTitle: RESOURCES.NOTIFICATION_TITLE.SUCCESS, // Tiêu đề toast,
      isErrorToast: false, // Icon toast lỗi
      isSuccessToast: true, // icon toast thành công
      pageTotal: 0, // tổng số bản ghi
      pageSizeList: RESOURCES.PAGINATION, // mảng phân trang
      RESOURCES,
      fromDate: "2023-04-08T04:55:52.746Z",
      toDate: "2023-05-21T04:55:52.746Z",
      totalProduct: 0,
      totalProductPerchased: 0,
      totalOrder: 0,
      totalValue: 0,
      formatMoney
    };
  },
  async created() {
    // Lấy ra 20 bản ghi đầu tiên
    await this.onFilterOrder();
    await this.getAllProduct();

  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
  },
  computed: {
    // Check xem có phải check all hay không
    isCheckAll() {
      let isCheck = true;
      if (this.checkList.length == 0) {
        return false;
      }
      isCheck = this.saleOrders.every((item) =>
        this.checkList.includes(item.SaleOrderId)
      );
      // eslint-disable-next-line
      return isCheck;
    },

  },
  methods: {
    async onFilterOrder() {
      this.isShowLoading = true;
      this.totalValue = 0;
    let res = await  HTTPOrders.post("/filter",{FromDate:this.fromDate,ToDate:this.toDate})
    if(res) {
      this.saleOrders = res.data.Data.filter(item => {
        return item.Status == 2;
      });
      this.totalOrder = this.saleOrders.length;
      this.saleOrders.forEach(item => {
        this.totalValue += item.TotalPrice;
      })
      this.pageTotal = this.saleOrders.length;
      this.isShowLoading = false;
    }
    },
    getAllProduct() {
      try {

        // show loading
        this.isShowLoading = true;
        HTTP.get().then((res) => {
          this.totalProduct = res.data.length;
          res.data.forEach(item => {
            this.totalProductPerchased += item.QuantityPurchased;
            this.isShowLoading = false;

          });
        })
          .catch(error => {
            this.handleExeption(error);
          })
      } catch (error) {
        this.handleExeption(error);
      }
    },
    formatStatus(status) {

      if (status == 1) {
        return "Đang giao hàng"
      }
      else if (status == 2) {
        return "Giao thành công"
      }
      else if (status == 3) {
        return "Đơn hàng bị hủy"
      }
      else {
        return "Đang chuẩn bị hàng"
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(21/2/2023)
     * Hàm onKeyDown xử lí khi nhấn phím tắt
     */
    onKeyDown(event) {
      // Mở Form nhân viên
      if (event.ctrlKey && event.key === "1") {
        event.preventDefault();
        this.showDialog(true);
      }
      // export data ra excel
      if (event.shiftKey && (event.key === "P" || event.key === "p")) {
        event.preventDefault();
        this.exportData();
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(2/1/2023)
     * Hàm getEmployeesFirst lấy ra số nhân viên trang đầu tiên
     */
    async getEmployeesFirst() {
      try {
        // show loading
        this.isShowLoading = true;
        HTTPOrders.get().then((res) => {
          this.saleOrders = res.data.filter(item => {
            return item.Status == 2;
          });
          this.totalOrder = this.saleOrders.length;
          this.saleOrders.forEach(item => {
            this.totalValue += item.TotalPrice;
          })
          this.totalPage = res.data.TotalPage;
          this.isShowLoading = false;
          this.pageTotal = res.data.TotalRecord;
        })
          .catch(error => {
            this.handleExeption(error);
          })
      } catch (error) {
        this.handleExeption(error);
      }
    },
    // Ẩn hiện form nhân viên
    /**
     * author:Nguyễn Văn Ngọc(2/1/2023)
     * Hàm showDialog ẩn hiện form chi tiết
     */
    showDialog(state) {
      this.isShowDialog = state;
      this.orderIdSelected = null;
      this.productIdDuplicate = false;
      this.showListPage = false;
      this.listAction.isShow = false;
      this.productImageIdSelected = null;
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
      if (isMultiple) {
        this.dialogTitle = RESOURCES.MODAL_MESSAGE.WARNING;
        this.isSingle = false;
      }
      else {
        this.isSingle = true;
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
        let data = this.isSingle ? [...this.productDelete] : [...this.checkList];
        // Show loading
        this.isShowLoading = true;
        // gọi api xóa nhân viên
        var res = await HTTPOrders.delete("", { data: data });
        this.toastContent = RESOURCES.FORM_MODE.DELETE;
        this.isErrorToast = false;
        this.isSuccessToast = true;
        this.toastTitle = RESOURCES.NOTIFICATION_TITLE.SUCCESS;
        this.isShowToast = true;
        this.checkList = [];
        this.productDelete = [];
        this.listAction.isShow = false;
        // Load lại dữ liệu
        await this.onLoadCurrentpage(1);
      } catch (error) {
        this.handleExeption(error);
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
     * Xử lí CheckList
     * Thông báo
     */

    handleOpenListAction(e, emp) {
      if (emp.SaleOrderId) {
        this.orderIdSelected = emp.SaleOrderId;
        this.productImageIdSelected = emp.ProductImageId;
        this.productIdDelete = emp.SaleOrderId;
        this.dialogTitle = RESOURCES.MODAL_MESSAGE.DELETE_WARNING(emp.SaleOrderCode);
        this.productDelete = [this.orderIdSelected];
      } else {
        this.productIdDelete = null;
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
      if (position.y < 592) {
        this.listAction.style.top = position.top + position.height + "px";
      } else {
        this.listAction.style.top = position.y - 110 + "px";
      }
      if (this.listAction.isShow) {
        e.target.style.border = "1px solid #0075c0";
      } else {
        e.target.style.border = "1px solid transparent";
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm hanlderCheckBox Xử lí khi click vào mỗi ô check
     * Xử lí CheckList
     * Thông báo
     */
    hanlderCheckBox(value) {
      if (this.checkList.includes(value)) {
        this.checkList.splice(this.checkList.indexOf(value), 1);
      } else {
        this.checkList.push(value);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(3/1/2023)
     * Hàm onBlurActionIcon bỏ border của label icon action
     */
    onBlurActionIcon(e) {
      e.target.style.border = "1px solid transparent";
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
        const response = await HTTPOrders.get()
        this.saleOrders = response.data;
        this.isShowLoading = false;
        this.totalPage = response.data.TotalPage;
        this.pageTotal = response.data.TotalRecord;
      } catch (error) {
        this.handleExeption(error);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm handleCheckAll xử lí check all khi click vào checkall
     */
    handleCheckAll(e) {
      const productIds = this.saleOrders.map((item) => item.SaleOrderId);
      const ids = productIds.filter((id) => !this.checkList.includes(id));
      if (e.target.checked) {
        this.checkList = [...this.checkList, ...ids];
      } else {
        this.checkList = [
          ...this.checkList.filter((item) => !productIds.includes(item)),
        ];
      }
    },

    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm rowOnDblClick xử lí check all khi double click mỗi hàng
     */
    rowOnDblClick(item) {
      this.orderIdSelected = item.SaleOrderId;
      this.productImageIdSelected = item.ProductImageId;
      this.productIdDuplicate = false;
      this.isShowDialog = true;
    },
    /**
     * author:Nguyễn Văn Ngọc(4/1/2023)
     * Hàm onDuplicate hiện form nhân viên khi click vào nút nhân bản
     */
    onDuplicate() {
      this.productIdDuplicate = true;
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
          this.saleOrders = res.data.Data.filter(saleOrder => {
            return saleOrder.IsActive == true
          });
          this.totalPage = res.data.TotalPage;
          this.pageTotal = res.data.TotalRecord;
          this.isShowLoading = false;
        });
        this.textSearch = "";
        this.currentPageNum = pageNum;
      } catch (error) {
        this.handleExeption(error);
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(8/1/2023)
     * Hàm onLoadCurrentpage load lại trang hiện tại khi cất
     */
    async onLoadCurrentpage(num) {
      try {
        this.isShowLoading = true;
        var res = await HTTPOrders.get()
        this.saleOrders = res.data;
        this.totalPage = res.data.TotalPage;
        this.isShowLoading = false;
        this.pageTotal = res.data.TotalRecord;
        this.checkList = [];
        this.textSearch = "";
        this.orderIdSelected = null;
        this.productImageIdSelected = null;
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
    getFilterParams(ProductFilter, PageSize, PageNumber) {
      return {
        ProductFilter: ProductFilter,
        PageSize: PageSize,
        PageNumber: PageNumber,
      };
    },
    /**
     * author:Nguyễn Văn Ngọc(14/2/2023)
     * Hàm handleExeption xử lí khi có exeption
     *
     */
    handleExeption(error) {
      if (error.code == "ERR_NETWORK") {
        this.changeToastMsg(RESOURCES.FORM_MODE.ERROR, true, false, RESOURCES.NOTIFICATION_TITLE.ERROR);
        this.onshowToast();
        this.isShowLoading = false;
      }
    },
    /**
     * author:Nguyễn Văn Ngọc(14/2/2023)
     * Hàm exportData() xuất dữ liệu employees ra file exel
     *
     */
     async exportData() {
      var me = this;
      // Call API lấy dữ liệu:
      try {
        // Hiển thị Loading
        me.isShowLoading = true;
        const response = await HTTPOrders.post("/get-saleorders-excel",{FromDate:this.fromDate,ToDate:this.toDate}, {
          responseType: "blob"
        } );
        // Lấy ra URL
        const url = URL.createObjectURL(new Blob([response.data]));
        // Tạo thẻ a
        const link = document.createElement("a");
        // Set href của thẻ a là url
        link.href = url;
        // Set attribute của thẻ a và tên của file excel
        link.setAttribute("download", "Bao_cao_doanh_thu.xlsx");
        document.body.appendChild(link);
        link.click();
        // Ẩn Loading
        me.isShowLoading = false;
      } catch (error) {
        this.handleExeption(error);
      }
    },
  },
  

  updated() { },
  watch: {
  },
};
</script>
<style scoped>
@import url("../../assets/font/fontawesome-5.15.1/css/all.min.css");

.pagination {
  list-style: none;
}
.sumary .pagination {
  margin-bottom: 16px;
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

.prev-btn.disabled {
  margin-right: 4px;
}

.next-btn.disabled {
  margin-left: 4px;
}

.sumary-block-container {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  justify-content: center;
}

.sumary-block.product-perchased {
  background: rgb(15, 92, 25);
  background: linear-gradient(0deg, rgba(15, 92, 25, 0.8970938717283788) 0%, rgba(151, 155, 156, 0.7878501742493873) 0%, rgba(127, 181, 200, 0.4881302862942052) 0%, rgba(51, 139, 195, 1) 0%, rgba(59, 144, 196, 1) 17%, rgba(31, 128, 194, 1) 38%, rgba(116, 34, 154, 1) 94%);


}

.sumary-block.product-quantity {
  background: rgb(15, 92, 25);
  background: linear-gradient(0deg, rgba(15, 92, 25, 0.8970938717283788) 0%, rgba(151, 155, 156, 0.7878501742493873) 0%, rgba(127, 181, 200, 0.4881302862942052) 0%, rgba(195, 157, 51, 1) 0%, rgba(175, 196, 59, 1) 29%, rgba(31, 194, 69, 1) 61%, rgba(99, 154, 34, 1) 94%);
}

.sumary-block.order {
  background: rgb(15, 92, 25);
  background: linear-gradient(0deg, rgba(15, 92, 25, 0.8970938717283788) 0%, rgba(151, 155, 156, 0.7878501742493873) 0%, rgba(127, 181, 200, 0.4881302862942052) 0%, rgba(177, 195, 51, 1) 0%, rgba(142, 196, 59, 1) 33%, rgba(135, 31, 194, 1) 62%, rgba(154, 34, 34, 1) 100%);

}

.sumary-block.value {
  background: rgb(15, 92, 25);
  background: linear-gradient(0deg, rgba(15, 92, 25, 0.8970938717283788) 0%, rgba(151, 155, 156, 0.7878501742493873) 0%, rgba(127, 181, 200, 0.4881302862942052) 0%, rgba(177, 195, 51, 1) 0%, rgba(196, 164, 59, 1) 29%, rgba(31, 185, 194, 1) 65%, rgba(34, 154, 58, 1) 100%);
}

.sumary-block {
  margin-top: 32px;
  padding: 16px;
  color: white;
  border-radius: 5px;
  margin-left: 24px;
  min-width: 250px;
  text-align: center;
}

.sumary-block-icon {
  width: 50px;
  height: 50px;
}

.sumary-block-text {
  font-size: 18px;
}

.sumary-block-value {
  font-size: 16px;
  margin-top: 10px;
  font-weight: bold;
}

.sumary-block-icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.sumary-block-icon-img {
  width: 100%;
}

.content-wrapper.sumary {
  background-color: #fff;
  box-shadow: 0 0 3px #01161e29;
  height: calc(100vh - 48px - 71px - 10px);
  padding: 0 24px 0 24px;
  position: relative;
  overflow: auto;
}

.sumary-block-filter {
  text-align: center;
}

.sumary-block-filter-text {
  font-size: 21px;
  font-weight: bold;
}

.sumary-block-filter-date {
  display: flex;
  justify-content: center;
  align-items: end;
  margin: 20px 0;
}

.btn-filter {
  position: relative;
  top: -2px
}

.home-page-order,
.tbl.home-page-order .home-page-order-body {
  height: auto;
  margin-bottom: 10px;
}
.sumary .empty-data {
  text-align: center;
  position: unset;
}
</style>
    
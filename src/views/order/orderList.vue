<template>
  <div class="content">
    <div class="content__header">
      <div class="content__header-text">Đơn hàng</div>
    </div>
    <div class="content-wrapper">
      <div class="content-wrapper__action" style="justify-content: space-between">
        <div v-show="checkList.length > 0" class="content-wrapper__action--muiltiple">
          <div class="content-wrapper__action-checked">
            Đã chọn
            <strong>{{ checkList.length }}</strong>
          </div>
          <div class="content-wrapper__action--remove" @click="this.checkList = []">
            Bỏ chọn
          </div>
          <div class="content-wrapper__action--delete" @click="onDeleteClick(true)">
            <div class="content-wrapper__action-container">
              <div class="icon-delete"></div>
            </div>
            <div class="content-wrapper__action-text">Xóa tất cả</div>
          </div>
        </div>
        <div style="flex: 1"></div>
        <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            ">
          <div class="textfield">
            <label for="" class="textfield__label" style="margin-bottom: 0">
              <div @click="searchData()" class="icon-search sidebar-item__icon content-icon"></div>
            </label>
            <input class="textfield__input" v-model="textSearch" placeholder="Tìm kiếm theo mã, tên sản phẩm"
              :debounce-events="['input', 'keyup']" v-debounce:600ms.lock="searchData" />
          </div>

          <div class="tooltip icon-reload sidebar-item__icon content-wrapper__action-refresh"
            @click="isShowLoading = true" :debounce-events="['click']"
            v-debounce:600ms.lock="() => onLoadCurrentpage(currentPageNum)">
            <span class="tooltiptext" style="min-width: 100px;left: 5%;">Lấy lại dữ liệu</span>
          </div>
          <div class="tooltip icon-export sidebar-item__icon content-wrapper__action-refresh" @click="exportData()">
            <span class="tooltiptext" style="min-width: 100px;left: 6%;">Xuất ra Excel(Shift+P)</span>
          </div>
        </div>
      </div>
      <div class="grid-table">
        <table class="tbl">
          <!-- <thead> -->
          <tbody>
            <tr class="tbl-row" style="position: sticky; top: 0; z-index: 10">
              <th class="tbl-col" style="z-index: 99">
                <input type="checkbox" id="checkAll" @change="handleCheckAll" :checked="isCheckAll" />
                <label for="checkAll" class="mask">
                  <div class="icon-checked"></div>
                </label>
              </th>
              <th class="tbl-col">Mã hóa đơn</th>
              <th class="tbl-col">Ngày đặt</th>
              <th class="tbl-col tbl-col--large">Tên Khách hàng</th>
              <th class="tbl-col tbl-col--large">Địa chỉ </th>
              <th class="tbl-col" style="text-align: center">Số điện thoại</th>
              <th class="tbl-col tooltip tbl-col--large" style="display: table-cell">
                Tình trạng
              </th>
              <th class="tbl-col">Tổng tiền</th>
              <th class="tbl-col" style="min-width: 112px">chức năng</th>
            </tr>
            <!-- </thead>    -->

            <tr class="tbl-row" v-for="(saleOrder, index) in saleOrders" :key="index"
              @dblclick="rowOnDblClick(saleOrder)">
              <td class="tbl-col">
                <input name="checkEmp" class="check-col" type="checkbox" :value="saleOrder.SaleOrderId"
                  :id="saleOrder.SaleOrderId" :checked="checkList.includes(saleOrder.SaleOrderId)"
                  @change="hanlderCheckBox(saleOrder.SaleOrderId)" />
                <label :for="saleOrder.SaleOrderId" class="mask">
                  <div class="icon-checked"></div>
                </label>
              </td>
              <td class="tbl-col tooltip">
                <div class="text-overflow">
                  {{ saleOrder.SaleOrderCode || "" }}
                </div>
              </td>
              <td class="tbl-col tooltip">
                <div class="text-overflow">
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

              <td class="tbl-col">
                <div class="tbl-col__action">
                  <label class="tbl-col__action-edit" @click="rowOnDblClick(saleOrder)">Sửa</label>
                  <button @click="handleOpenListAction($event, saleOrder)" @blur="onBlurActionIcon($event)"
                    class="sidebar-item__icon"
                    style="display: flex;justify-content: center;align-items: center;height: 16px;background: none;outline: none;border: none;">
                    <div class="icon-action-dropdown">
                      <!-- <input type="checkbox" hidden /> -->
                    </div>
                  </button>
                </div>
              </td>
            </tr>

            <ul class="tbl-col__action-list orderlist textfield-list" v-if="listAction.isShow" :style="listAction.style">
              <label @click="onShowDetailOrder()" for="action" class="tbl-col__action-item btn-delete">
                <label for="show-modal__confirm">Xem</label>
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
          <div class="textfield">
            <label for="" class="textfield__label">
              <label for="dropbtn" class="textfield__icon" style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  " @click="showPageList()" tabindex="0">
                <div class="icon-dropdown"></div>
              </label>
              <!-- <input type="checkbox" name="" id="dropbtn" /> -->
            </label>

            <BaseInput :class="{
              'textfield-max-content': true,
              'show-list': showListPage,
            }" v-model="currentPageSizeText" />
            <ul :class="{ 'textfield-list': true, 'show-list': showListPage }">
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
  <div class="order-detail-dialog" v-if="isShowDetailOrder">
    <div style="display: flex;
          justify-content: space-between;
          align-items: center;">
      <h2 style=" margin: 0;
          color: black;
          margin-bottom: 12px;
          font-size: 18px;">Chi tiết đơn hàng</h2>
    
      <div class="icon-close-container">
        <div @click="onCloseOrderDetail()" class="icon-close"></div>
      </div>
    </div>
  <div style="font-size: 16px; font-weight: bold; margin-bottom: 12px;" class="reject-reason" v-if="!!orderSelected.RejectReason">
        Lý do hủy đơn: {{ orderSelected.RejectReason }}
  </div>
    <table>
      <thead>
        <tr>
          <th>Mã sản phẩm</th>
          <th>Tên sản phẩm</th>
          <th>Ảnh sản phẩm</th>
          <th>Số lượng</th>
          <th>Đơn giá</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(orderItem, index) in detailProduct" :key="index">
          <td>{{ orderItem.Product.ProductCode }}</td>
          <td>{{ orderItem.Product.ProductName }}</td>
          <td> <img :src="orderItem.Product.ImageUrl" alt=""> </td>
          <td>{{ orderItem.Quantity }}</td>
          <td>{{ formatMoney(orderItem.Product.Price) }}</td>
          <td>{{ formatMoney(orderItem.Product.Price * orderItem.Quantity) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5"><strong>Tổng tiền</strong></td>
          <td>{{ formatMoney(orderSelected.TotalPrice) }}</td>
        </tr>
      </tfoot>
    </table>
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
import { HTTP, HTTPOrders, HTTPOrderItem } from "../../js/api/ConnectApi.js";
import RESOURCES from "../../js/base/resouce.js";
export default {
  name: "EmployeeList",
  components: {
    OrderDetail,
    BaseInput,
    paginate,
  },
  data() {
    return {
      orderItemArray:[],
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
      orderSelected: {},
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
      formatMoney,
      fromDate: "2023-04-08T04:55:52.746Z",
      toDate: "2023-05-21T04:55:52.746Z",
      isShowDetailOrder:false,
      detailProduct:[],
    };
  },
  created() {
    // Lấy ra 20 bản ghi đầu tiên
    this.getEmployeesFirst();
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
    onCloseOrderDetail() {
      this.isShowDetailOrder = false;
    },
    async onShowDetailOrder() {
      this.detailProduct = [];
      this.isShowDetailOrder = true;
      const res = await HTTPOrderItem.get();
      let orderItems = res.data;
      let needOrderItem =[];
      orderItems.forEach(item => {
        if (item.SaleOrderId == this.orderSelected.SaleOrderId) {
          needOrderItem.push(item);
          }
      });
      for (let i = 0; i < needOrderItem.length; i++) {
          const response = await HTTP.get(`/${needOrderItem[i].ProductId}`);
          this.detailProduct.push({Product:response.data,Quantity:needOrderItem[i].Quantity})
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
        HTTPOrders.post("/filter", { FromDate: this.fromDate, ToDate: this.toDate }).then((res) => {
          this.saleOrders = res.data.Data;
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
        this.orderSelected = emp;
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
     * Hàm exportData() xuất dữ liệu saleOrders ra file exel
     *
     */
    async exportData() {
      var me = this;
      // Call API lấy dữ liệu:
      try {
        // Hiển thị Loading
        me.isShowLoading = true;
        var data = this.getFilterParams(this.textSearch, this.pageTotal, 1);
        const response = await HTTP.post("/get-saleOrders-excel", data, {
          responseType: "blob"
        });
        // Lấy ra URL
        const url = URL.createObjectURL(new Blob([response.data]));
        // Tạo thẻ a
        const link = document.createElement("a");
        // Set href của thẻ a là url
        link.href = url;
        // Set attribute của thẻ a và tên của file excel
        link.setAttribute("download", "Danh_sach_nhan_vien.xlsx");
        document.body.appendChild(link);
        link.click();
        // Ẩn Loading
        me.isShowLoading = false;
      } catch (error) {
        this.handleExeption(error);
      }
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
  },

  updated() { },
  watch: {
  },
};
</script>
<style scoped>
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

.prev-btn.disabled {
  margin-right: 4px;
}

.next-btn.disabled {
  margin-left: 4px;
}

.tbl-col__action-list.orderlist {
  height: 33px;
}
.order-detail-dialog {
    position: fixed;
    background: white;
    padding: 20px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 700px;
    border-radius: 5px;
    border: 1px solid #ccc;
    z-index: 1000;
}

.order-detail-dialog .icon-close-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
}
.order-detail-dialog .container {
    min-height: 400px;
    max-width: 1060px;
    margin: 0 auto;
    padding: 20px;
}

.order-detail-dialog table {
    border-collapse: collapse;
    width: 100%;
}

.order-detail-dialog th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

.order-detail-dialog th {
    padding-top: 12px;
    padding-bottom: 12px;
    color: white;
    background-color: var(--primary-color);
    text-align: center;
}

.order-detail-dialog tr {
    cursor: pointer;
    min-height: 40px;
}

.order-detail-dialog tr::nth-child(even) {
    background-color: #f2f2f2;
}

.order-detail-dialog tr:hover {
    background-color: #ddd;
}

.order-detail-dialog img {
    max-width: 100px;
    height: auto;
}

.order-detail-dialog .order-info p {
    margin-bottom: 10px;
}

</style>
  
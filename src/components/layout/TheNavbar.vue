<template>
  <div :class="{'navbar':true, 'navbar-collapse': !store.state.sidebar.isOpen}">
    <div class="navbar-header">
      <div @click="store.handleOpenSidebar" class="sidebar-item__icon icon-menu-collapse header__left-three-strips"></div>
      <div class="sidebar-item__icon navbar-header__icon icon-header"></div>
      <img
        src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
        alt=""
        class="navbar-header__logo"
      />
    </div>
    <ul class="sidebar-list">
      <router-link to="/" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-sumary"></div>
        </div>
        <div class="slidebar-item-text">Tổng quan</div>
      </router-link>
      <router-link to="/product" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-cash"></div>
        </div>
        <div class="slidebar-item-text">Sản phẩm</div>
      </router-link>
      <router-link to="/category" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-deposits"></div>
        </div>
        <div class="slidebar-item-text">Danh mục</div>
      </router-link>
      <router-link to="/user" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-buy"></div>
        </div>
        <div class="slidebar-item-text">Tài khoản</div>
      </router-link>
      <router-link to="/sell" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-cart"></div>
        </div>
        <div class="slidebar-item-text">Bán hàng</div>
      </router-link>
      <router-link to="/manage-order" class="sidebar-item" tabindex="0">
        <div class="sidebar-item__icon">
          <div class="icon-manage"></div>
        </div>
        <div class="slidebar-item-text">Quản lý đơn hàng</div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  inject: ["store"],
  name: "TheNavbar",
  props:{
    
  },
  data() {
    return {
      collapse:false
    }
  },
  methods: {
    onCollapse(state) {
      this.collapse = state
    }
  },
 
};
</script>
<style scoped>
</style>

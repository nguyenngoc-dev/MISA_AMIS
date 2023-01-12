<template>
 <EmployeeList />
</template>
<script>
// import {formatDate,formatMoney} from '../../js/base/common.js'
import EmployeeList from "../../views/employee/EmployeeList.vue";
import axios from "axios";
export default {
  name: "TheContent",
  components: {
    EmployeeList,
  },
};
</script>
<style scoped>
</style>

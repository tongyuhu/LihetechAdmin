<template>
  <div class="dashboard-editor-container">
    <total></total>
    <userAdd></userAdd>
  </div>
</template>

<script>
import Total from './components/total'
import UserAdd from './components/userAdd'
export default {
  name: 'DashboardAdmin',
  components: {
    Total,
    UserAdd
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: #f4f7fba8;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>

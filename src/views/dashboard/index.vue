<template>
  <div class="dashboard-container">
      <total></total>
      <userAdd></userAdd>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import total from './total'
import userAdd from './userAdd'
export default {
  name: 'Dashboard',
  components:{
    total,
    userAdd
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

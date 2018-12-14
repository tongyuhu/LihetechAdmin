<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App',
  created () {
    // this.$router.push({path:'/'})
    console.log(this.$router)
    
  }
}
</script>

const power = {
  computed: {
    roles_power(){
      if(this.$route){
        if(this.$route.hasOwnProperty('meta')){
          if(this.$route.meta.hasOwnProperty('roles')){
            return this.$route.meta.roles
          }
        }
      }else{
        return []
      }
    },
    edit_power(){
      return this.roles_power.includes('edit')
    },
    add_power(){
      return this.roles_power.includes('add')
    },
    delete_power(){
      return this.roles_power.includes('delete')
    },
    see_power(){
      return this.roles_power.includes('see')
    },
  }
}
export default power
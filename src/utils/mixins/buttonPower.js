import { isArray } from "util";

const power = {
  computed: {
    roles_power(){
      let roles
      try {
        roles = this.$route.meta.roles.map(item=>{
          return item.replace(/^\w*:/,'')
        })
      }
      catch(err) {
        roles= []
      }
      return roles
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
  },
  // mounted () {
  //   console.log('btnpower',this.roles_power)
  // }
}
export default power
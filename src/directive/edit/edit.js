
export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    const role = 'editss'

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = permissionRoles.includes(role)
      console.log('permissionRoles',permissionRoles,role,hasPermission)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
        console.log('moveel')
      }
    } else {
      throw new Error(`need roles! Like v-edit="['admin','editor']"`)
    }
  }
}

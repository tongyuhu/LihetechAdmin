import edit from './edit'

const install = function(Vue) {
  Vue.directive('edit', edit)
}

if (window.Vue) {
  window['edit'] = edit
  Vue.use(install); // eslint-disable-line
}

edit.install = install
export default edit

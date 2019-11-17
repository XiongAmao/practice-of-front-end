const MyPlugin = {}

MyPlugin.install = function (Vue, options) {
  Vue.prototype.$MyPlugin = MyPlugin
  // do something 
}

export default MyPlugin
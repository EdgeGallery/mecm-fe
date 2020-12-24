
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
  showMessage (type, msg, time) {
    ElementUI.Message({
      showClose: true,
      type: type,
      message: msg,
      duration: time
    })
  }
}

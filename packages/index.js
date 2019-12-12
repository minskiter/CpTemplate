// Auto generate by New.js
import './light-theme/index.scss'
import Test from '@/Test/index.js'
import Alert from '@/Alert/index.js'
import Message from '@/Message/index.js'
import Dropdown from '@/Dropdown/index.js'
import Navbar from '@/Navbar/index.js'


let components = [
  Test,
Alert,
Message,
Dropdown,
Navbar,

]

const install = function(Vue){
  if (install.installed) return
  components.map(component => Vue.use(component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Test,
Alert,
Message,
Dropdown,
Navbar,

}


// Auto generate by New.js
import './light-theme/index.scss'
import Test from '@/Test/index.js'


let components = [
  Test,

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

}


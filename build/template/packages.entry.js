/**
 * @param imports
 * @param installs
 * @param theme
 */
module.exports=`// Auto generate by New.js
  import './{{theme}}-theme/index.scss'
  {{imports}}
  
  let components = [
  {{installs}}
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
    {{installs}}
  }
  `
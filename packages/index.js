// Auto generate by New.js
  import './light-theme/index.scss'
  
  
  let components = [
  
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
    
  }
  

import Navbar from './src/index.vue'

Navbar.install = function(Vue){
Vue.component(Navbar.name,Navbar)
}

export default Navbar;

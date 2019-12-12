import Alert from './src/index.vue'

Alert.install = function(Vue){
Vue.component(Alert.name,Alert)
}

export default Alert;

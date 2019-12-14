import Test from './src/index.vue'

Test.install = function(Vue){
  Vue.component(Test.name,Test)
}

export default Test;

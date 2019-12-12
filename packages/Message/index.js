import Message from './src/index.vue'

Message.install = function(Vue){
Vue.component(Message.name,Message)
}

export default Message;

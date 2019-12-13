// TODO: Auto script for generate the entry of  index.js 
let components = require('../components.json')
console.log('generate entry js/scss/sidebar')

const path = require('path')
const fileSave = require('file-save') 

const theme = 'light-theme'


let sidebar = [
  '/'
]
for (let key in components)
{
  sidebar.push(`/zh/${key}/`)
}

let files=[]

files.push({
  file:path.join(__dirname,'../examples/docs/sidebar.json'),
  content:JSON.stringify(sidebar,null,'  ')
})

let installs=''
for (let key in components){
  installs+=`  ${key},\n`
}
let imports=''
for (let key in components){
  if (components[key])
    imports+=`import ${key} from '${components[key].entry}'\n`
}

let indexJsTemplate = `// Auto generate by New.js
import './light-theme/index.scss'
${imports}

let components = [
${installs}
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
  ${installs}
}
`
files.push({
  file:path.join(__dirname,`../packages/index.js`),
  content:indexJsTemplate
})

let indexScssTemplate = ''
for (let key in components){
  indexScssTemplate+=`@import './${key}.scss';\n`
}

files.push({
  file:path.join(__dirname,`../packages/${theme}/index.scss`),
  content:indexScssTemplate
})

for (let index in files){
  fileSave(files[index].file).write(files[index].content,'utf8').end('\n')
}

module.exports=function(){
  // region: file save
}
// TODO: Auto script for generate the entry of  index.js 
let components = require('../components.json')
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
fileSave(path.join(__dirname,'../examples/docs/sidebar.json')).write(JSON.stringify(sidebar,null,'  '),'utf8').end('\n');

let files=[]

let installs=''
for (let key in components){
  installs+=`  ${key},\n`
}
let imports=''
for (let key in components){
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

// region: file save

for (let index in files){
  fileSave(files[index].file).write(files[index].content,'utf8').end('\n')
}


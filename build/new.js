'use strict'

// TODO: Auto Script for new a Component

const prefix = 'Sv'
const theme ='light-theme'

process.on('exit',(code)=>{
  if (code!=0)
    console.log(`New.Js Exit With ${code}`)
  else 
    console.log(`New.Js Exit With ${code}`)
  
})

if (!process.argv[2]){
  console.log('The Argument[2]:ComponentName is required')
  process.exit(1)
}

// dependencies

const path = require('path')
// const fs = require('fs')
const fileSave = require('file-save') 
const uppercamelcase = require('uppercamelcase')

const componentname = process.argv[2]
const ComponentName = uppercamelcase(componentname);
const chineseName = process.argv[3] || ComponentName;

console.log(`New Component ${chineseName} ...`)

let components = require('../components.json')
if (components[ComponentName]){
  console.log(`${ComponentName} already exists`)
  process.exit(1)
}

// add to components.json 
console.log(`${ComponentName} add to components.json`)
components[ComponentName]={}
components[ComponentName].entry=`@/${ComponentName}/index.js`
components[ComponentName].style={}
components[ComponentName].style[uppercamelcase(theme)]=`@/${theme}/${ComponentName}.scss`
fileSave(path.join(__dirname,'../components.json')).write(JSON.stringify(components,null,'  '),'utf8').end('\n');

// add sidebar.json
let sidebar = [
  '/'
]
for (let key in components)
{
  sidebar.push(`/zh/${key}/`)
}
fileSave(path.join(__dirname,'../examples/docs/sidebar.json')).write(JSON.stringify(sidebar,null,'  '),'utf8').end('\n');


let files=[
  // scss file 
  {
    file:path.join(__dirname,`../packages/${theme}/${ComponentName}.scss`),
    content:`.${prefix.toLowerCase()}-${componentname}{
}`
  },
  // vue index file
  {
    file:path.join(__dirname,`../packages/${ComponentName}/src/index.vue`),
    content:`<template>
  <div class="${prefix.toLowerCase()}-${componentname}">
    ${ComponentName}-Component
  </div>
</template>

<script>
export default {
  name:'${prefix}${ComponentName}'
}
</script>`
  },
  // vue entry file
  {
    file:path.join(__dirname,`../packages/${ComponentName}/index.js`),
    content:`import ${ComponentName} from './src/index.vue'

${ComponentName}.install = function(Vue){
  Vue.component(${ComponentName}.name,${ComponentName})
}

export default ${ComponentName};`
  },
  // docs file
  {
    file:path.join(__dirname,`../examples/docs/zh/${ComponentName}/README.md`),
    content:`---
title: ${ComponentName} ${chineseName} 
sidebarDepth: 2
---

[[toc]]

### ${chineseName}-DEMO 

<${prefix}-${componentname}>
</${prefix}-${componentname}>`
  }
]

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








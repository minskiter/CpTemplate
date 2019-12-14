'use strict'

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

// varible
// varible
let components = require('../components.json')
const template = require('./templates.js')()
const config = require('./config.js')
const theme = config.theme.data[config.theme.default]
const prefix = config.name.short.toLowerCase()
const preFix = uppercamelcase(config.name.short)
const componentname = process.argv[2]
const ComponentName = uppercamelcase(componentname);
const chineseName = process.argv[3] || ComponentName;

// utils
const render = require('./utils/render.js')



console.log(`New Component ${chineseName} ...`)

if (components[ComponentName]){
  console.log(`${ComponentName} already exists`)
  process.exit(1)
}

// add to components.json 
console.log(`${ComponentName} add to components.json`)
components[ComponentName]={}
components[ComponentName].entry=`@/${ComponentName}/index.js`
components[ComponentName].theme={}
components[ComponentName].theme[uppercamelcase(theme)]=`@/${theme}-theme/${ComponentName}.scss`

let files=[
  // components.json
  {
    file:path.join(__dirname,'../components.json'),
    content:JSON.stringify(components,null,'  ')
  },
  // scss file 
  {
    file:path.join(__dirname,`../packages/${theme}-theme/${ComponentName}.scss`),
    content:`.${prefix.toLowerCase()}-${componentname}{
}`
  },
  // vue index file
  {
    file:path.join(__dirname,`../packages/${ComponentName}/src/index.vue`),
    content:render(template['vue.index.js'],{
      componentname,preFix,prefix,ComponentName
    })
  },
  // vue entry file
  {
    file:path.join(__dirname,`../packages/${ComponentName}/index.js`),
    content:render(template['vue.entry.js'],{
      ComponentName
    })
  },
  // docs file
  {
    file:path.join(__dirname,`../examples/docs/zh/${ComponentName}/README.md`),
    content:render(template['docs.entry.js'],{
      chineseName,componentname,preFix,prefix,ComponentName
    })
  }
]


// region: file save

for (let index in files){
  fileSave(files[index].file).write(files[index].content,'utf8').end('\n')
}

const entry=require('./entry.js')

entry()








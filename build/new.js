'use strict'

// TODO: Auto Script for new a Component

process.on('exit',(code)=>{
  if (code!=0)
    console.error(`New.Js Exit With ${code}`)
  else 
    console.log(`New.Js EXIT`)
})

if (!process.argv[2]){
  console.error('The Argument[2]:ComponentName is required')
  process.exit
}

// const path = require('path')
// const fs = require('fs')
// const fileSave = require('file-save') 
const uppercamelcase = require('uppercamelcase')

const componentname = process.argv[2]
const ComponentName = uppercamelcase(componentname);
const chineseName = process.argv[3] || ComponentName;

console.log(`New ${chineseName}...`)


const fs = require("fs"),path = require("path"),filesave=require('file-save');
const uppercamelcase = require('uppercamelcase')


const theme = 'light-theme'

function rmdir(url){
    var files = [];
        
    if( fs.existsSync(url) ) {  
           
        files = fs.readdirSync(url);  
        files.forEach(function(file){
            var curPath = path.join(url,file);
                
            if(fs.statSync(curPath).isDirectory()) { 
                rmdir(curPath);
            } else {    
                fs.unlinkSync(curPath);    
            }
                
        });
           
        fs.rmdirSync(url); //清除文件夹
    }else{
        console.log("file dir not exists！");
    }
}

function rm(url,name){
  var files = [];
      
  if( fs.existsSync(url) ) {   
         
      files = fs.readdirSync(url);    

      files.forEach(function(file){

          var curPath = path.join(url,file);

          if(fs.statSync(curPath).isDirectory()) { 
              rm(curPath,name);
          } else {   
                 
              if(file.indexOf(name)>-1){    
                  fs.unlinkSync(curPath);
                  console.log("remove file："+curPath);
              }
          }  
      });
  }else{
      console.log("file not exists！");
  }
}

if (!process.argv[2]){
  console.log('The Argument[2]:ComponentName is required!')
  process.exit(1)
}

let componentName = uppercamelcase(process.argv[2])

let components = require('../components.json')

if (!components[componentName]){
  console.log(`The Component ${componentName} does not exists!`)
  process.exit(1)
}

rmdir(path.join(__dirname,`../examples/docs/zh/${componentName}/`))
rmdir(path.join(__dirname,`../packages/${componentName}/`))
rm(path.join(__dirname,`../packages/${theme}/`),`${componentName}.scss`)

components[componentName]=undefined

filesave(path.join(__dirname,'../components.json')).write(JSON.stringify(components,null,'  '),'utf8').end('\n')

console.log(`component ${componentName} remove!`)


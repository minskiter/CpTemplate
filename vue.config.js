import path from 'path'
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports ={
  pages:{
    index:{
      entry: 'examples/main.js',
    },
  },
  css:{
    // Separate StyleSheet
    extract:true,
    modules: false,
    sourceMap: false,
  },
  chainWebpack: config =>{
    config.resolve.alias
    .set('@',resolve('packages/'))
    config.module
    .rule('js')
    .include
    .add('/packages')
    .end()
    .use('babel')
    .loader('babel-loader')
    .tap(options=>{
      return options
    })
  },
  lintOnSave: true,
}
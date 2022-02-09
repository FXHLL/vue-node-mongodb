module.exports = {
    outputDir:__dirname+'/../server/public/admin',//编译生成目录
    publicPath: process.env.NODE_ENV === 'production'//编译后静态文件目录为生产环境时
      ? '/admin/'//自动在静态文件目录前加上此目录
      : '/'
  }
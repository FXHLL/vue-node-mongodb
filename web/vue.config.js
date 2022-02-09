module.exports = {
    outputDir:__dirname+'/../server/public/web',//编译生成目录
    publicPath: process.env.NODE_ENV === 'production'//编译后静态文件目录为生产环境时
      ? '/'//自动在静态文件目录前加上此目录
      : '/'
  }
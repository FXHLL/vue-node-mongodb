const express = require("express")

const app = express()

app.use(require("cors")())
app.use(express.json())
app.use('/admin',express.static(__dirname+'/public/admin'))
//编译后html中的相对引入路径是服务器根地址，注意不是本地访问的路径！！
app.use('/',express.static(__dirname+'/public/web'))
app.use("/uploads",express.static(__dirname + "/uploads"))//通过express托管静态文件，使得可以通过/uplads访问完整路径

app.set('secret','asf98f7ssf7979f8s97')//设置token加密字符串,开发中应该放入环境变量中

require("./routes/admin")(app)//require会默认寻找目录中的index.js
require("./plugins/db")(app) 
require("./routes/web")(app)

app.listen(3000,()=>{
    console.log("3000端口已被监听--------------------------------------------------------------");
})
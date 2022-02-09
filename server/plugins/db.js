module.exports = app=>{
    const mongoose = require("mongoose")

    mongoose.connect("mongodb://admin:admin123@localhost:27017/node-vue-moba?authSource=admin",{
        useNewUrlParser: true
    })

    mongoose.connection.on('close',()=>{//失败状态
        console.log("失败:",error);
    })
    mongoose.connection.once('open',()=>{//成功状态
        console.log('成功');
    })

    require('require-all')(__dirname + '/../models')
}
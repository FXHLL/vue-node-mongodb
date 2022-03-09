const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{type:String},
    password:{
        type:String,
        select:false,//该属性作用：是否在结果中包含该字段
        set(value){//类似getter
            return require('bcryptjs').hashSync(value,10)//将密码通过bcryptjs库散列
        }
    },
    power:{type:String}
})

module.exports = mongoose.model('AdminUser',schema)
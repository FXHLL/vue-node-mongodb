const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},
    banner:{type:String},
    title:{type:String},//称号
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],//职业
    scores:{//评分
        difficult:{type:Number},//难度
        skills:{type:Number},//技能
        attack:{type:Number},//攻击
        survive:{type:Number},//生存
    },
    skills:[{//
        icon:{type:String},
        name:{type:String},
        delay:{type:String},
        cost:{type:String}, 
        description:{type:String},//技能描述
    }],
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],//顺风出装
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],//逆风出装
    usageTips:{type:String},//使用技巧
    battleTips:{type:String},//对抗技巧
    teamTips:{type:String},//团战技巧
    partners:[{//最佳搭档
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{type:String},//最佳搭档原因
    }]

})

module.exports = mongoose.model('Hero',schema,'heroes')//模型名，表结构，数据库集合名
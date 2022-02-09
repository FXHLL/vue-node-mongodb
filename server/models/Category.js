const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
})

schema.virtual('children',{//同过children 找到关联了分类的子分类
    ref:'Category',
    localField:'_id',
    foreignField:'parent',
    justOne:false
})

schema.virtual('newsList',{//通过newList 找到关联了子分类的文章
    ref:'Article',
    localField:'_id',
    foreignField:'categories',
    justOne:false
})

module.exports = mongoose.model("Category",schema) 
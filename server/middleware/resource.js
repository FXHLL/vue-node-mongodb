const resource = options => async (req,res,next)=>{
    const Modelname = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${Modelname}`)//引入模型
    next()          
}

module.exports = resource
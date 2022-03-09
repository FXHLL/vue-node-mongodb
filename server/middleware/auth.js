const auth = options => async (req,res,next)=>{
    const express = require("express")
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')//做http错误判断

    const token = (req.headers.authorization || '').split(' ').pop()
    assert(token,401,'请先登录')//没有token
    //如果传递给 jwt.verifty 函数的 Token 为 null，JWT 将返回 jwt malformed
    const tokenData = jwt.verify(token,req.app.get('secret'))//校验
    const {id} = tokenData
    assert(id,401,'请先登录')//token不对
    const AdminUser = require('../models/AdminUser')
    req.user = await AdminUser.findById(id)
    res.locals.user = req.user
    assert(req.user,401,'请先登录')//没有此用户
    await next()
}
module.exports = auth
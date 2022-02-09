module.exports = app=>{

    const express = require("express")
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')//做http错误判断

    const router = express.Router({
        mergeParams:true//合并url参数，使得子路由可以获取参数
    })//创建子路由

    //token验证中间件
    const authMiddleware = require('../../middleware/auth')

    //资源中间件
    const resourceMiddleware = require('../../middleware/resource')

    //通用接口实现的的中间件，再将router载到应用上
    app.use("/admin/api/rest/:resource",authMiddleware(),resourceMiddleware(),router)//将子路由挂在到应用上

    //资源上传
    const multer = require("multer")
    const upload = multer({dest:__dirname + "/../../uploads"})
    app.post("/admin/api/upload",authMiddleware(),upload.single("file"),async (req,res)=>{
        let file = req.file
        console.log(upload.single.toString());
        file.url = `http://www.fxhll.top/uploads/${file.filename}`
        // file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    //登录页面
    app.post("/admin/api/login",async (req,res)=>{
        const {username,password} = req.body
        //1.根据用户名查找用户
        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({username}).select('+password')//强制包含字段

        assert(user,422,'用户不存在')//断言：user为false则抛出httperror

        //2.校验密码
        const isValid = require('bcryptjs').compareSync(password,user.password)
        assert(isValid,422,'密码错误')
        // if(!isValid){
        //     return res.status(422).send({
        //     message:'密码错误！'
        //     })
        // }
        //3.返回token
        const token= jwt.sign({id:user._id},app.get('secret'))
        res.send({token})
    })

    //新建资源
    router.post("/",async (req,res)=>{//子路由添加路径不需要加前面的/admin/api了
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //获取资源
    router.get("/",async (req,res)=>{//子路由添加路径不需要加前面的/admin/api了
        const queryOptions = {}
        if(req.Model.modelName === "Category"){//这个modelName是获取的Category实例上的属性，和上面的modelName只是同名了

            queryOptions.populate = "parent"
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(200)//.populate填充关联的字段
        res.send(items)
    })

    //资源详情
    router.get("/:id",async (req,res)=>{ 
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    //修改资源
    router.put("/:id",async (req,res)=>{
        const new_model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(new_model)
    })

    //删除资源
    router.delete("/:id",async (req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id)
        res.send("success!")
    })
    
    //错误处理程序
    app.use(async (err,req,res,next)=>{
        console.log(err)
        res.status(err.statusCode || 500).send({// ||500是因为会捕获所有错误，有的错误没有状态码
            message:err.message
        })
    })





}
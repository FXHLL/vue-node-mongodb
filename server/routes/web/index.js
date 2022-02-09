module.exports = app => {
    const express = require('express')
    const router = express.Router()//创建路由实例
    
    //传递模型方法
    //Method 1 
    // const Article = require('../../models/Article')
    //Method 2
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Category = mongoose.model('Category')
    const Hero = mongoose.model('Hero')
    const Item = mongoose.model('Item')

    //将文章写入的手段。。。
    router.get('/news/init',async (req,res) => {
        //cats只查询新闻分类下的文档(首先查询上级分类的新闻分类的文档，然后根据parent字段作为条件查询关联新闻分类的文档)
        const parent = await Category.findOne({
            name:'新闻分类'
        })
        const cats = await Category.where({
            parent
        }).lean()
        //那些激活 lean 选项的查询，返回的文档是普通 json 对象，
        //而不是 Mongoose Documents。 这些对象没有 save 方法、getters/setters，也没有被赋予其他 Mongoose magic。
        
        //查询返回的对象是不能直接修改的,可以通过.lean()
        const newsTitles = 
        ['初一大团圆-《斗你玩》王者番外-拖米篇', '虎年共荣耀，快手王者主播缤纷活动陪你欢度春节', '狄某有话说 | 春节之际，1月峡谷数据盘点奉上！', '元歌皮肤设计大赛创意作品赏析第八期', '知乎官号新春活动 分享故事赢虎年限定皮肤', '2月1日全服不停机更新公告', '1月31日《擂鼓集福签》活动异常说明公告', '1月31日异常问题说明公告', '1月30日全服不停机更新公告', '1月28日体验服停机更新公告', '【红包闹新春】发红包分享刘邦新皮肤', '【QQ福利】春节免单活动公告（虎年限定皮肤）', '集虎年限定春节皮肤，赢限定红包封面福利', '除夕将至，峡谷福利大盘点', '【虎神送福】活动开启公告','助力冰雪运动发展，数智体育迎来全面爆发', '奥运冠军、KPL选手齐聚一堂，颁奖盛典今晚18：00精彩开启', '挑战者杯预报丨秋决重演！武汉eStar战广州TTG谁能捧杯', '广州TTG夺得2022第三届王者荣耀微博杯总冠军', '候选人公布！年度最佳阵容最佳选手即将揭晓']

        const newsList = newsTitles.map(title => {
            //根据slice(0)返回新数组，sort排序函数：(0~1)-0.5 = +/- 50%,实现随机排序
            const randomCats = cats.slice(0).sort((a,b) => Math.random() - 0.5)
            return{
                categories:randomCats.slice(0,2),
                title
            }
        })

        await Article.deleteMany({})//删除所有文档
        await Article.insertMany(newsList)
        res.send(newsList)
    })

    //将英雄写入的手段
    router.get('/heroes/init',async (req,res) => {
        const rawData = [{"name":"热门","heroes":[{"name":"鲁班七号","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"孙尚香","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"妲己","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"瑶","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"},{"name":"马可波罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"},{"name":"安琪拉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"甄姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"后羿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"}]},{"name":"战士","heroes":[{"name":"赵云","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},{"name":"墨子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},{"name":"钟无艳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},{"name":"吕布","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},{"name":"夏侯惇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},{"name":"曹操","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"},{"name":"典韦","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},{"name":"宫本武藏","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"},{"name":"达摩","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},{"name":"老夫子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"},{"name":"关羽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"},{"name":"程咬金","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"},{"name":"露娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},{"name":"花木兰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},{"name":"橘右京","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"刘备","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"},{"name":"杨戬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"},{"name":"雅典娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"},{"name":"哪吒","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"苏烈","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},{"name":"梦奇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"},{"name":"裴擒虎","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"},{"name":"狂铁","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"},{"name":"孙策","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},{"name":"李信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"},{"name":"盘古","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"},{"name":"云中君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"},{"name":"曜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"},{"name":"马超","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"},{"name":"蒙恬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg"},{"name":"夏洛特","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/536/536.jpg"},{"name":"司空震","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg"},{"name":"云缨","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg"}]},{"name":"法师","heroes":[{"name":"小乔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"},{"name":"墨子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},{"name":"妲己","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"嬴政","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"},{"name":"高渐离","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"},{"name":"孙膑","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"},{"name":"扁鹊","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"},{"name":"芈月","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},{"name":"周瑜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"},{"name":"甄姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"武则天","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"},{"name":"貂蝉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"},{"name":"安琪拉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},{"name":"露娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},{"name":"姜子牙","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"},{"name":"王昭君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"},{"name":"张良","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"},{"name":"不知火舞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},{"name":"钟馗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},{"name":"诸葛亮","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"},{"name":"干将莫邪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"},{"name":"女娲","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"},{"name":"杨玉环","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"},{"name":"弈星","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"},{"name":"米莱狄","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"},{"name":"司马懿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},{"name":"沈梦溪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"},{"name":"上官婉儿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"嫦娥","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"},{"name":"西施","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg"},{"name":"司空震","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg"},{"name":"金蝉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/540/540.jpg"}]},{"name":"坦克","heroes":[{"name":"廉颇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"},{"name":"庄周","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},{"name":"刘禅","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"},{"name":"钟无艳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},{"name":"白起","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"},{"name":"芈月","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},{"name":"吕布","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},{"name":"夏侯惇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},{"name":"达摩","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},{"name":"项羽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"},{"name":"程咬金","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"},{"name":"刘邦","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"牛魔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"},{"name":"张飞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"},{"name":"太乙真人","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"},{"name":"东皇太一","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"苏烈","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},{"name":"梦奇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"},{"name":"孙策","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},{"name":"盾山","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"},{"name":"嫦娥","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"},{"name":"猪八戒","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"},{"name":"蒙恬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg"},{"name":"阿古朵","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"}]},{"name":"刺客","heroes":[{"name":"赵云","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},{"name":"阿轲","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"},{"name":"李白","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"},{"name":"貂蝉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"},{"name":"韩信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},{"name":"兰陵王","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"},{"name":"花木兰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},{"name":"不知火舞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},{"name":"娜可露露","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"},{"name":"橘右京","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"百里守约","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},{"name":"百里玄策","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"},{"name":"裴擒虎","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"},{"name":"元歌","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"},{"name":"司马懿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},{"name":"上官婉儿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"云中君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"},{"name":"马超","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"},{"name":"镜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg"},{"name":"澜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg"},{"name":"云缨","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg"},{"name":"暃","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/542/542.jpg"}]},{"name":"射手","heroes":[{"name":"孙尚香","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"鲁班七号","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"马可波罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"},{"name":"狄仁杰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"},{"name":"后羿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"李元芳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"},{"name":"虞姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"},{"name":"成吉思汗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"},{"name":"黄忠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"},{"name":"百里守约","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},{"name":"公孙离","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"},{"name":"伽罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"},{"name":"蒙犽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg"},{"name":"艾琳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/155/155.jpg"}]},{"name":"辅助","heroes":[{"name":"庄周","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},{"name":"刘禅","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"},{"name":"孙膑","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"},{"name":"牛魔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"},{"name":"张飞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"},{"name":"钟馗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},{"name":"蔡文姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"},{"name":"太乙真人","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"},{"name":"大乔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"},{"name":"东皇太一","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"},{"name":"鬼谷子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"},{"name":"明世隐","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"},{"name":"盾山","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"},{"name":"瑶","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"},{"name":"鲁班大师","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg"},{"name":"阿古朵","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"},{"name":"金蝉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/540/540.jpg"}]}]
        await Hero.deleteMany({})
        for(let cat of rawData){
            if(cat.name === "热门"){
                continue
            }
            //找到当前分类在数据库中对应的数据
            const category = await Category.findOne({
                name:cat.name
            })
            console.log(cat.name)
            cat.heroes = cat.heroes.map(hero => {
                hero.categories = [category]//Hero模型的categories是关联数据，且为数组
                return hero
            })
            //录入英雄(
            await Hero.insertMany(cat.heroes)
        }
        res.send(await Hero.find())
    })

    //将装备写入的手段
    router.get('/items/init',async (req,res)=>{
        const data = [
            {
                "name": "铁剑",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1111.jpg"
            },
            {
                "name": "匕首",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1112.jpg"
            },
            {
                "name": "搏击拳套",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1113.jpg"
            },
            {
                "name": "吸血之镰",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1114.jpg"
            },
            {
                "name": "雷鸣刃",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1116.jpg"
            },
            {
                "name": "冲能拳套",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1117.jpg"
            },
            {
                "name": "风暴巨剑",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1121.jpg"
            },
            {
                "name": "日冕",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1122.jpg"
            },
            {
                "name": "狂暴双刃",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1123.jpg"
            },
            {
                "name": "陨星",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1124.jpg"
            },
            {
                "name": "碎星锤",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1131.jpg"
            },
            {
                "name": "末世",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1126.jpg"
            },
            {
                "name": "名刀·司命",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1127.jpg"
            },
            {
                "name": "寒霜袭侵",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1128.jpg"
            },
            {
                "name": "速击之枪",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1129.jpg"
            },
            {
                "name": "制裁之刃",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/11210.jpg"
            },
            {
                "name": "泣血之刃",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1132.jpg"
            },
            {
                "name": "无尽战刃",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1133.jpg"
            },
            {
                "name": "宗师之力",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1134.jpg"
            },
            {
                "name": "闪电匕首",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1135.jpg"
            },
            {
                "name": "影刃",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg"
            },
            {
                "name": "暗影战斧",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1137.jpg"
            },
            {
                "name": "破军",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1138.jpg"
            },
            {
                "name": "纯净苍穹",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/11311.jpg"
            },
            {
                "name": "逐日之弓",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1141.jpg"
            },
            {
                "name": "破魔刀",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1125.jpg"
            },
            {
                "name": "穿云弓",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1154.jpg"
            },
            {
                "name": "破晓",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1155.jpg"
            },
            {
                "name": "咒术典籍",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1211.jpg"
            },
            {
                "name": "蓝宝石",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1212.jpg"
            },
            {
                "name": "炼金护符",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1213.jpg"
            },
            {
                "name": "圣者法典",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1214.jpg"
            },
            {
                "name": "元素杖",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1216.jpg"
            },
            {
                "name": "大棒",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1221.jpg"
            },
            {
                "name": "破碎圣杯",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1229.jpg"
            },
            {
                "name": "光辉之剑",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1223.jpg"
            },
            {
                "name": "进化水晶",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1225.jpg"
            },
            {
                "name": "血族之书",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1222.jpg"
            },
            {
                "name": "炽热支配者",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1227.jpg"
            },
            {
                "name": "梦魇之牙",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/12211.jpg"
            },
            {
                "name": "虚无法杖",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1231.jpg"
            },
            {
                "name": "博学者之怒",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1232.jpg"
            },
            {
                "name": "辉月",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1239.jpg"
            },
            {
                "name": "回响之杖",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1233.jpg"
            },
            {
                "name": "凝冰之息",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1234.jpg"
            },
            {
                "name": "痛苦面具",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1235.jpg"
            },
            {
                "name": "巫术法杖",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1236.jpg"
            },
            {
                "name": "圣杯",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1226.jpg"
            },
            {
                "name": "时之预言",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1237.jpg"
            },
            {
                "name": "贤者之书",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1238.jpg"
            },
            {
                "name": "噬神之书",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1240.jpg"
            },
            {
                "name": "红玛瑙",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1311.jpg"
            },
            {
                "name": "布甲",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1312.jpg"
            },
            {
                "name": "抗魔披风",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1313.jpg"
            },
            {
                "name": "提神水晶",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1314.jpg"
            },
            {
                "name": "力量腰带",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1321.jpg"
            },
            {
                "name": "熔炼之心",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1322.jpg"
            },
            {
                "name": "神隐斗篷",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1323.jpg"
            },
            {
                "name": "雪山圆盾",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1324.jpg"
            },
            {
                "name": "守护者之铠",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1325.jpg"
            },
            {
                "name": "近卫荣耀",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1724.jpg"
            },
            {
                "name": "奔狼纹章",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1723.jpg"
            },
            {
                "name": "反伤刺甲",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1327.jpg"
            },
            {
                "name": "血魔之怒",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1328.jpg"
            },
            {
                "name": "红莲斗篷",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1331.jpg"
            },
            {
                "name": "霸者重装",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1332.jpg"
            },
            {
                "name": "冰霜冲击",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1341.jpg"
            },
            {
                "name": "不祥征兆",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1333.jpg"
            },
            {
                "name": "不死鸟之眼",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1334.jpg"
            },
            {
                "name": "魔女斗篷",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1335.jpg"
            },
            {
                "name": "极寒风暴",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1336.jpg"
            },
            {
                "name": "冰痕之握",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/13310.jpg"
            },
            {
                "name": "贤者的庇护",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1337.jpg"
            },
            {
                "name": "暴烈之甲",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1338.jpg"
            },
            {
                "name": "神速之靴",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1411.jpg"
            },
            {
                "name": "影忍之足",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1421.jpg"
            },
            {
                "name": "抵抗之靴",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1422.jpg"
            },
            {
                "name": "冷静之靴",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1423.jpg"
            },
            {
                "name": "秘法之靴",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1424.jpg"
            },
            {
                "name": "急速战靴",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1425.jpg"
            },
            {
                "name": "疾步之靴",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1426.jpg"
            },
            {
                "name": "狩猎宽刃",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1511.jpg"
            },
            {
                "name": "游击弯刀",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1521.jpg"
            },
            {
                "name": "巡守利斧",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1522.jpg"
            },
            {
                "name": "追击刀锋",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1523.jpg"
            },
            {
                "name": "符文大剑",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1531.jpg"
            },
            {
                "name": "巨人之握",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1532.jpg"
            },
            {
                "name": "贪婪之噬",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1533.jpg"
            },
            {
                "name": "鼓舞之盾",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1714.jpg"
            },
            {
                "name": "风灵纹章",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1713.jpg"
            },
            {
                "name": "救赎之翼",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1722.jpg"
            },
            {
                "name": "风之轻语",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1712.jpg"
            },
            {
                "name": "极影",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1721.jpg"
            },
            {
                "name": "星泉",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1725.jpg"
            },
            {
                "name": "星之佩饰",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1726.jpg"
            },
            {
                "name": "凤鸣指环",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1711.jpg"
            },
            {
                "name": "学识宝石",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1701.jpg"
            },
            {
                "name": "日暮之流",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1727.jpg"
            },
            {
                "name": "金色圣剑",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1728.jpg"
            },
            {
                "name": "弃鳞短刃",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1512.jpg"
            },
            {
                "name": "龙鳞利剑",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1524.jpg"
            },
            {
                "name": "浴火之怒",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1534.jpg"
            },
            {
                "name": "荆棘护手",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1345.jpg"
            },
            {
                "name": "永夜守护",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1347.jpg"
            },
            {
                "name": "暗夜小甲",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1346.jpg"
            },
            {
                "name": "原初遗珠",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1349.jpg"
            },
            {
                "name": "怒魂",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1350.jpg"
            },
            {
                "name": "凛冬",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1351.jpg"
            },
            {
                "name": "日渊",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1156.jpg"
            },
            {
                "name": "天穹",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1157.jpg"
            },
            {
                "name": "月神",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1242.jpg"
            },
            {
                "name": "魔道之石",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1224.jpg"
            },
            {
                "name": "云灵木",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1243.jpg"
            },
            {
                "name": "出影晶石",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1717.jpg"
            },
            {
                "name": "形昭之鉴",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1737.jpg"
            },
            {
                "name": "迅捷长矛",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1115.jpg"
            },
            {
                "name": "破茧之衣",
                "icon": "https://game.gtimg.cn/images/yxzj/img201606/itemimg/1244.jpg"
            }
        ]
        await Item.deleteMany({})
        await Item.insertMany(data)
    })

    //获取新闻数据
    router.get('/news/list',async (req,res)=>{

        // 查询
        // const parent = await Category.findOne({
        //     name:'新闻分类'
        // }).populate({
        //     path:'children',
        //     populate:{
        //         path:'newsList'
        //     }
        // }).lean()
        const parent = await Category.findOne({name:'新闻分类'})
        const cats = await Category.aggregate([
            {$match:{parent:parent._id}},
            {
                $lookup:{
                    from:'articles',// 从哪个Schema中查询
                    localField:'_id',
                    foreignField:'categories',
                    as:'newsList'
                }
            },
            {
                $addFields:{
                    newsList:{$slice:['$newsList',5]}//限制数据5条
                }
            }
        ])

        const subCats = cats.map(v=>v._id)

        cats.unshift({
            name:'热门',
            newsList: await Article.find().where({categories:{$in:subCats}}).populate('categories').limit(5).lean()
        })
        
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门')?news.categories[0].name : cat.name
                return news
            })
            return cats
        })

        res.send(cats)
    })

    //获取英雄数据
    router.get('/heroes/list',async (req,res)=>{

        const parent = await Category.findOne({name:'英雄分类'})
        const cats = await Category.aggregate([
            {$match:{parent:parent._id}},//查找所有子分类
            {
                $lookup:{//查找关联了子分类的英雄数据
                    from:'heroes',// 从哪个Schema中查询(数据库中的集合)
                    localField:'_id',
                    foreignField:'categories',
                    as:'heroList'//别名
                }
            }
        ])


        const subCats = cats.map(v=>v._id)

        cats.unshift({
            name:'热门',
            // heroList: await Hero.find().where({categories:{$in:subCats}}).limit(10).lean()
            // heroList: await Hero.aggregate( [ { $sample: { size: 10} } ] )//随机查10个
            // ['花木兰','李信','马超','露娜','韩信','赵云','不知火舞','马可波罗','孙策','廉颇']
            heroList: await Hero.find({_id:{$in: [
                '61fb6c5ba75438b34f8b10aa','61fb6c5ba75438b34f8b10b6','61fb6c5ba75438b34f8b10b7','61fb6c5ba75438b34f8b10c4','61fb6c5ba75438b34f8b10c5','61fb6c5ba75438b34f8b10c9','61fb6c5ba75438b34f8b10e1','61fb6c5ba75438b34f8b10f2','61fb6c5ba75438b34f8b1112','61fb6c5ba75438b34f8b1129'
            ]}}).lean()
        }) 
        cats.map(cat => {
            cat.heroList.map(heroes => {
                heroes.categoryName = (heroes.name === '热门')?heroes.categories[0].name : cat.name
                return heroes
            })
            return cats
        })

        res.send(cats)
    })

    //获取文章详情数据
    router.get('/articles/:id',async (req,res)=>{
        res.send(await Article.findById(req.params.id))
    })

    //获取英雄详情页
    router.get('/heroes/:id',async (req,res)=>{
        const data = await Hero.findById(req.params.id).populate('categories items1 items2 partners.hero')
        res.send(data)
    })

    app.use("/web/api",router)


}
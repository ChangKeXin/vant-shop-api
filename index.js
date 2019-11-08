const express = require('express')
const app = express()

// 解决办法跨域
app.use( require('cors')()  )

// 1 引入 mysql
const mysql = require('mysql')
// 2 创建一个新的连接对象
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123123',
    database : 'fullstack34shop'
})
// 3 连接 mysql
db.connect()
   
/*          接口路由代码  **********/
// req：接收用户提交的参数
// res：给前端返回数据
app.get('/api/v1/main_ad_images', (req, res) => {
    let sql = 'SELECT image,link FROM shop_swipe_images'
    // 执行 SQL
    // err：如果出错，错误信息、
    // data：执行 SQL 之后的返回值
    db.query(sql, (err, data)=>{
        if(err) {
            // 给前端返回 JSON 数据
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            // 给前端返回 JSON 数据
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})

app.get('/api/v1/index_categories', (req, res) => {
    let sql = 'SELECT * FROM shop_categories'
    // 执行 SQL
    // err：如果出错，错误信息、
    // data：执行 SQL 之后的返回值
    db.query(sql, (err, data)=>{
        if(err) {
            // 给前端返回 JSON 数据
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            // 给前端返回 JSON 数据
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})

// 商品接口
app.get('/api/v1/index_goods', (req, res)=>{

    // 接收 page 和 per_page 两个参数
    // 如果没有传默认是1 和 20
    let page     = req.query.page || 1             // 接收 page 参数，如果为空就得到 1
    let per_page = req.query.per_page || 20          // 接收 per_page 参数，如果为空，默认20

    // 取出某一页的 20 条
    // 翻页的原理：SQL 加 LIMIT 
    // LIMIT x,y      x：开始的下标    y：取的数量
    // 第 1 页的 20 条  ： LIMIT 0,20
    // 第 2 页的 20 条  ： LIMIT 20,20  （从第21条记录开始取，取20条）
    // 第 3 页的 20 条  ： LIMIT 40,20  （从第41条记录开始取，取20条）
    // 第 n 页的 20 条  :  LIMIT (n-1)*20    ,   20

    // 开始的下标 （当前页-1）*每页条数
    let offset = (page-1)*per_page
    let sql = `SELECT * FROM shop_goods LIMIT ${offset},${per_page}`

    // 执行 SQL 语句
    // err：执行SQL 的错误信息
    // data：返回的fjs
    db.query(sql, (err, data)=>{
        
        // 如果失败就返回错误信息，如果成功就返回数据
        if(err) {
            // 返回前数据
            res.json({
                'ok': 0,
                'error': err
            })
        } else {
            res.json({
                'ok': 1,
                'data': data
            })
        }
    })
})

// 启动服务器
app.listen(9999, ()=>{
    console.log('成功！监听：127.0.0.1:9999!')
})
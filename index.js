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

// 启动服务器
app.listen(9999, ()=>{
    console.log('成功！监听：127.0.0.1:9999!')
})
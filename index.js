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
app.get('/api/v1/index_goods', (req, res) => {

    // 接收 page 和 per_page （?后面的参数都使用 req.query 接收）
    let page     = req.query.page || 1            // 接收 page ，如果不传默认是 1
    let per_page = req.query.per_page || 20   // 接收 per_page ， 如果不传默认是 20

    // 实现翻页原理：SQL 语句最后加上 limit 
    // 语法： limit x , y
    //       limit x 相当于 limit 0,x
    //        x：开始取的记录的下标 ，0 代表1
    //        y：一共取多少个，
    // 比如：    limit 0, 10 ：从第1条记录开始取，取10条（前10条）
    //          limit 10,10 ：从第 11 条记录开始取，取10 条
    //          limit 10    ：相当于 limit 0,10 ：含义：取前10条
    // 第1页每页10条       limit 0          ,   10
    // 第2页每页10条       limit 10         ,   10
    // .....
    // 第n页每页10条       limit (n-1)*10   ,   10

    // 计算开始的下标
    let offset = (page-1)*per_page

    let sql = `SELECT * FROM shop_goods LIMIT ${offset},${per_page}`
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
app.get('/api/v1/goods', (req, res) => {

    // 接收 id
    let id = req.query.id   // 1,2,3,4,5,6,8,88

    /********** 拼出 ? 
     * （SQL 的预处理功能：1. 加快 SQL 执行的效率 2. 更加安全，可以防止 SQL 注入 
     * */
    // 先把 id 转成数组
    id = id.split(',')  // [1,2,3,4,5,6,8,88]
    // 循环数组获取 ?
    let wenhao = []  // 保存 ?
    id.forEach(v=>{
        wenhao.push('?')   // [?,?,?,?,?,?,?,?]
    })
    // 把问号的数组转成字符串
    wenhao = wenhao.join(',')   // ?,?,?,?,?,?,?,?

    let sql = `SELECT * FROM shop_goods WHERE id IN(${wenhao})`
    // console.log(sql)
    // 执行时把?对应的参数加上
    db.query(sql, id, (err, data)=>{
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
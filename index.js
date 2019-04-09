var http = require('http')
var url = require('url')
var port = process.argv[2]
var fs = require('fs');
var mysql = require('mysql');
if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('方方说：含查询字符串的路径\n' + pathWithQuery)
    let group = {}
    let classes = {}
    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
         let    connection= mysql.createConnection({
            host: 'localhost',
            user: 'root',
            port: 3306,
            password: '12345678',
            database: 'node'
         })
         connection.connect();
         connection.query('select *  from user',function(err, rows, fields){
            response.write(JSON.stringify(rows))
            response.end()


         })
          

    } else  if(path === '/add'&method==='POST'){
      readBody(request).then((data)=>{
    let    connection= mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: '12345678',
        database: 'node'
     })
     connection.connect();
     var addSqlParams = [];
     data=JSON.parse(data)
      console.log( typeof data,12)
     addSqlParams.push(data.Name)
     connection.query('insert into  User (Name) values(?)',addSqlParams,function(err, rows, fields){
        response.write(JSON.stringify({Name:'李泽泽'}))
        response.end()

     })
  })

    }else{
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write('呜呜呜')
        response.end()
    }

    
    function readBody(request){
        return new Promise((resolve, reject)=>{
          let body = []
          request.on('data', (chunk) => {
            body.push(chunk);
          }).on('end', () => {
            body = Buffer.concat(body).toString();
            resolve(body)
          })
        })
      }
    
    /******** 代码结束，下面不要看 ************/
})


server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)



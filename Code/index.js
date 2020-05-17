const express= require('express')
const app = express();
const port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
 db= low(adapter);
 // Set some defaults (required if your JSON file is empty)
 db.defaults({ users: []})
 .write()
// var  users=[
//     {id :1, name:'Vũ Trang Linh'},
//     {id :2, name:'Nguyễn Lê Bảo Thanh'},
//     {id :3, name:'Phạm Bạch Tuyết'},
//     {id :4, name:'Nguyễn Linh Nam'},
// ]


app.set('view engine','pug');// chuyển css sang kiểu dữ liệu của pug

app.set('views', './views');

app.get('/',(req, res) => res.render('index', {
    name:'hoamayman'
}));

app.get('/users', function(req, res){
    res.render('users/index', {
        // in ra users tu file co san db.json
        users: db.get('users').value()
    })
})

// function search

app.get('/users/search', function (req, res){
    var  q=  req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q)!==-1;
    })
    res.render('users/index',{
        users: matchedUsers
    })
});

// function create  
app.get('/users/create', function(req, res){
    res.render('users/create')
})
// thêm dữ liệu vào trong database
//.write(). lưu lại vào file cho mk
 app.post('/users/create',  function(req, res){
          db.get('users').push(req.body).write();
          res.redirect('/users');
 });


app.listen(port, () => console.log(`Example app listen on port ${port}!`));



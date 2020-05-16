const express= require('express')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var  users=[
    {id :1, name:'Vũ Trang Linh'},
    {id :2, name:'Nguyễn Lê Bảo Thanh'},
    {id :3, name:'Phạm Bạch Tuyết'},
    {id :4, name:'Nguyễn Linh Nam'},
]


app.set('view engine','pug');
app.set('views', './views');

app.get('/',(req, res) => res.render('index', {
    name:'hoamayman'
}));
app.get('/users', function(req, res){
    res.render('users/index', {
        users: users
    })
})

// function search

app.get('/users/search', function (req, res){
    var  q=  req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q)!==-1;
    })
    res.render('users/index',{
        users: matchedUsers
    })
});

// function create  
app.get('/users/create', function(req, res){
    var  q=  req.query.q;
var matchedUsers = users.filter(function(user){
    return user.name.toLowerCase().indexOf(q)!==-1;
})
    res.render('users/create',{
        users: matchedUsers
    })
})
// thêm dữ liệu vào trong database

 app.post('/users/create',  function(req, res){
          users.push(req.body);
          res.redirect('/users');
 });


app.listen(port, () => console.log(`Example app listen on port ${port}!`));



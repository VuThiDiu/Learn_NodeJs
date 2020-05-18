// khai báo để sử dụng 

var express = require('express')
var router = express.Router()

var  db = require('../db');//.. thể hiện đi ra  ngoài folder
var shortid = require('shortid');

router.get('/search', function (req, res){
    var  q=  req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q)!==-1;
    })
    res.render('users/index',{
        users: matchedUsers
    })
});

// function create  
router.get('/create', function(req, res){
    res.render('users/create')
})
router.get('/:id', function(req, res){
        var id= req.params.id;
        
        var user=db.get('users').find({id: id}).value();
        console.log(user.name);
        res.render('users/view', {
            user : user
        })
})


// thêm dữ liệu vào trong database
//.write(). lưu lại vào file cho mk
 router.post('/create',  function(req, res){
          req.body.id= shortid.generate();
          db.get('users').push(req.body).write();
          res.redirect('/users');
 });

 router.get('/', function(req, res){
    res.render('users/index', {
        // in ra users tu file co san db.json
        users: db.get('users').value()
    })
})


 module.exports = router;
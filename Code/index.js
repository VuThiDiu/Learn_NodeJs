const express= require('express')
const app = express();
const port = 3000;
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
app.get('/users/search', function (req, res){
    var  q=  req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q)!==-1;
    })
    res.render('users/index',{
        users: matchedUsers
    })
});
app.listen(port, () => console.log(`Example app listen on port ${port}!`));



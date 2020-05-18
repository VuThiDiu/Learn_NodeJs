const express= require('express')
const app = express();
const port = 3000;

var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.set('view engine','pug');// chuyển css sang kiểu dữ liệu của pug

app.set('views', './views');

app.get('/',(req, res) => res.render('index', {
    name:'hoamayman'
}));

app.use('/users', userRoute);


app.listen(port, () => console.log(`Example app listen on port ${port}!`));



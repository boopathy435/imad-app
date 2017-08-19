var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'kboopathyk7',
    database: 'kboopathyk7',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));



var fm = {
    'kanagu': {
      title: 'Kanagaraj',
    content: `<p>Hi! I am KanaguHi! I am KanaguHi! I am KanaguHi! I am KanaguHi! I am KanaguHi! I am KanaguHi! I am KanaguHi! I am KanaguHi! I am KanaguHi! I am Kanagu
            Hi! I am KanaguHi! I am KanaguHi! I am KanaguHi! I am KanaguHi! I am KanaguHi! I am Kanagu.</p>`
              },
     'krishnakan': {
     title: 'Kannammal Krishnasamy',
    content: `<p>Hi! I am Kannammal Krishnasamy</p>`
}             
};

function createtemplate(data){ 
      var title=data.title;
      var content=data.content;
 var htmltemplate=`<!doctype html>
<html>
    <head>
        <title>${title}</title>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div>
            <a href="/">Home</a>
            </div>
       <div class="center">
            <img src="/ui/madi.png" class="img-medium"/>
        </div>
        <br>
        <div class="center text-big bold">
        ${date}
        <hr>
           ${content}
        </div>
        <script type="text/javascript" src="/ui/main.js">
        </script>
    </body>
</html>
`; 
return htmltemplate;
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
//app.get('/testdb',function(req,res) {
 //   pool.query('SELECT * FROM test',function(err,result) {
//        if(err){
//            res.status(500).send(err.toString());
//        }else{
 //           res.send(JSON.stringify(result.rows));
//        }
//    });
//});

app.get('/article/:mem', function (req, res) {
pool.query("SELECT * FROM test WHERE id = '"+req.params.mem+"'", function(err, result) {
    if(err){
        res.status(500).send(err.toString());
    }else{
        if(result.rows.length ===0){
            res.status(404).send('Article not found');
        }else{
            var mem=result.rows[0];
            res.send(createtemplate(fm[mem]));
        }
    }
});
  
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

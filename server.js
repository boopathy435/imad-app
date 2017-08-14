var express = require('express');
var morgan = require('morgan');
var path = require('path');

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

app.get('/:mem', function (req, res) {
    var mem=req.params.mem;
  res.send(createtemplate(fm[mem]));
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

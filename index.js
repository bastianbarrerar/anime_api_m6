const express = require('express');
const app = express();
const router = require('./src/router.js');

port = 3001;
app.use(express.json());


app.get('/', (req,res)=>{
    res.send('oh, hi mark')});

app.use('/api/v1/', router);

app.get("*", function (req, res) {
  res.status(404).json({info: "page not found"});
});


app.listen(port,()=> console.log('server listen on port ' + port));

module.exports = app;
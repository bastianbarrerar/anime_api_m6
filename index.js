const express = require('express');
const app = express();
const router = require('./router.js');

port = 3001;
app.use(express.json());


app.get('/', (req,res)=>{
    res.send('oh, hi mark')});

app.use('/api/v1/anime', router)


app.listen(port,()=> console.log('server listen on port ' + port));


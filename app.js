const express=require('express');

const app=express();

const bodyParser=require('body-parser');

const feedroutes=require('./routes/feed');
const mongoConnect=require('./utils/database').mongoConnect;

app.use(bodyParser.json());// for application/json header

app.use(feedroutes);



mongoConnect(()=>{
    app.listen(8080);
});
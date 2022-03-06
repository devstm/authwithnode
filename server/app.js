const path = require('path');
const parser = require('cookie-parser');
const express = require('express');
const app = express();
const router = require('./routes')
app.use(express.static(path.join(__dirname,'..', 'public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(parser());
app.use(router)

app.listen(3000 , ()=>console.log('server running'));
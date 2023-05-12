const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.port || 9000;

const routes = require('./routes');
app.use('/', routes);

app.listen(port, ()=>{
    console.log(`Server berjalan di http://localhost:${port}`);
});
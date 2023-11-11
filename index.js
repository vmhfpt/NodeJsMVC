const express = require('express');
const Router =  require('./routers/config.js');
var bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const port = 3000;
require('dotenv').config();


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// auto load handle router in line 6 below

Router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//https://andreyka26.com/handling-refreshing-token-on-multiple-requests-using-react
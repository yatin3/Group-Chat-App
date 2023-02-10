const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());

const userRoute = require('./router/user');

const sequelize = require('./util/database');

const cors = require('cors');
app.use(cors());

app.use('/user',userRoute);

sequelize.sync().then((m)=> app.listen(process.env.PORT||3000)).catch(err => console.log(err));

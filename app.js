const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());

app.use(express.static('public'));

const userRoute = require('./router/user');
const chatRoute = require('./router/chat');
const groupRoute = require('./router/group');

const sequelize = require('./util/database');

const cors = require('cors');
//app.use(cors());

app.use(cors({
    origin:"*",
    //method: ["GET","POST"],
}))

const User = require('./models/user');
const Chat = require('./models/chat');
const Group = require('./models/group');
const userGroup = require('./models/user-group');

app.use('/user',userRoute);

app.use('/chat',chatRoute);

app.use('/group',groupRoute);

app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,`public/${req.url}`));
})

User.hasMany(Chat);
Chat.belongsTo(User);

Group.hasMany(Chat);
Chat.belongsTo(Group);

User.belongsToMany(Group,{ through: userGroup });
Group.belongsToMany(User,{ through: userGroup });

sequelize.sync().then((m)=> app.listen(process.env.PORT||3000)).catch(err => console.log(err));

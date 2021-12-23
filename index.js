const express = require('express');

const  mongoose  = require('mongoose');
const userModels = require('./models/userModels');
require('dotenv/config');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.get('/',(req, res)=>{
    res.send({
        message: 'we are in the root folder'
    });
})
app.get('/user', async(req, res)=>{
    try{
    const getAllUsers = await userModels.find();
    res.json({
        data: getAllUsers,
        message: 'users fetched'
    });
    }catch(err){
        res.json({
            message: err
    
        });
    }
});
app.post('/user', async(req,res)=>{
    try{
        const postUser = await userModels.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            school: req.body.school,
            dateOfBirth: req.body.dateOfBirth,
        });
        res.json({
            data: postUser,
            message: 'user successfully created'
        })
    }catch(err){
        res.json({
            message: err
        })
    }

});

mongoose.connect(process.env.DB_URL, ()=>{

   console.log('successfully conneted');
    
});

app.listen(20003);
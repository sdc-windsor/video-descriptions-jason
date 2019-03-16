const express = require('express');
const app = express();
const Description = require('../database/index').Description;
const User = require('../database/index').User;
const Comment = require('../database/index').Comment;
const saveComment = require('../database/helper').saveComment;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

app.use(express.static('public'));
app.use('/:id', express.static('public'));

app.get('/categories/:video_id', function (req, res) {
    Description.findOne({video_id: req.params.video_id}).then((data)=>{
        res.json(data);
        res.end();
    })
});

app.get('/usersthumbnail/:user_id', function (req, res) {
    User.findOne({_id: req.params.user_id}).then((data)=>{
        res.json(data);
        res.end();
    })
});

app.get('/userid/:username', function(req,res){
    User.findOne({username: req.params.username}).then((data)=>{
        res.json(data._id);
        res.end();
    })
})

app.get('/videosByCategory/:category', function (req, res) {
    const arrayOfCategories = [];
    const splitParams = req.params.category.split(',');
    for (let l = 0 ; l< splitParams.length;l++) {
        arrayOfCategories.push({
            categories: {
                // "/mon/i"
                $regex : new RegExp(`${splitParams[l]}`,'i')
            }
        })
    }

    Description.find({$and: arrayOfCategories})
               .then((data)=>{
                    res.json(data);
                    res.end();
                });
});

app.get('/comments/:video_id', function (req, res) {
    Comment.find({video_id: req.params.video_id}).sort({data:-1}).exec().then((data)=>{
        res.json(data);
        res.end();
    })
});

app.get('/details/:video_id', function (req, res) {
    Description.find({video_id: req.params.video_id}).then((data)=>{
        res.json(data);
        res.end();
    })
});

app.post('/comments/:video_id', function (req, res) {
    console.log('REQ BODY', req.body);
    saveComment(req.body.video_id, req.body.user_id, req.body.comment, req.body.date, ()=>{
        console.log('Saved comment to database')
        res.send('Saved comment to database');
        res.end();
    })
});

module.exports = app;


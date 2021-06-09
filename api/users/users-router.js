const express = require('express');
const Posts = require('../posts/posts-model.js')
const Users = require('./users-model.js')
const {logger, validateUserId,validateUser,validatePost} = require('../middleware/middleware.js')

const router = express.Router();

router.get('/', logger, (req, res) => {
  Users.find(req.query)
  .then(users =>{
    res.status(200).json(users)
  })
  .catch(error =>{
    console.log(error)
    res.status(500).json({
      message:'Error retrieving Users'
    })
  })
});

router.get('/:id', validateUserId,(req, res) => {
  res.status(200).json(req.hub)
});

router.post('/',validateUser, (req, res) => {
  Users.add(req.body)
  .then(user =>{
    res.status(201).json(user)
  })
  .catch(error =>{
    console.log(error)
    res.status(500).json({
      message: 'Error adding the user',
    });
  })
});

router.put('/:id',validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(user =>{
    res.status(200).json(user)
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({message:'Error updating the user'})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
    Users.remove(req.params.id)
      .then(() =>{
        res.status(201).json({message:"User has been removed"})
      })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  Posts.get(req.params.id)
  .then(post =>{
    res.status(200).json(post)
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({message:`Error getting the post  ${error.message}`})
  })
});

router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
  const postInfo = {...req.body, user_id: req.params.id};

  Posts.add(postInfo)
  .then(post =>{
    res.status(210).json(post)
  })
  .catch(err =>{
    next(err)
  })
  
});
router.use((err,req,res,next) =>{
  res.status(500).json({
    message:"something blew up",
    error:err.message
  })
})
  module.exports = router

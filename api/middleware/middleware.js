const Users = require('../users/users-model.js')

const logger = (info) => (req,res,next) =>{
  console.log(
    `METHOD: ${req.method} URL: ${req.url} TIMESTAMP: ${Date.now}`
  );
  next();
}

const validateUserId = async (req, res, next) =>{
try {
  const {id} = req.params
  const user = await Users.findById(id)
  if(!user){
    res.status(404).json(`No user with id:${id}`)
  }else{
    req.user = hub
    next()
  }
} catch (error) {
  res.status(500).json({message:`Error ${error}`})
  
}
}



const validateUser = async (req, res, next)=> {
  const {id} = req.params
  try {
    const user = await Users.getById(id)
    if(!user){
      res.status(400).json({ message: `user with ID: ${id} found.` })
    }else{
      next()
    }
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
}

const validatePost = (req, res, next) => {
  if(!req.body.name || req.body.text || req.body.postedBy){
    res.status(400).json("Name,text,posted by is required")
  }else{
    next()
  }
}
module.exports ={
  logger,
  validateUserId,
  validateUser,
  validatePost

}
// do not forget to expose these functions to other modules

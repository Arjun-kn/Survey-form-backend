const jwt = require('jsonwebtoken');


const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
// console.log(token)
  if (token) {
   
    req.userId = token
    next();
  }else{
    res.status(404).json({errdesc:"Authentication Failed"})

  }

  
};

module.exports = authenticateUser;
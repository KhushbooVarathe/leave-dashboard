const jwt = require('jsonwebtoken');
const { verifyAccessToken } = require('../utils/token');

const verifyUserData = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ error: "Authorization header is missing" });
  }

  const tokenWithoutBearer = token.split(' ')[1];

  if (!tokenWithoutBearer) {
    return res.status(400).json({ error: "Token is missing" });
  }

  try {
    const decoded=await verifyAccessToken({access:tokenWithoutBearer});
    if(!decoded.valid){
        return res.status(401).json({ error: "Invalid or expired token" });
    }else{

        req.user = decoded; 
        next();  
    }
  } catch (err) {
    console.error('JWT verification error:', err.message);
   
  }
};

module.exports = {verifyUserData};

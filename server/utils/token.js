const jwt=require('jsonwebtoken');
const access_secretKey=process.env.SECRET_KEY ;
const refresh_secretKey=process.env.REFRESH_KEY;

const GenerateAccessToken=async(payload)=>{
    return  await jwt.sign(payload, access_secretKey, { expiresIn: '1m' });  
};

const GenerateRefreshToken=async(payload)=>{
    return  await jwt.sign(payload, refresh_secretKey, { expiresIn: '2m' });  
};

const verifyRefreshToken = async (payload) => {
    const {refresh}=payload;
    try {
        const decoded = jwt.verify(refresh, refresh_secretKey); 
        return { valid: true, decoded }; 
    } catch (error) {
        // console.error('Token verification failed:', error.message);
        return { valid: false, error: error.message }; 
    }
};
const verifyAccessToken = async (payload) => {
    const {access}=payload;
    try {
        const decoded = jwt.verify(access, access_secretKey); 
        return { valid: true, decoded }; 
    } catch (error) {
        // console.error('Token verification failed:', error.message);
        return { valid: false, error: error.message }; 
    }
};


module.exports={GenerateAccessToken,GenerateRefreshToken,verifyAccessToken,verifyRefreshToken}
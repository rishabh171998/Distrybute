const jwt=require('jsonwebtoken');
const accessTokenSecret="ffssfsfswwfv"

const createToken=async(payload)=>
{
    return jwt.sign(payload,accessTokenSecret,
        {
            algorithm:'HS256'
        })
    }

const validateJWT=()=>
{
    return(req,res,next)=>
    {
        try{
            let token;
            if(req.headers.authorization&&req.headers.authorization.split(' ')[0]==='Bearer')
            {
                token=req.headers.authorization.split(' ')[1]
            }
          const payload=jwt.verify(token,accessTokenSecret)
          if(!payload)
          {
            res.status(401).send('Unauthenticated');
          }
          req.validateJWTPayload=payload;
          return next();
        }catch(err)
        {
            res.status(401).send('Unauthenticated');
        }
    }
}
module.exports = {createToken,validateJWT}
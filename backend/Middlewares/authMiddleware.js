
const jwt=require('jsonwebtoken')

const check=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(400).json({error : "No token provided"});
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decode;
        console.log('user validated');
        next();
    }
    catch(err){
        res.status(403).json({error : ' Forbidden token',err});
    }
}

module.exports=check
const express=require('express')
const Redis=require('ioredis')

const redis=new Redis({
    port:process.env.REDIS_PORT || 6379,
    host:process.env.REDIS_HOST ||'127.0.0.1'
})

redis.on('connect',()=>{
    console.log('Connected to Redis');
})

// rateLimiter middleware that checks the number of requests made by a user in a given time frame
// it checks the count of all the requests, not just the requests made to a specific endpoint
// if the number of requests exceeds the limit, it returns a 429 status code
// So this is a generic rate limiter middleware
const rateLimiter=async (req,res,next)=>{
    try{
        if(!req.user){
            return res.status(401).json({error:'Unauthorized User'})
        }
        const user_id=req.user.UserId;
        const user_key=`${user_id}`;

        let requests =await redis.get(user_key);
        console.log({requests : requests})
        if(requests){
            requests=parseInt(requests);
            console.log(requests);
            if(requests>=process.env.MAX_REQUESTS){
                return res.status(429).json({error:'Too many requests, try again later'})
            }
            await redis.incr(user_key);
        }
        else{
            console.log('setting key');
            await redis.setex(user_key,process.env.RATE_LIMIT_EXPIRY,1);
        }
        console.log({userkey: user_key});
        next();

    }
    catch(err){
        return res.status(500).json({error :"Internal Server error in rate Limiter"})
    }


}


module.exports=rateLimiter
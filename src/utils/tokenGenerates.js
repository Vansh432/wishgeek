import jwt from 'jsonwebtoken'
export const referseTokenGenerates=(payload)=>{
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'20d'})
    return token;
}

export const accessTokenGenerate=(payload)=>{
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'})
    return token;
}
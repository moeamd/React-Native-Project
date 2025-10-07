import jwt from "jsonwebtoken";
export const authMiddleware = (req,res,next)=> {
    const authHeader = req.headers.authorization; 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message :"No Token Proviede"})
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, 'defaultSecret');
        req.user = decoded;
        next()
    }catch(err) {
        return res.status(402).json({message: 'Invalid or expired token',err})
    }
}
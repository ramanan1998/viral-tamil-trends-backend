import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId: string,
            username: string,
            email: string
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers['authorization'];
    console.log(token);
    
    if(!token){
        res.status(401).json({ message: "unauthorized user" });
        return;
    }

     try{
        const decoded = jwt.verify(token as string, process.env.JWT_SECURITY_KEY as string);
        // console.log(decoded)
        req.userId = (decoded as JwtPayload).userId;
        req.username = (decoded as JwtPayload).username;
        req.email = (decoded as JwtPayload).email;
        next();
        
    }catch(error){
        console.log(error);
        res.status(401).json({ message: "unauthorized user" });
    }
}
import { Request, Response } from "express"
import user from "../model/user"
import userModel from "../model/user";

export const getTotalUsers = async (req: Request, res: Response) => {
    try{

        const result = await user.listIndexes();

        res.send(result)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

export const getUser = async (req: Request, res: Response) => {

    try{

        const userId = req.userId;

        console.log(userId)

        const user = await userModel.findOne({ _id: userId });

        if(!user){
            res.status(400).json("user does not exists");
            return;
        };

        res.status(200).json({
            username: user.username,
            email: user.email,
            credits: user.credits,
            isActive: user.isActive
        });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "internal server error" })
    }
}
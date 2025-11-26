import { Request, Response } from "express";
import userModel from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { emailTemplate } from "../helper/templates";
import { generatePassword } from "../helper/passwordGenerator";

export const signup = async (req: Request, res: Response) => {

    try{

        const { username, email } = req.body;

        const user = await userModel.findOne({ email });

        if(user){
            res.status(400).json("email already exists");
            return;
        }

        const password = generatePassword();

        const hashPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            username,
            email,
            password: hashPassword,
            credits: 25,
            isActive: true,
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            //   user: process.env.CLIENT_EMAIL,
            //   pass: process.env.SECURITY_APP_PASSWORD
              user: "ramanan.works@blackwinstech.com",
              pass: "qhon zorj gztl fxrf"
            },
            tls : { rejectUnauthorized: false }
        });
  
        const mailOptionsToSender = {
            // from: process.env.CLIENT_EMAIL,
            from: "ramanan.works@blackwinstech.com",
            to: email,
            subject: "Your Login Credentials",
            html: emailTemplate({ email, password, appName: "Scriptify", username })
        }
  
        transporter.sendMail(mailOptionsToSender, function(error, info){
            if (error) {
                console.log(error);
                res.status(500).json({ message: "internal server error" });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: "your password is changed, please check your email for the updated password" });
            }
        });

        res.status(200).json({ message: "user created successfully" });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "internal server error" })
    }
}

export const login = async (req: Request, res: Response) => {

    try{

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if(!user){
            res.status(400).json({ message: "email id does not exist" });
            return;
        }

        if(!user.isActive){
            res.status(400).json({ message: "your account is currently inactive, please contact super admin" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            res.status(400).json({ message: "wrong password" });
            return;
        }

        const token = jwt.sign(
            { 
                userId: user.id, 
                username: user.username,
                email: user.email,
                credits: user.credits 
            },
            process.env.JWT_SECURITY_KEY as string,
            { expiresIn: "7d" }
        );

        res.status(200).json({ 
            userId: user.id,
            username: user.username, 
            email: user.email,
            credits: user.credits,
            authToken:token
        });


    }catch(error){
        console.log(error);
        res.status(500).json({ message: "internal server error" })
    }
}

// export const verifyTokenController = (req: Request, res: Response) => {
//     res.status(200).json({ 
//         userId: req.userId, 
//         firstname: req.firstname,
//         lastname: req.lastname,
//         email:req.email,
//         role: req.role, 
//         success: true 
//     })
// }

export const logout = (req: Request, res: Response) => {

    if(!req.cookies["authToken"]){
        return res.status(200).send({ message: "unauthorized user" })
    }

    // res.cookie("authToken", "", {
    //     expires: new Date(0),
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "none",
    //     // maxAge: 24 * 60 * 60 * 7 * 1000   // 7 days
    // })

    return res.status(200).send({ message: "Signout successful" })
}

export const forgotPassword = async (req: Request, res: Response) => {
    try{

        const email = req.query.email as string;

        const user = await userModel.findOne({ email });

        if(!user){
            return res.status(400).json({ message: "email does not exists" });
        }

        const generatePassword = Math.random().toString(36).slice(-10);

        const hashPassword = await bcrypt.hash(generatePassword, 10);

        await userModel.findOneAndUpdate({ email: email }, { password: hashPassword });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            //   user: process.env.CLIENT_EMAIL,
            //   pass: process.env.SECURITY_APP_PASSWORD
              user: "ramanan.works@blackwinstech.com",
              pass: "qhon zorj gztl fxrf"
            },
            tls : { rejectUnauthorized: false }
        });
  
        const mailOptionsToSender = {
            // from: process.env.CLIENT_EMAIL,
            from: "ramanan.works@blackwinstech.com",
            to: email,
            subject: "Athera admin password changed",
            text: `Here is your new password for Athera administrator panel,
            email: ${email}
            password: ${generatePassword}`
        }
  
        transporter.sendMail(mailOptionsToSender, function(error, info){
            if (error) {
                console.log(error);
                res.status(500).json({ message: "internal server error" });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: "your password is changed, please check your email for the updated password" });
            }
        });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}
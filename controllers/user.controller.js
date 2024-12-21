import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = async (req, res) => {
    const { name, email, password} = req.body;

    if([name,  email, password].some((field)=>
        field?.trim()==="")
    ){
       throw new ApiError(400, "All fields are required")
    }
   
    const existuser = await User.findOne({ where: { email: 'email' } })
           if(existuser){
            throw new ApiError(400, "User Already Exist")
           }

        const Password_hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: Password_hashed });

        const createdUser = await User.findByPk(user.id, {
            attributes: { exclude: ['password', 'refreshToken'] }
        });
     
     if(!createdUser){
        throw new ApiError(500, "Somthing went wrong while registering user") 
     }
     return res.status(200).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
      )

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if(!user){
            throw new ApiError(404, "User does not is exist")
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new ApiError(401, "Password is incorrect")
        }

        try {
            const accessToken = jwt.sign({ id: user.id, name: user.name},
    
                 process.env.ACCESS_TOKEN_SECRET,
                 { ACCESS_TOKEN_EXPIRY: '1d' }
                )
        } catch (error) {
            throw new ApiError(500, "Something went wrong while generating access token")
        }
        
           try {
             const refreshToken = jwt.sign({ id: user.id},
 
                 process.env.REFRESH_TOKEN_SECRET,
    
                 { REFRESH_TOKEN_EXPIRY: '1d' }
                )
 
           } catch (error) {
            throw new ApiError(500, "Something went wrong while generating refresh token")
           }

           const loggedInuser = await User.findByPk(user.id, {
            attributes: { exclude: ['password', 'refreshToken'] }
        });

        const option ={
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
           new ApiResponse(
            200,
            {
                user: loggedInuser, accessToken, refreshToken
            },
            "User Logged In Successfully"
           )
         )
}


export{
registerUser,
loginUser
}

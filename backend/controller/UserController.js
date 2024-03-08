import User from '../model/UserModel.js'
import jwt  from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const userRegister = async(req,res) => {
    try {
    const {fullName, email, password} = req.body

    if(!fullName || fullName.length<3){
        return res.json({
            error:"Name is necessary and must be greater than 3 characters"
        })
    };
    const userAvailable = await User.findOne({email});
    if(!email){
        return res.json({
            error:"Email is necessary"
        })
    };
    if(userAvailable){
        return res.json({msg:"Email id already exist"});
    }
    
    if(!password || password.length<6){
        return res.json({
            error:"Password length must be greater than 6 and is must"
        })
    };

    
    const newpassword = await bcrypt.hash(password,10);

    const user = new User({
        fullName,
        email,
        password : newpassword
    })    
        await user.save();
        return res.status(201).json({msg:"You have been registered successfully"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"error", error})
    }
}

export const userLogin = async(req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.json({msg:"Email and Password are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            res.json({
                error:"User not found"
            })
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            res.json({
                error:"Password is not correct"
            })
        }
        const tokenObject = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
        const jwtToken = jwt.sign(tokenObject,process.env.SECRET,{expiresIn:'4h'});
        return res.status(200).json({jwtToken, tokenObject})
    } catch (error) {
        console.log(error);
    }
}

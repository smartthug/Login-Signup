import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import item from '../module/usermongoschema.js';
import generateTokenAndSetCookie from '../JWT/jwttoken.js';
import { sendVerificationEmail, sendWelcome, sendRestPasswordEmail, sendReset } from '../mailtrap/mailtrap.js';
const signin=async (req, res) => {
   const {email,password,name}=req.body;
    try{
        if(!email || !password || !name){
            throw new Error("Please fill all the fields");
        }
        const useralready=await item.findOne({email});
        if(useralready){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const generate_otp=Math.floor(100000+Math.random()*900000).toString();
        
        
        const user=new item({
            email,
            password:hashedpassword,
            name,
            otp:generate_otp,
            verificationTokenExpires:Date.now()+24*60*60*1000,//24 hr
        });
        await user.save();
        generateTokenAndSetCookie(res, user._id); 
        try{
            console.log(process.env.MAILTRAP_USER);
        const emailResponse = await  sendVerificationEmail(user.email, user.otp,user.name); 
        // Send OTP email
        console.log("Email sent:", emailResponse);
        }
        catch(err){
            console.error("Failed to send email:", err);
        }
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{...user._doc, password:undefined},//
        })
        //jwt token

    }


catch(err){
    res.status(500).json({success:false,message:`Error bro ${err.message}`});
}
};
const login=async (req, res) => {
    const{email,password}=req.body;
    try{
        if(!email || !password){
            throw new Error("Please fill all the fields");
        }
        const user=await item.findOne({email})
        if(!user){
            return res.status(400).json({message:"Unknown user"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        if(!user.isverified){
            return res.status(400).json({message:"Please verify your email"});
        }
    }
    catch(err)
    {
        res.status(500).json({success:false,message:`Error bro ${err.message}`});
    }
    res.status(201).json({success:true, message: "Successfully Login" });
};

const otpVerify=async (req, res) => {
    const{code}=req.body;
    try{
    // if(!code){
    //     return res.status(400).json({message:"Please enter the OTP"});
    // }
    const user=await item.findOne({
        otp:code,
        verificationTokenExpires:{$gt:Date.now()}
    });
    if(!user){
        return res.status(400).json({message:"Invalid OTP or OTP expired"});
    }

   user.isverified=true;
   user.otp=undefined;
   user.verificationTokenExpires=undefined;
    await user.save();
 await sendWelcome(user.email,user.name); 
}
catch(err){
    res.status(500).json({success:false,message:`Error bro ${err.message}`});
}
res.status(201).json({ success:true,message:"Successfully verified"});
};

const logout=async (req, res) => {
    try {
        res.clearCookie('token'); // Clear the cookie
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
};

const forgotPassword=async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ message: 'Please enter your email' });
        }
        const user = await item.findOne({ email });
        if (!user) {
            return res.status(400).json({success:"false", message: 'User not found' });
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenexpires=Date.now() + 30 * 60 * 1000;
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = tokenexpires // 30 minutes
        await user.save();
       res.status(201).json({ success:true,message:"Reset Password" });
       await sendRestPasswordEmail(user.email,`${process.env.CLIENT}reset-password/${resetToken}`); 
    } catch (error) {
         res.status(500).json({
      success: false,
      message: 'Something went wrong while sending reset email',
    });
    }
    
  
}
const reset=async (req, res) => {
    try{
        const {token}=req.params;
        const {password}=req.body;
        if(!token || !password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const user=await item.findOne({
            resetPasswordToken:token,
            resetPasswordExpires:{$gt:Date.now()}
        })
         if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
        //upadate password
    const hashedpassword=await bcrypt.hash(password,10);
    user.password=hashedpassword;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpires=undefined;
    await user.save();
    res.status(201).json({success:true,message:"Password reset successfully"});
     await sendReset (user.email);
    }
    catch(err){
        res.status(500).json({success:false,message:`Error bro ${err.message}`});
    }
   
}


const check_auth=async(req,res)=>{
 try{
    const user=await item.findById(req.userId).select("-password");
    if(!user) return res.status(502).json({success:false,message:"user not found"});
    res.status(200).json({success:true,user});
 }
 catch(err)
 {
    console.log("Error bro",err);
    res.status(400).json({message:err});
 }
};

export {signin,login,otpVerify,logout,forgotPassword,reset,check_auth};

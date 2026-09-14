import UserModel from "./user.model.js";

export const createUser = async (req,res)=>{
    try{
        const data = req.body;
        const user = new UserModel(data);
        await user.save();
        res.json(user);
    } catch(err){
        res.status(500).json({message : err.message});
    }
}

export const login = async (req,res)=>{
    try{
        const data = req.body;
        console.log(data);
    } catch(err){
        res.status(500).json({message : err.message});
    }
}
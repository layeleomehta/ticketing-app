import mongoose from "mongoose";

interface UserAttrs {
    email: string, 
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }
}); 

const User = mongoose.model('User', userSchema);

const buildUser = (attr: UserAttrs) => {
    const newUser = new User(attr); 
    return newUser; 
}

export { User }; 
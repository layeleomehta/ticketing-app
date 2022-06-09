import mongoose from "mongoose";

// interface for type checking an entry into User model
interface UserAttrs {
    email: string, 
    password: string
}

// interface which describes properties of a User model
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc; 
}

// interface which describes properties of User document (document is instance of model)
interface UserDoc extends mongoose.Document {
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

userSchema.statics.build = (attr: UserAttrs) => {
    const newUser = new User(attr); 
    return newUser; 
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User }; 
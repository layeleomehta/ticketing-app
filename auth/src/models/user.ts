import mongoose from "mongoose";
import { Password } from "../services/password";

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
}, 
{
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
}
); 

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
    }
    done();
  });

userSchema.statics.build = (attr: UserAttrs) => {
    const newUser = new User(attr); 
    return newUser; 
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User }; 
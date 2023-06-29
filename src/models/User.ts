import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id?: number,
    username:string,
    hash:string,
    salt:string
}

const UserSchema = new Schema<IUser>({
    hash:{type:String, required:true, unique: true},
    username:{type:String, required:true, unique: true},
    salt:{type:String, required:true},
})

export default mongoose.model<IUser>("user", UserSchema)
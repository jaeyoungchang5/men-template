/**
 * @fileoverview user.model.js
 * This file is the model (schema) file for the user collection.
 * 
 * @todo
 * 1. make sure password is encrypted when user is updated
 */

/* import dependencies */
import { Document, Schema, Model, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

interface IUser {
    firstName: String,
    lastName: String,
    username: String,
    password: String,
}

interface IUserModel extends IUser, Document {
    checkPassword(password: string): boolean;
}

/* user schema structure */
const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

/**
 * @method pre('save') : user method for encrypting password before saving the user
 */
UserSchema.pre('save', function(next): void{
    const user = this;

    bcrypt.hash(user.password, Number(process.env.SALT), function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
})

/**
 * @method checkPassword : check password using bcrypt compare when user attempts login
 * @param {String} password : password given by user when trying to login
 */
// UserSchema.methods.checkPassword = function(password: string, params) {
//     compare(password, this.password, params);
// }

UserSchema.method('checkPassword', function(password: string): boolean {
    if (bcrypt.compareSync(password, this.password)) return true;
    return false;
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
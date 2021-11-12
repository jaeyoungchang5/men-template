import * as jwt from 'jsonwebtoken';

/**
 * @function createToken : creates a jwt token for user
 * @param {*} user 
 * @returns String : jwt token
 */
export function createToken(user: any) {
    const body = {
        username: user.username, 
        firstName: user.firstName, 
        lastName: user.lastName 
    }

    return jwt.sign({ user: { body } }, process.env.ACCESS_TOKEN_SECRET);
}
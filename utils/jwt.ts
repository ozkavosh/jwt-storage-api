import jwt, { Secret } from 'jsonwebtoken';

export const generateAccessToken = (username: string) => {
    return jwt.sign(username, (process.env.TOKEN_SECRET as Secret));
}
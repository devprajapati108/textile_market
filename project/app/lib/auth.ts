import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export const signToken = (email: string, userId: string, role: string) =>
  jwt.sign({ email, userId, role }, SECRET, { expiresIn: '1h' });
console.log("secret is ---------->",SECRET);
export const verifyToken = (token: string) =>
  jwt.verify(token, SECRET);

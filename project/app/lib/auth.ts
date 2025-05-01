import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export const signToken = (email: string, userId: string, role: string) =>
  jwt.sign({ email, userId, role }, SECRET, { expiresIn: '1h' });

export const verifyToken = (token: string): {
  valid: boolean;
  decoded: null | (JwtPayload & { userId: string; email: string; role: string });
} => {
  try {
    const decoded = jwt.verify(token, SECRET);
    if (typeof decoded === 'string') return { valid: false, decoded: null };

    return { valid: true, decoded: decoded as JwtPayload & { userId: string; email: string; role: string } };
  } catch (err) {
    return { valid: false, decoded: null };
  }
};



// import jwt from 'jsonwebtoken';

// const SECRET = process.env.JWT_SECRET!;

// export const signToken = (email: string, userId: string, role: string) =>
//   jwt.sign({ email, userId, role }, SECRET, { expiresIn: '1h' });
// console.log("secret is ---------->",SECRET);
// export const verifyToken = (token: string) =>
//   jwt.verify(token, SECRET);

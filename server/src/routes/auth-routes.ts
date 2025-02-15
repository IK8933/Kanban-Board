import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    console.log(" Login Attempt:", username, password); 

    // Find user in the database
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.error(" User not found:", username);
      return res.status(401).json({ message: "Authentication failed: User not found" }); 
    }

    console.log(" User Found:", user.username); 

    // Compare entered password with hashed password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log(" Password Valid:", passwordIsValid); 

    if (!passwordIsValid) {
      console.error(" Invalid Password for:", username);
      return res.status(401).json({ message: "Authentication failed: Incorrect password" }); 
    }

    // Generate JWT token
    const secretKey = process.env.JWT_SECRET_KEY || '';
    if (!secretKey) {
      console.error(" JWT_SECRET_KEY is missing from .env file!"); 
      return res.status(500).json({ message: "Server error: Missing JWT secret key" });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    console.log(" Token Generated:", token); 
    
    return res.json({ token });

  } catch (error) {
    console.error(" Unexpected error in login:", error);
    return res.status(500).json({ message: "Server error: Something went wrong" }); 
  }
};

const router = Router();
router.post('/login', login);

export default router;






// import { Router, Request, Response } from 'express';
// import { User } from '../models/user.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// export const login = async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   console.log(" Login Attempt:", username, password); 

//   const user = await User.findOne({ where: { username } });

//   if (!user) {
//     console.error(" User not found:", username);
//     return res.status(401).json({ message: "Authentication failed" });
//   }

//   console.log(" User Found:", user.username, user.password); 

//   const passwordIsValid = await bcrypt.compare(password, user.password);
//   console.log(" Password Valid:", passwordIsValid); 

//   if (!passwordIsValid) {
//     console.error("🚨 Invalid Password for:", username);
//     return res.status(401).json({ message: "Authentication failed" });
//   }

//   const secretKey = process.env.JWT_SECRET_KEY || '';
//   const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

//   console.log(" Token Generated:", token); 
  
//   return res.json({ token }); 
// };

// const router = Router();
// router.post('/login', login);

// export default router;


// return res.status(401).json({ message: "Authentication failed" }); 🚩







// import { Router, Request, Response } from 'express';
// import { User } from '../models/user.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// // TODO: If the user exists and the password is correct, return a JWT token
// export const login = async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({
//     where: { username },
//   });
//   if (!user) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }
//   const passwordIsValid = await bcrypt.compare(password, user.password);
//   if (!passwordIsValid) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }
//   const secretKey = process.env.JWT_SECRET_KEY || '';
//   const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
//   return res.json({ token }); 
// };

// const router = Router();
// router.post('/login', login);

// export default router;

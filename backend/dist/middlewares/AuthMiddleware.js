"use strict";
// import { ExpressMiddlewareInterface } from "routing-controllers";
// import jwt from "jsonwebtoken";
//
// export class AuthMiddleware implements ExpressMiddlewareInterface {
//     use(req: any, res: any, next: (err?: any) => any) {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) return res.status(401).json({ message: "Unauthorized" });
//
//         try {
//             const decoded = jwt.verify(token, "ANA");
//             req.user = decoded;
//             next();
//         } catch (error) {
//             return res.status(401).json({ message: "Invalid token" });
//         }
//     }
// }

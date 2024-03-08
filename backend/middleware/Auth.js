import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';


export const ensureAuthenticated = async (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(403).json({ msg: "Token is required" });
        }
        const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET);
        
        const user = await User.findById(decoded._id)

        if (!user) {
           return res.json({ message: "User Not Found!" });
        }
        return next();
    } catch (error) {
        return res.status(403).json({ msg: "Token is not valid or is expired" });
    }
}
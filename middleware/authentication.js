import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    // return res.json({token: token});
    // console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token.split(" ")[1], 'secretkey');

        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token.' });
    }
}

export default authenticateToken;
import bcrypt from 'bcrypt';
import User from '../model/users.js';
import { where, Op } from 'sequelize';
import jwt from 'jsonwebtoken';


class UserController {
    static async store(req, res){
        let { username, email, password } = req.body;
        password = bcrypt.hashSync(password, 10);

        const user = await User.create({ username, email, password });
        res.json(user);
    }
    static async get(req, res){
        const users = await User.findAll();
        res.json(users);
    }
    static async getById(req, res){
        const users = await User.findOne({ where: { id: req.params.id } });
        res.json(users);   
    }

    static async update(req, res){
        let { username, email, password } = req.body;
        password = bcrypt.hashSync(password, 10);

        const user = await User.update({ username, email, password }, { where: { id: req.params.id } });
        res.json(user);
    }
    static async delete(req, res){
        const user = await User.destroy({ where: { id: req.params.id } });
        res.json(user);
    }
    static async login(req, res){
        const { username, password}= req.body;
        const user = await User.findOne(
            { where: { [Op.or]: [{ email: username }, { username: username }] } });

        if (!user) {
            return res.json({ error: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.json({ error: "Invalid password" });
        }

        const token = jwt.sign({ userId: user.id}, 'secretkey', { expiresIn: '1h'});
        res.json({ accessToken: token });
    }
    static async me (req, res){{
        const userId = req.userId;
        // console.log(userId);
        const user = await User.findOne({ where: { id: userId } });
        res.json(user);
        }
    }
    static async register(req, res){
        let { username, email, password } = req.body;
        password = bcrypt.hashSync(password, 10);

        const user = await User.create({ username, email, password });
        const token = jwt.sign({ userId: user.id}, 'secretkey', { expiresIn: '1h'});
        res.json({ accessToken: token });
    }

}

export default UserController;
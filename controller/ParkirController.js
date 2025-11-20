import Parkir from '../model/Parkir.js';
import User from '../model/users.js';

class ParkirController {
    static async order(req, res){
        let { nopol, duration } = req.body;
        const user_id = req.userId;
        const total = duration * 2000;
        const parkir = await Parkir.create({ nopol, duration, total, user_id});
        res.json(parkir);
    }

    static async get(req, res){
        const user_id = req.userId;
        const parkir = await Parkir.findAll({ where: { user_id },
            include: [User]});
        return res.json(parkir);
    }

    static async update(req, res){
        let { nopol, duration } = req.body;
        const user_id = req.userId;
        const total = duration * 2000;

        const parkir_id = req.params.id;
        const parkir = await Parkir.update({ nopol, duration, total, user_id}, {
            where: { id: parkir_id }
        });
        res.json(parkir);
    }

    static async cancel(req, res){
        const parkir_id = req.params.id;
        const parkir = await Parkir.destroy({
            where: { id: parkir_id }
        });
        res.json(parkir);
    }
}

export default ParkirController;
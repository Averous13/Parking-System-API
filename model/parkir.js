import connection from "./connection.js";
import { DataTypes } from "sequelize";
import User from "./users.js";

const Parkir = connection.define('parkir',
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: "user",
            key: "id",
        },
        duration: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
        nopol: DataTypes.STRING,
    },
    { timestamps: false, tableName: 'parkir' }
);

Parkir.belongsTo(User, { targetKey: 'id', foreignKey: 'user_id' });

export default Parkir;
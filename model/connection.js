import { Sequelize} from 'sequelize';

const connection = new Sequelize('parking', 'root', 'MaS25092002', {
    host: 'localhost',
    dialect: 'mysql'
})

export default connection;
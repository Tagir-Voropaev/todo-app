
import config from './config.js'
import { Sequelize } from 'sequelize'
const sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
});


export default sequelize
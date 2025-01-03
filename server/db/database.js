import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({connectionString: process.env.DATABASE_URL_UNPOOLED + "?sslmode=require", logging: false, dialect: 'postgres'})
// const sequelize = new Sequelize('todo', 'postgres', 'gtr19032004',{
//   dialect: 'postgres',
//   host: 'localhost',
//   logging: false,
// })



export default sequelize
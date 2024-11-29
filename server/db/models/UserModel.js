import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database.js";


const UserModel = sequelize.define('UserModel', 
    {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
    },
    {
        createdAt: false,
        updatedAt: 'updateTimestamp',
        tableName: 'users'
    }
);

(async () => {
    await sequelize.sync({force:true})
})()



export default UserModel;
import { DataTypes } from "sequelize";
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
            unique: false
        },
        passwordHash: {
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





export default UserModel;
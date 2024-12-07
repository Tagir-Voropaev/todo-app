import { DataTypes } from "sequelize";
import sequelize from "../database.js";


const ScriptModel = sequelize.define('ScriptModel', 
    {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
        createdAt: false,
        updatedAt: 'updateTimestamp',
        tableName: 'scripts'
    }
);


export default ScriptModel;
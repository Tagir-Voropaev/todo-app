import { DataTypes } from "sequelize";
import sequelize from "../database.js";


const TaskModel = sequelize.define('TaskModel', 
    {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timetask: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    datetask: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // unique: true,
    }
    },
    {
        createdAt: false,
        updatedAt: 'updateTimestamp',
        tableName: 'tasks'
    }
);





export default TaskModel;
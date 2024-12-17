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
    },
    {
        createdAt: false,
        updatedAt: 'updateTimestamp',
        tableName: 'tasks'
    }
);





export default TaskModel;
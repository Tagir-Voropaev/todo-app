import { DataTypes } from "sequelize";
import sequelize from "../database.js";


export const SchoolModel = sequelize.define('SchoolModel',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        createdAt: false,
        updatedAt: 'updateTimestamp',
        tableName: 'school'
    }
);

export const GroupModel = sequelize.define('GroupModel',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        schoolId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: SchoolModel,
                key: 'id'
            }
        }
    },
    {
        createdAt: false,
        updatedAt: 'updateTimestamp',
        tableName: 'group'
    }
);

export const LessonModel = sequelize.define('LessonModel',
    {
        dayOfWeek: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 7
            }
        },
        startTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        room: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: GroupModel,
                key: 'id'
            }
        }
    },
    {
        createdAt: false,
        updatedAt: 'updateTimestamp',
        tableName: 'lesson'
    }
);

// Ассоциации для школы и групп
SchoolModel.hasMany(GroupModel, {
    foreignKey: 'schoolId',
    sourceKey: 'id'
});

GroupModel.belongsTo(SchoolModel, {
    foreignKey: 'schoolId',
    targetKey: 'id'
});

// Ассоциации для групп и занятий
GroupModel.hasMany(LessonModel, {
    foreignKey: 'groupId',
    sourceKey: 'id'
});

LessonModel.belongsTo(GroupModel, {
    foreignKey: 'groupId',
    targetKey: 'id'
});
import { DataTypes } from "sequelize";
import sequelize from "../database.js";



export const TabModel = sequelize.define('Tab',
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        createdAt: false,
        updatedAt: 'updateTimestamp',
        tableName: 'tab'
    }
);

export const SubTabModel = sequelize.define('SubTab',
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tabId: {
            type: DataTypes.INTEGER,
            unique: true,
        }
    },
    {
        createdAt: false,
        updatedAt: 'updateTimestamp',
        tableName: 'subtab'
    }
);
TabModel.hasMany(SubTabModel)
SubTabModel.belongsTo(TabModel)


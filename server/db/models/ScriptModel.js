import { DataTypes } from "sequelize";
import sequelize from "../database.js";



export const TabModel = sequelize.define('TabModel',
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

export const SubTabModel = sequelize.define('SubTabModel',
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tabid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: TabModel,
                key: 'id'
            }
        }
    },
    {
        createdAt: false,
        updatedAt: 'updateTimestamp',
        tableName: 'subtab'
    }
);
// Установка ассоциаций
TabModel.hasMany(SubTabModel, {
    foreignKey: 'tabid', // Указываем внешний ключ в SubTabModel
    sourceKey: 'id' // Указываем ключ в TabModel
});

SubTabModel.belongsTo(TabModel, {
    foreignKey: 'tabid', // Указываем внешний ключ в SubTabModel
    targetKey: 'id' // Указываем ключ в TabModel
});
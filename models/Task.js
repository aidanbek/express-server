const dbConfig = require('../helpers/dbConfig');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(dbConfig);

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
    paranoid: true,
    deletedAt: 'deleted_at',
    scopes: {
        ordered: {
            order: ['title']
        },
        completed: {
            where: {
                completed: true
            }
        },
        uncompleted: {
            where: {
                completed: false
            }
        }
    }
});

module.exports = Task;

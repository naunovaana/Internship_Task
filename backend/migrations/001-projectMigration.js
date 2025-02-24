"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Projects", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Users", // Foreign key relation
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Projects");
    }
};

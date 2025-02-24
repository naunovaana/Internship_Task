"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Tasks", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            due_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            project_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Projects", // Foreign key relation
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Tasks");
    }
};

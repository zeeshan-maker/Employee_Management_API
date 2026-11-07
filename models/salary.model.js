const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Salary = sequelize.define("Salary", {
    salary_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    month: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_status: {
        type: DataTypes.ENUM("pending", "paid"),
        defaultValue: "pending"
    }
});

module.exports = Salary;
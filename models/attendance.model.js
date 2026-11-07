const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Attendance = sequelize.define("Attendance", {
    attendance_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    check_in: {
        type: DataTypes.DATE
    },
    check_out: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM("present", "absent", "half_day", "leave"),
        defaultValue: "present"
    }
});

module.exports = Attendance;
const User = require("./user.model");
const Employee = require("./employee.model");
const Department = require("./department.model");
const Attendance = require("./attendance.model");
const Leave = require("./leave.model");
const Salary = require("./salary.model");

// User - Employee
User.hasOne(Employee, { foreignKey: "user_id" });
Employee.belongsTo(User, { foreignKey: "user_id" });

// Department - Employee
Department.hasMany(Employee, { foreignKey: "department_id" });
Employee.belongsTo(Department, { foreignKey: "department_id" });

// Employee - Attendance
Employee.hasMany(Attendance, { foreignKey: "employee_id" });
Attendance.belongsTo(Employee, { foreignKey: "employee_id" });

// Employee - Leave
Employee.hasMany(Leave, { foreignKey: "employee_id" });
Leave.belongsTo(Employee, { foreignKey: "employee_id" });

// Employee - Salary
Employee.hasMany(Salary, { foreignKey: "employee_id" });
Salary.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = {
    User,
    Employee,
    Department,
    Attendance,
    Leave,
    Salary
};
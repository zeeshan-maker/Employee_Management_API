const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sequelize = require("../config/database");

const {User, Employee, Department} = require("../models");

// REGISTER EMPLOYEE
exports.register = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const {
            name,
            email,
            password,
            phone,
            designation,
            department_id,
            joining_date,
            salary,
            address
        } = req.body;

        // Validation
        if (
            !name || !email || !password || !phone ||
            !designation || !department_id ||
            !joining_date || salary === undefined
        ) {
            await transaction.rollback();

            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        if (password.length < 6) {
            await transaction.rollback();

            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            where: { email },
            transaction
        });

        if (existingUser) {
            await transaction.rollback();

            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Check department
        const department = await Department.findByPk(
            department_id,
            { transaction }
        );

        if (!department) {
            await transaction.rollback();

            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "employee"
        }, { transaction });

        // Create Employee
        const employee = await Employee.create({
            user_id: user.user_id,
            department_id,
            phone,
            designation,
            joining_date,
            salary,
            address
        }, { transaction });

        await transaction.commit();

        return res.status(201).json({
            success: true,
            message: "Employee registered successfully",
            data: {
                user_id: user.user_id,
                employee_id: employee.employee_id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: department.department_name
            }
        });

    } catch (error) {
        await transaction.rollback();

        console.error("Registration Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// LOGIN EMPLOYEE
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({
            where: { email },
            include: [
                {
                    model: Employee,
                    include: [Department]
                }
            ]
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role,
                employee: user.Employee
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
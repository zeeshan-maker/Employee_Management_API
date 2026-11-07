const { Department } = require("../models");

// ADD DEPARTMENT
exports.createDepartment = async (req, res) => {
    try {
        const { department_name, description } = req.body;

        if (!department_name) {
            return res.status(400).json({
                success: false,
                message: "Department name is required"
            });
        }

        // Check existing department
        const existingDepartment = await Department.findOne({
            where: { department_name }
        });

        if (existingDepartment) {
            return res.status(409).json({
                success: false,
                message: "Department already exists"
            });
        }

        const department = await Department.create({
            department_name,
            description
        });

        return res.status(201).json({
            success: true,
            message: "Department created successfully",
            data: department
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// GET ALL DEPARTMENTS
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll({
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            success: true,
            count: departments.length,
            data: departments
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// GET SINGLE DEPARTMENT
exports.getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findByPk(id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: department
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// DELETE DEPARTMENT
exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findByPk(id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        await department.destroy();

        return res.status(200).json({
            success: true,
            message: "Department deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const express = require("express");

const router = express.Router();

const {
    createDepartment,
    getDepartments,
    getDepartmentById,
    deleteDepartment
} = require("../controllers/department.controller");

const { authenticate } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");




router.post("/", authenticate, authorizeRoles('admin'), createDepartment);

router.get("/", authenticate, getDepartments);

router.get("/:id",authenticate, getDepartmentById);

router.delete("/:id", authenticate, authorizeRoles('admin'), deleteDepartment);

module.exports = router;
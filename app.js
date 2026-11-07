const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const departmentRoutes = require("./routes/department.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);





app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Employee Management API is running"
    });
});

module.exports = app;
require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log("MySQL Database Connected");

        await sequelize.sync({ alter: true });

        console.log("Database Tables Synchronized");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server Error:", error);
    }
};

startServer();
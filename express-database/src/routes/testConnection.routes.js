module.exports = (express, app) => {
    const router = express.Router();
  
    // Test database connection
    router.get("/test-connection", async (req, res) => {
      const db = require("../database/index.js");
      try {
        await db.sequelize.authenticate();
        res.status(200).send("Database connection has been established successfully.");
      } catch (error) {
        res.status(500).send("Unable to connect to the database: " + error.message);
      }
    });
  
    app.use("/api", router);
  };
const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("medicine_donation", "root", "Shubh@06", {
  dialect: "mysql",
  host: "localhost",
  database: "medicine_donation"
});

module.exports = sequelize;
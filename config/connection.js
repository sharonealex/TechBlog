//Import sequelize
const Sequelize = require("sequelize");
 //To load env variables
require("dotenv").config();
//create the connection object
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
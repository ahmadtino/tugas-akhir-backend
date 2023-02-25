import { Sequelize } from "sequelize";

const db = new Sequelize('energy_monitor', 'root', 'rootpassword', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
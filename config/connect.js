module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "internship",
  dialect: "mysql",
  pool: {
    max: 40,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

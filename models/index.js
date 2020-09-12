const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {host: process.env.DATABASE_HOST, dialect: 'postgres'},
);

const models = {
  Project: sequelize.import('./project'),
  Asset: sequelize.import('./asset'),
};

models.Project.hasMany(models.Asset)
models.Asset.belongsTo(models.Project)
sequelize.sync()
module.exports = models;
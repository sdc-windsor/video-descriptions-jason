const Sequelize = require('sequelize');

const sequelize = new Sequelize('sdc', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

const Description = sequelize.define('description',
  {
    text: Sequelize.STRING(1000),
    likes: Sequelize.INTEGER,
    categories: Sequelize.ARRAY(Sequelize.TEXT)
  },
  {
    timestamps: false,
  }
);

module.exports = Description;
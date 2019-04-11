const Sequelize = require('sequelize');
const { pg: { host, user, database, password } } = require('../config.js');

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  logging: false
});

const Description = sequelize.define('description',
  {
    videoId: Sequelize.INTEGER,
    text: Sequelize.TEXT,
    likes: Sequelize.INTEGER,
    categories: Sequelize.ARRAY(Sequelize.TEXT)
  },
  {
    timestamps: false,
    underscored: true,
    indexes: [
      {unique: true, fields: ['video_id']}
    ],
  },
);

const Comment = sequelize.define('comment',
  {
    videoId: Sequelize.INTEGER,
    text: Sequelize.TEXT,
    date: Sequelize.DATE
  },
  {
    timestamps: false,
    underscored: true,
    indexes: [
      {name: 'video_index', unique: false, fields: ['video_id'], method: 'BTREE'}
    ]
  }
);

const User = sequelize.define('user',
  {
    username: Sequelize.TEXT,
    user_thumbnail: Sequelize.TEXT
  },
  {
    timestamps: false,
    underscored: true,
  }
);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = { Description, Comment, User, sequelize };
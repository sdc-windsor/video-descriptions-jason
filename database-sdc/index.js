const Sequelize = require('sequelize');

const sequelize = new Sequelize('sdc', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

const Description = sequelize.define('description',
  {
    videoId: {type: Sequelize.INTEGER},
    text: Sequelize.TEXT,
    likes: Sequelize.INTEGER,
    categories: Sequelize.ARRAY(Sequelize.TEXT)
  },
  {
    timestamps: false
  }
);

const Comment = sequelize.define('comment',
  {
    videoId: Sequelize.INTEGER,
    text: Sequelize.TEXT,
    date: Sequelize.DATE
  },
  {
    timestamps: false
  }
);

const User = sequelize.define('user',
  {
    username: Sequelize.TEXT,
    user_thumbnail: Sequelize.TEXT
  },
  {
    timestamps: false
  }
);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = { Description, Comment, User };
const User = require("./User");
const BlogPost = require("./BlogPost");

BlogPost.belongsTo(User, {
  foreignKey: "post_id",
});

User.hasMany(BlogPost, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  BlogPost,
};

const User = require("./User");
const BlogPost = require("./BlogPost");

User.hasMany(BlockPost, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
  foreignKey: "post_id",
});

module.exports = {
  User,
  BlogPost,
};

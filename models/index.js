const User = require('./User')
const BlogPost = require('./BlogPost')
const Comment = require('./Comment')

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
})

BlogPost.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

module.exports = {
  User,
  BlogPost,
  Comment
}

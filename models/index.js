const User = require('./User')
const BlogPost = require('./BlogPost')
const Comment = require('./Comment')

// one user to each blog post
BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
})

// blog post can have many comments
BlogPost.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

// Comment belongs to both BlogPost and User
Comment.belongsTo(BlogPost, {
  foreignKey: 'post_id'
})

// Comment has one owner
Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

// Users have many blog posts
User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

module.exports = {
  User,
  BlogPost,
  Comment
}

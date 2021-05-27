const { Comment } = require('../models')

const commentData = [
  {
    body: 'great blog post',
    post_id: 1,
    user_id: 1
  },
  {
    body: 'meme meme meme meme',
    post_id: 2,
    user_id: 1
  },
  {
    body: 'actually...',
    post_id: 3,
    user_id: 2
  }
]

const seedCommentData = () => Comment.bulkCreate(commentData)

module.exports = seedCommentData

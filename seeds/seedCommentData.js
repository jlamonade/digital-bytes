const { Comment } = require('../models')

const commentData = [
  {
    body: 'great blog post',
    post_id: 1
  },
  {
    body: 'meme meme meme meme',
    post_id: 2
  },
  {
    body: 'actually...',
    post_id: 3
  }
]

const seedCommentData = () => Comment.bulkCreate(commentData)

module.exports = seedCommentData

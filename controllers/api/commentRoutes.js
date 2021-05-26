const router = require('express').Router()
const { Comment, BlogPost } = require('../../models')

router.post('/comment', async (req, res) => {
  try {
    const commentData = await Comment.create(req.body)
    if (commentData) {
      res.status(200).json(commentData)
    }
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

router.get('/comment', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        post_id: 
      }
    })
  } catch (err) {}
})
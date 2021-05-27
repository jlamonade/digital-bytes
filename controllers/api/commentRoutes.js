const router = require('express').Router()
const { Comment } = require('../../models')

router.post('/new', async (req, res) => {
  if (req.session.loggedIn) { // post comment protection
    try {
      const commentData = await Comment.create({
        body: req.body.body,
        post_id: req.body.postId, // post id is passed in via html dataset
        user_id: req.session.user_id // taken from session obj
      })
      if (commentData) {
        res.status(200).json(commentData)
      }
    } catch (err) {
      res.status(500).json('500 Internal Server Error.')
    }
  }
})

module.exports = router

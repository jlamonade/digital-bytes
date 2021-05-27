const router = require('express').Router()
const { Comment } = require('../../models')

router.post('/new', async (req, res) => {
  console.log(req)
  try {
    const commentData = await Comment.create({
      body: req.body.body,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
    if (commentData) {
      res.status(200).json(commentData)
    }
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

module.exports = router

// router.get('/comment', async (req, res) => {
//   try {
//     const commentData = await Comment.findAll({
//       where: {
//         post_id: req.body.post_id
//       }
//     })
//     if (commentData) {
//       res.json(commentData)
//     } else {
//       res.status(404).json('404 comment not found.')
//     }
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

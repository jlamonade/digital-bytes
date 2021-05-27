const router = require('express').Router()
const { Comment } = require('../../models')

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

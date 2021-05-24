const router = require('express').Router()
const { User, BlogPost } = require('../../models')

// CREATE
// TODO: figure out logic to create posts owned by authenticated User
// TODO: parse data into handlebars friendly format
router.post('/new', async (req, res) => {
  try {
    const postData = await BlogPost.create(req.body, {
      where: {
        user_id: req.body.user_id
      }
    })
    if (postData) res.status(200).json('Post successfully posted.')
    else res.status(404).json('404 User Not Found.')
  } catch (err) {
    res.status(500).json(err)
  }
})

// READ
// get all posts
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: { model: User, attributes: ['name'] }
    })
    if (blogData) res.status(200).json(blogData)
    else res.status(404).json('404 Blog Data Not Found.')
  } catch (err) {
    res.status(500).json(err)
  }
})

// get posts associated to specific user
router.get('/:user_id', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      where: {
        user_id: req.body.user_id
      },
      include: { model: User, attributes: ['name'] }
    })
    if (blogData) res.status(200).json(blogData)
    else res.status(404).json('404 User Posts Not Found.')
  } catch (err) {
    res.status(500).json(err)
  }
})

// UPDATE

// DELETE

module.exports = router

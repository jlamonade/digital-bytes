const router = require('express').Router()
const { User, BlogPost } = require('../../models')

// CREATE
// TODO: figure out logic to create posts owned by authenticated User
router.post('/', async (req, res) => {
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
    res.status(500).json('500 Internal Server Error.')
  }
})

// get posts associated to specific user
router.get('/user/:user_id', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      where: {
        user_id: req.params.user_id
      },
      include: { model: User, attributes: ['name'] }
    })
    if (blogData) res.status(200).json(blogData)
    else res.status(404).json('404 User Posts Not Found.')
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})
// TODO: get posts by id for user to edit
router.get('/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      where: {
        user_id: req.body.user_id,
        id: req.params.id
      }
    })
    if (blogData) res.status(200).json(blogData)
    else res.status(404).json('404 Post Not Found.')
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (blogData[0]) res.status(200).json('Post Successfully Updated')
    else res.status(404).json('404 Post Not Found')
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.body.user_id
      }
    })
    if (blogData[0]) res.status(200).json('Post Successfully Delete')
    else res.status(404).json('404 Post Not Found.')
  } catch (err) {
    res.status(500).json('500 Internal Server Error')
  }
})

module.exports = router

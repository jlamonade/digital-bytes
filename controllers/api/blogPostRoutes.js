const router = require('express').Router()
const { User, BlogPost } = require('../../models')

// CREATE
router.post('/', async (req, res) => {
  // creates a new post with data passed in from the front end
  try {
    const postData = await BlogPost.create({
      title: req.body.title,
      body: req.body.body,
      user_id: await req.session.user_id // user_id is taken from session
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
  // allow logged in users access to all blog posts in the api
  if (req.session.loggedIn) {
    try {
      const blogData = await BlogPost.findAll({
        // only expose the name of the user so that private information is not exposed
        include: { model: User, attributes: ['name'] }
      })
      if (blogData) res.status(200).json(blogData)
      else res.status(404).json('404 Blog Data Not Found.')
    } catch (err) {
      res.status(500).json('500 Internal Server Error.')
    }
  }
})

// get posts associated to specific user
router.get('/user/:user_id', async (req, res) => {
  // allowed logged in users to access posts by specific user_id
  if (req.session.loggedIn) {
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
  }
})

router.get('/:id', async (req, res) => {
  // allows loggedIn users to get posts by id
  if (req.session.loggedIn) {
    try {
      const blogData = await BlogPost.findByPk(req.params.id)
      if (blogData) res.status(200).json(blogData)
      else res.status(404).json('404 Post Not Found.')
    } catch (err) {
      res.status(500).json('500 Internal Server Error.')
    }
  }
})

// UPDATE
router.put('/:id', async (req, res) => {
  // allow logged in users to make updates posts by id
  if (req.session.loggedIn) {
    try {
      const blogData = await BlogPost.update(req.body, {
        where: {
          id: req.params.id,
          // and only if the logged in user is the owner of the post
          user_id: req.session.user_id
        }
      })
      if (blogData[0]) res.status(200).json('Post Successfully Updated')
      else res.status(404).json('404 Post Not Found')
    } catch (err) {
      res.status(500).json('500 Internal Server Error.')
    }
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  // only allows logged in users to delete posts
  if (req.session.loggedIn) {
    try {
      const blogData = await BlogPost.destroy({
        where: {
          id: req.params.id,
          // and only if they own the post
          user_id: req.session.user_id
        }
      })
      if (!blogData[0]) res.status(200).json('Post Successfully Delete')
      else res.status(404).json('404 Post Not Found.')
    } catch (err) {
      res.status(500).json('500 Internal Server Error')
    }
  }
})

module.exports = router

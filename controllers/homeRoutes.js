const router = require('express').Router()
const { BlogPost, User } = require('../models')

router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: { model: User, attributes: ['name'] }
    })
    const posts = blogData.map(element => element.get({ plain: true }))
    if (blogData) res.render('index', { posts: posts })
    else res.status(404).json('404 Blog Data Not Found.')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', async (req, res) => {
  return await res.render('login')
})
router.get('/signup', async (req, res) => {
  return await res.render('signup')
})
router.get('/dashboard', async (req, res) => {
  return await res.render('dashboard')
})

module.exports = router

const router = require('express').Router()
const { BlogPost, User } = require('../models')

router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: { model: User, attributes: ['name'] }
    })
    const posts = blogData.map(element => element.get({ plain: true }))
    if (blogData) res.render('index', { posts: posts, loggedIn: req.session.loggedIn })
    // TODO: create handlebars helpers to show or hide links
    else res.status(404).json('404 Blog Data Not Found.')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  } else { return await res.render('login') }
})

router.get('/signup', async (req, res) => {
  return await res.render('signup')
})

router.get('/dashboard', async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const blogData = await BlogPost.findAll({
        where: {
          user_id: await req.session.user_id
        }
      })
      const posts = blogData.map(element => element.get({ plain: true }))
      await res.render('dashboard', { posts: posts })
    } catch (err) {
      res.status(500).json('500 Internal Server Error.')
    }
  }
})

router.get('/new', async (req, res) => {
  if (!req.session.loggedIn) {
    res.render('login')
  } else {
    res.render('newpost')
  }
})

router.get('/update/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.render('login')
  } else {
    const postData = await BlogPost.findByPk(req.params.id)
    const post = postData.get({ plain: true })
    res.render('updatepost', { post: post })
  }
})

module.exports = router

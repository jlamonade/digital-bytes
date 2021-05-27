const router = require('express').Router()
const { BlogPost, User, Comment } = require('../models')

router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: { model: User, attributes: ['name'] }
    })
    // gets all posts and gets the plain version so that data can be iterated
    // and rendered onto page
    const posts = blogData.map(element => element.get({ plain: true }))
    console.log(posts)
    if (blogData) res.render('index', { posts: posts, loggedIn: req.session.loggedIn })
    else res.status(404).json('404 Blog Data Not Found.')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', async (req, res) => {
  // if user is logged in, redirect them to dashboard
  if (req.session.loggedIn) {
    res.redirect('/')
  } else { res.render('login') }
})

router.get('/signup', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard')
  } else {
    res.render('signup')
  }
})

router.get('/dashboard', async (req, res) => {
  // if user is logged in load all posts that belong to them
  if (req.session.loggedIn) {
    try {
      const blogData = await BlogPost.findAll({
        where: {
          user_id: await req.session.user_id // user_id is saved to session at log in
        }
      })
      const posts = blogData.map(element => element.get({ plain: true }))
      // return a plain json object array so that it can be iterated
      await res.render('dashboard', { posts: posts })
    } catch (err) {
      res.status(500).json('500 Internal Server Error.')
    }
  } else {
    res.render('login')
  }
})

router.get('/new', async (req, res) => {
  // if user is not logged in send them to login
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
    // post data is passed in so that it can populate the
    // input fields so it is easier to edit
    const post = postData.get({ plain: true })
    res.render('updatepost', { post: post })
  }
})

router.get('/posts/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id)
    const commentData = await Comment.findAll({
      include: {
        model: User,
        attributes: ['name']
      },
      where: {
        post_id: req.params.id
      }
    })
    const comments = commentData.map(element => element.get({ plain: true }))
    const post = blogData.get({ plain: true })
    if (post) res.render('article', { post: post, comments: comments })
    else res.status(404).json('404 Post Not Found.')
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

module.exports = router

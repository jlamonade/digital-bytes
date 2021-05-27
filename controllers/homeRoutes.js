const router = require('express').Router()
const { BlogPost, User, Comment } = require('../models')

// root route
router.get('/', async (req, res) => {
  /*
  finds all blogs posts and passes the information into handlebars
  renderer. model method gets all blog posts and the author.
  */
  try {
    const blogData = await BlogPost.findAll({
      include: { model: User, attributes: ['name'] }, // to get the username
      order: [['createdAt', 'DESC']] // posts should be in descending order by date
    })
    // gets the plain version so that data can be iterated
    // and rendered onto page
    const posts = blogData.map(element => element.get({ plain: true }))
    console.log(posts)
    // also sends session.loggedIn to validate login on the templates
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
  // checks to see if use is already logged in,
  // prevents user from signing up while logged in
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
        },
        order: [['createdAt', 'DESC']]
      })
      const posts = blogData.map(element => element.get({ plain: true }))
      // return a plain json object array so that it can be iterated
      res.render('dashboard', { posts: posts, loggedIn: req.session.loggedIn })
    } catch (err) {
      res.status(500).json('500 Internal Server Error.')
    }
  } else {
    res.render('login') // if not logged in redirect to login
  }
})

router.get('/new', async (req, res) => {
  // if user is not logged in send them to login
  if (!req.session.loggedIn) {
    res.render('login')
  } else { // if logged in send them to the new post page
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
    res.render('updatepost', { post: post, loggedIn: req.session.loggedIn })
  }
})

// renders article.handlebars
router.get('/posts/:id', async (req, res) => {
  /*
  both blog data and its associated comments need to be
  queried so that they can be processed and rendered in the
  template
  */
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['name']
      }
    })
    const commentData = await Comment.findAll({
      include: {
        model: User,
        attributes: ['name']
        // get only the name so email/password are not exposed
      },
      where: {
        post_id: req.params.id
      },
      order: [['createdAt', 'DESC']]
    })
    const comments = commentData.map(element => element.get({ plain: true }))
    const post = blogData.get({ plain: true })
    console.log(post)
    if (post && comments) { // if comments exist
      res.render('article', {
        post: post, // post data sent to template
        comments: comments, // comment data
        loggedIn: req.session.loggedIn // loggedIn state
      })
    } else if (post) { // if no comments
      res.render('article', {
        post: post, // post data sent to template
        loggedIn: req.session.loggedIn // loggedIn state
      })
    } else res.status(404).json('404 Post Not Found.')
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

module.exports = router

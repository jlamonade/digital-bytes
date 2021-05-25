const router = require('express').Router()
const { User, BlogPost } = require('../../models')

// TODO: put routes behind authentication
// CREATE, USER SIGN UP
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body)
    req.session.save(() => {
      req.session.loggedIn = false
      res.status(200).json(`User successfully CREATED. ID: ${userData.id}`)
    })
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

// LOGIN
router.post('/', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password.' })
      return
    }
    const validPassword = await userData.checkPassword(req.body.password)
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password.' })
      return
    }
    req.session.save(() => {
      req.session.loggedIn = true
      req.session.user_id = userData.id
      res.status(200).json({ user: userData, message: 'Login Successful' })
    })
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

// READ
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: BlogPost
    })
    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        id: req.params.id
      },
      include: BlogPost
    })
    if (userData[0]) res.status(200).json(userData)
    else res.status(404).json('404: User Not Found.')
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (userData[0]) res.status(200).json('User Successfully UPDATED.')
    else res.status(404).json('404: User Not Found.')
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    if (userData) res.status(200).json('User successfully DELETED.')
    else res.status(404).json('404: User Not Found.')
  } catch (err) {
    res.status(500).json('500 Internal Server Error.')
  }
})

module.exports = router

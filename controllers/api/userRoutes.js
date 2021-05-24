const router = require('express').Router()
const { User, BlogPost } = require('../../models')

// TODO: put routes behind authentication
// CREATE
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body)
    if (userData) res.status(200).json(`User successfully CREATED. ID: ${userData.id}`)
  } catch (err) {
    res.status(500).json(err)
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
    res.status(500).json(err)
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
    res.status(500).json(err)
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
    res.status(500).json(err)
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
    res.status(500).json(err)
  }
})

module.exports = router

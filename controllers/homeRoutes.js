const router = require('express').Router()

router.get('/', async (req, res) => {
  await res.render('index')
})
router.get('/login', async (req, res) => {
  return await res.render('login')
})
router.get('/dashboard', async (req, res) => {
  return await res.render('dashboard')
})

module.exports = router

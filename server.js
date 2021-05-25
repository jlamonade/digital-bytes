const express = require('express')
const routes = require('./controllers')
const exphbs = require('express-handlebars')
const session = require('express-session')
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const path = require('path')

const app = express()
const hbs = exphbs.create({})
const PORT = process.env.PORT || 3001

// HANDLEBARS
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// SESSION
const sess = {
  secret: process.env.SESS_SECRET || 'secret hash key',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

// MIDDLEWARE
app.use(express.json())
app.use(session(sess))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// CONTROLLERS
app.use(routes)

// INIT
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.`)
  })
})

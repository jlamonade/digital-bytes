const seedBlogPosts = require('./seedPostData')
const seedUserData = require('./seedUserData')

const sequelize = require('../config/connection')

const seedAll = async () => {
  await sequelize.sync({ force: true })
  console.log('\n----- DATABASE SYNCED -----\n')

  await seedUserData()
  console.log('\n----- USERS SYNCED -----\n')

  await seedBlogPosts()
  console.log('\n----- POSTS SYNCED -----\n')

  process.exit(0)
}

seedAll()

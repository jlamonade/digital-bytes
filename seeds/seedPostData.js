const { BlogPost } = require('../models')

const blogPostData = [
  {
    title: 'Do you really need an SSD?',
    body: 'If you want to go fast, then yes.',
    user_id: 1
  },
  {
    title: 'How to overclock your CPU',
    body: 'All your gamer friends are talking about overclocking CPUs...',
    user_id: 1
  },
  {
    title: 'Top 10 WiFi6E Routers 2021',
    body: '1. LinkSys AX 11000...',
    user_id: 2
  }
]

const seedBlogPosts = () => BlogPost.bulkCreate(blogPostData)

module.exports = seedBlogPosts

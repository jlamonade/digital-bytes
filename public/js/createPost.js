const handleCreatePost = async (e) => {
  e.preventDefault()
  const title = document.querySelector('#input-title').value.trim()
  const body = document.querySelector('#input-body').value.trim()
  const user_id = 1 // req.session.user_id

  if (title && body) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        user_id
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    if (response.ok) { // TODO: need to change route to read logged in user, use req.session.user_id
      document.location.replace('/dashboard/1')
    } else {
      alert('Post not created')
    }
  }
}

document
  .querySelector('#new-post-form')
  .addEventListener('submit', handleCreatePost)

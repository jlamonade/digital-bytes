const handleCreatePost = async (e) => {
  e.preventDefault()
  const title = document.querySelector('#input-title').value.trim()
  const body = document.querySelector('#input-body').value.trim()

  if (title && body) {
    // creates a fetch post request to create new posts using the
    // values taken from the input fields
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body
        // userId is defined in the backend route
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert('Post not created')
    }
  }
}

document
  .querySelector('#new-post-form')
  .addEventListener('submit', handleCreatePost)

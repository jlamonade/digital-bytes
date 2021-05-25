const handleCreatePost = async (e) => {
  e.preventDefault()
  const title = document.querySelector('#input-title').value
  const body = document.querySelector('#input-body').value

  await fetch('/api/posts', {
    method: 'POST',
    body: {
      title: title,
      body: body,
      user_id: 1
      // TODO: fix body to pass user_id properly
    },
    header: {
      'Content-type': 'application/json'
    }
  })
}

document
  .querySelector('#new-post-form')
  .addEventListener('submit', handleCreatePost)

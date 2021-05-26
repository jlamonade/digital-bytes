const updatePostHandler = async (e) => {
  e.preventDefault()
  const title = document.querySelector('#input-title').value.trim()
  const body = document.querySelector('#input-body').value.trim()
  // post id is passed into here from the get request that renders the update post page
  const postId = document.querySelector('#submit-button').dataset.id

  const response = await fetch(`../api/posts/${postId}`, { // post id is used to make a put request
    method: 'PUT',
    body: JSON.stringify({ title, body }),
    headers: { 'Content-type': 'application/json' }
  })
  if (response.ok) {
    document.location.replace('/dashboard')
  } else {
    alert('Post not updated')
  }
}

document.querySelector('#submit-button').addEventListener('click', updatePostHandler)

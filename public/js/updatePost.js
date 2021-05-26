const updatePostHandler = async (e) => {
  e.preventDefault()
  const title = document.querySelector('#input-title').value.trim()
  const body = document.querySelector('#input-body').value.trim()
  const postId = document.querySelector('#submit-button').dataset.id
  console.log(postId)

  const response = await fetch(`../api/posts/${postId}`, {
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

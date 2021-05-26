const deletePostHandler = async (e) => {
  e.preventDefault()
  // uses post id passed in by the dashboard route
  const postId = document.querySelector('#delete-button').dataset.id
  const response = await fetch(`../api/posts/${postId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    document.location.replace('/dashboard')
  } else {
    alert('Unable to delete post.')
  }
}

document
  .querySelector('#delete-button')
  .addEventListener('click', deletePostHandler)

const commentHandler = async (e) => {
  e.preventDefault()
  const comment = document.querySelector('#input-comment').value.trim()
  const postId = document.querySelector('#comment-form').dataset.id

  // sends the comment from user input to the back
  // the rest of the fields will be filled out in the back
  const response = await fetch('/api/comments/new', {
    method: 'POST',
    body: JSON.stringify({
      body: comment,
      postId
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })

  if (response.ok) {
    document.location.reload()
  } else {
    alert('Comment not submitted')
  }
}

document.querySelector('#comment-form').addEventListener('submit', commentHandler)

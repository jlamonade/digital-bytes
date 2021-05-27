const commentHandler = async (e) => {
  e.preventDefault()
  const comment = document.querySelector('#input-comment').value.trim()
  const post_id = document.querySelector('#comment-form').dataset.id
  console.log(JSON.stringify({
    body: comment
  }))
  const response = await fetch('/api/comments/new', {
    method: 'POST',
    body: JSON.stringify({
      body: comment,
      post_id
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })

  if (response.ok) {
    document.location.replace('/')
  } else {
    alert('Comment not submitted')
  }
}

document.querySelector('#comment-form').addEventListener('submit', commentHandler)

const signUpHandler = async (e) => {
  e.preventDefault()
  const name = document.querySelector('#input-username').value.trim()
  const email = document.querySelector('#input-email').value.trim()
  const password = document.querySelector('#input-password').value.trim()

  if (name && email && password) {
    // user info is sent through the request body
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    if (response.ok) { // if user successfully signs up send them to login page
      document.location.replace('/login')
    } else {
      alert('Please correct information.')
    }
  }
}

document.querySelector('#signup-form').addEventListener('submit', signUpHandler)

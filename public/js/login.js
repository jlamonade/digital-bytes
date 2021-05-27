const loginHandler = async (e) => {
  e.preventDefault()
  const email = document.querySelector('#input-email').value.trim()
  const password = document.querySelector('#input-password').value.trim()

  /*
  sends login info to the back where the email
  and password is used to verify the user
  and mark them as loggedIn in their session
  */
  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-type': 'application/json' }
  })
  if (response.ok) {
    document.location.replace('/')
  } else {
    alert('Failed to log in.')
  }
}

document.querySelector('#login-form').addEventListener('submit', loginHandler)

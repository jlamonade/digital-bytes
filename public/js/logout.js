const logout = async () => {
  // if user is logged in then their session is destroyed when they log out
  const response = await fetch('api/users/logout', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' }
  })

  if (response.ok) {
    document.location.replace('/')
  } else {
    alert('failed to log out.')
  }
}

document.querySelector('#logout').addEventListener('click', logout)

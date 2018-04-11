const loginBtn = document.getElementById('loginBtn')
loginBtn.onclick = function () {
  const username = document.querySelector('.demo-login-username input').value
  const password = document.querySelector('.demo-login-password input').value
  if (username && password) alert('登陆成功!')
  else alert('信息不全，请重填!')
}
'use strict';

var loginBtn = document.getElementById('loginBtn');
loginBtn.onclick = function () {
  var username = document.querySelector('.demo-login-username input').value;
  var password = document.querySelector('.demo-login-password input').value;
  if (username && password) alert('登陆成功!');else alert('信息不全，请重填!');
};
'use strict';

var registerBtn = document.getElementById('registerBtn');
registerBtn.onclick = function () {
  var username = document.querySelector('.demo-login-username input').value;
  var password = document.querySelector('.demo-login-password input').value;
  if (username && password) alert('注册成功');else alert('信息不全，请重填');
};
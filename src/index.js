import logo from './tclogo.png';

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = '<h1>webpack</h1>';

  return element;
}
function img() {
  var element = document.createElement('img');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.src = logo;

  return element;
}


document.body.appendChild(component());
document.body.appendChild(img());
import logo from './tclogo.png';
import main from './index.less'
import math from './math';
import  'lodash'


console.log(math.add(2,4))

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = '<h1>webpack</h1>';

  return element;
}
function img(className) {
  var element = document.createElement('img');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.src = logo;
  element.className = main[className];
  return element;
}

function createicon() {
  var element = document.createElement('i');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.className = main.iconfont+" "+ main['icon-add'];
  return element;
}


document.body.appendChild(component());
document.body.appendChild(img('logo'));
document.body.appendChild(img('aa'));
document.body.appendChild(createicon());

const aa = [
  new Promise(()=>{})
]

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
			.then(registration => {
				console.log('service-worker registed');
			}).catch(error => {
				console.log('service-worker register error');
			})
	})
}


function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Dell', 'Lee'], '-');
    return element
  })
}

getComponent().then(element => {
  document.body.appendChild(element)
})
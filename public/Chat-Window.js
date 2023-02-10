
const message = document.getElementById('message');

console.log(message.innerHtml);

const child = document.createTextNode('user logged in');
message.appendChild(child);
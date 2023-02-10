
const message = document.getElementById('message');

console.log(message.innerHtml);

const child = document.createTextNode('user logged in');
message.appendChild(child);

const form = document.querySelector('form');

form.addEventListener('submit',async(e)=>{

    try{
        e.preventDefault();
        const token = localStorage.getItem('token');
        const chat = e.target.chat.value;


        const obj = {
            chat:chat
        }

        const response = await axios.post("http://localhost:3000/chat/addChat",obj, {headers: {"Authorization": token}})
        console.log(response);
    }
    catch(error){
       console.log(error);
    }
   
});
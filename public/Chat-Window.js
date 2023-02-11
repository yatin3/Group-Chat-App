
const message = document.getElementById('message');

//console.log(message.innerHtml);

const child = document.createElement('li');
child.appendChild(document.createTextNode('user logged in'));
child.style.backgroundColor = '#f4f4f4';
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
        const count = await axios.get("http://localhost:3000/chat/getCount",{ headers: {"Authorization": token}});
        console.log(response);
        console.log(count);
      
        const child1 = document.createElement('li');
        child1.appendChild(document.createTextNode(response.data.message));

        if(count%2 === 0){


                child1.style.backgroundColor = '#ccc';
            }else{
                child1.style.backgroundColor = '#f4f4f4';
            }
    
            message.appendChild(child1);
        }
    
    catch(error){
       console.log(error);
    }
   
});

window.addEventListener('DOMContentLoaded',async () => {

    const token = localStorage.getItem('token');

    const Chats = await axios.get("http://localhost:3000/chat/getChats",{ headers: {"Authorization": token}});

    for(let i=0; i<Chats.data.length; i++){
        
        const child1 = document.createElement('li');
        child1.appendChild(document.createTextNode(Chats.data[i].message));
        if(i%2 === 0){
            child1.style.backgroundColor = '#ccc';
        }else{
            child1.style.backgroundColor = '#f4f4f4';
        }

        message.appendChild(child1);
    }
})
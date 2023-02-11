
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
        
        console.log(token);

        const obj = {
            chat:chat
        }

        const response = await axios.post("http://localhost:3000/chat/addChat",obj, {headers: {"Authorization": token}})
        
        let addToLocalStorage = JSON.parse(localStorage.getItem('Chat'));

        addToLocalStorage.push(response.data);

        localStorage.setItem('Chat',JSON.stringify(addToLocalStorage));

        console.log(JSON.parse(localStorage.getItem("Chat")));

        const count = await axios.get("http://localhost:3000/chat/getCount",{ headers: {"Authorization": token}});
        // console.log(response);
        // console.log(count);
      
    //     const child1 = document.createElement('li');
    //     child1.appendChild(document.createTextNode(response.data.message));

    //     if(count%2 === 0){


    //             child1.style.backgroundColor = '#ccc';
    //         }else{
    //             child1.style.backgroundColor = '#f4f4f4';
    //         }
    
    //         message.appendChild(child1);
    //     }
    }
    catch(error){
       console.log(error);
    }
   
});

// window.addEventListener('DOMContentLoaded',async () => {

//     const token = localStorage.getItem('token');

//     const Chats = await axios.get("http://localhost:3000/chat/getChats",{ headers: {"Authorization": token}});

//     console.log(Chats.data);
    

//     for(let i=0; i<Chats.data.length; i++){
        
//         const child1 = document.createElement('li');
//         child1.appendChild(document.createTextNode(Chats.data[i].message));
//         if(i%2 === 0){
//             child1.style.backgroundColor = '#ccc';
//         }else{
//             child1.style.backgroundColor = '#f4f4f4';
//         }

//         message.appendChild(child1);
//     }
// })

window.addEventListener('DOMContentLoaded',async () => {

   
    const token = localStorage.getItem('token');

    let Chats = 0;

    const LocalData = JSON.parse(localStorage.getItem('Chat'));

    if(LocalData === null){

      Chats = await axios.get(`http://localhost:3000/chat/getChats?getFrom=${0}`,{ headers: {"Authorization": token}});


     localStorage.setItem('Chat',JSON.stringify(Chats.data));

    }
    else{

        console.log(LocalData.length);

        while(LocalData.length > 10){
            LocalData.shift();
        }

        localStorage.setItem('Chat',JSON.stringify(LocalData));

        const getData = JSON.parse(localStorage.getItem('Chat'));

        let id = 0;

        for(let i=0; i<getData.length; i++){

           if(getData[i].id > id){
            id = getData[i].id;
           }
        }

         Chats = await axios.get(`http://localhost:3000/chat/getChats?getFrom=${id}`,{ headers: {"Authorization": token}});

    }

    if(LocalData !== null){

        for(let i=0; i<LocalData.length; i++){
        
            const child1 = document.createElement('li');
            child1.appendChild(document.createTextNode(LocalData[i].message));
            if(i%2 === 0){
                child1.style.backgroundColor = '#ccc';
            }else{
                child1.style.backgroundColor = '#f4f4f4';
            }
    
            message.appendChild(child1);
        }
    
    }
  
    console.log(Chats.data);

    for(let i=0; i<Chats.data.length; i++){
        
        const child1 = document.createElement('li');
        child1.appendChild(document.createTextNode(Chats.data[i].message));
        if(i%2 === 0){
            child1.style.backgroundColor = '#f4f4f4';
        }else{
            child1.style.backgroundColor = '#ccc';
        }

        message.appendChild(child1);
    }
})





// setInterval(async ()=>{
 
//     const token = localStorage.getItem('token');

//     message.innerHTML = '';

//         const Chats = await axios.get("http://localhost:3000/chat/getChats",{ headers: {"Authorization": token}});
    
//         for(let i=0; i<Chats.data.length; i++){
            
//             const child1 = document.createElement('li');
//             child1.appendChild(document.createTextNode(Chats.data[i].message));
//             if(i%2 === 0){
//                 child1.style.backgroundColor = '#ccc';
//             }else{
//                 child1.style.backgroundColor = '#f4f4f4';
//             }
    
//             message.appendChild(child1);
//         }

// },1000);





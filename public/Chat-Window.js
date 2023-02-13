
const message1 = document.getElementById('message1');
const groupsName = document.getElementById("groups");
const message2 = document.getElementById('message2');

//console.log(message.innerHtml);

const child = document.createElement('li');
child.appendChild(document.createTextNode('user logged in'));
child.style.backgroundColor = '#f4f4f4';
message1.appendChild(child);

const form = document.querySelector('form');

// form.addEventListener('submit',async(e)=>{

//     try{
//         e.preventDefault();
//         const token = localStorage.getItem('token');
//         const chat = e.target.chat.value;
        
//         console.log(token);

//         const obj = {
//             chat:chat
//         }

//         const response = await axios.post("http://52.193.101.35:3000/chat/addChat",obj, {headers: {"Authorization": token}})
        
//         let addToLocalStorage = JSON.parse(localStorage.getItem('Chat'));

//         addToLocalStorage.push(response.data);

//         localStorage.setItem('Chat',JSON.stringify(addToLocalStorage));

//         console.log(JSON.parse(localStorage.getItem("Chat")));

//         const count = await axios.get("http://52.193.101.35:3000/chat/getCount",{ headers: {"Authorization": token}});
//         // console.log(response);
//         // console.log(count);
      
//         const child1 = document.createElement('li');
//         child1.appendChild(document.createTextNode(response.data.message));

//         if(count%2 === 0){


//                 child1.style.backgroundColor = '#ccc';
//             }else{
//                 child1.style.backgroundColor = '#f4f4f4';
//             }
    
//             message.appendChild(child1);
//         }
//     catch(error){
//        console.log(error);
//     }
   
// });

form.addEventListener('submit',async(e)=>{

    try{
        e.preventDefault();
        const token = localStorage.getItem('token');
        const chat = e.target.chat.value;
        
       // console.log(token);

        const obj = {
            chat:chat
        }

        const response = await axios.post("http://52.193.101.35:3000/chat/addChat",obj, {headers: {"Authorization": token}})
        
        const count = await axios.get("http://52.193.101.35:3000/chat/getCount",{ headers: {"Authorization": token}});
        // console.log(response);
        //console.log(count.data);
      
        const child1 = document.createElement('li');
        child1.appendChild(document.createTextNode(response.data.message));

        if(((count.data)%2) !== 0){


                child1.style.backgroundColor = '#ccc';
            }else{
                child1.style.backgroundColor = '#f4f4f4';
            }
    
            message1.appendChild(child1);
        }
    catch(error){
       console.log(error);
    }
   
});

window.addEventListener('DOMContentLoaded',async () => {

    const token = localStorage.getItem('token');

    const Chats = await axios.get("http://52.193.101.35:3000/chat/getChats",{ headers: {"Authorization": token}});

    console.log(Chats.data);
    

    for(let i=0; i<Chats.data.length; i++){
        
        const child1 = document.createElement('li');
        child1.appendChild(document.createTextNode(Chats.data[i].message));
        if(i%2 === 0){
            child1.style.backgroundColor = '#ccc';
        }else{
            child1.style.backgroundColor = '#f4f4f4';
        }

        message1.appendChild(child1);
    }
})

// window.addEventListener('DOMContentLoaded',async () => {

   
//     const token = localStorage.getItem('token');

//     let Chats = 0;

//     const LocalData = JSON.parse(localStorage.getItem('Chat'));

//     if(LocalData === null){

//       Chats = await axios.get(`http://52.193.101.35:3000/chat/getChats?getFrom=${0}`,{ headers: {"Authorization": token}});


//      localStorage.setItem('Chat',JSON.stringify(Chats.data));

//     }
//     else{

//         console.log(LocalData.length);

//         while(LocalData.length > 10){
//             LocalData.shift();
//         }

//         localStorage.setItem('Chat',JSON.stringify(LocalData));

//         const getData = JSON.parse(localStorage.getItem('Chat'));

//         let id = 0;

//         for(let i=0; i<getData.length; i++){

//            if(getData[i].id > id){
//             id = getData[i].id;
//            }
//         }

//          Chats = await axios.get(`http://52.193.101.35:3000/chat/getChats?getFrom=${id}`,{ headers: {"Authorization": token}});

//     }

//     if(LocalData !== null){

//         for(let i=0; i<LocalData.length; i++){
        
//             const child1 = document.createElement('li');
//             child1.appendChild(document.createTextNode(LocalData[i].message));
//             if(i%2 === 0){
//                 child1.style.backgroundColor = '#ccc';
//             }else{
//                 child1.style.backgroundColor = '#f4f4f4';
//             }
    
//             message.appendChild(child1);
//         }
    
//     }
  
//     console.log(Chats.data);

//     for(let i=0; i<Chats.data.length; i++){
        
//         const child1 = document.createElement('li');
//         child1.appendChild(document.createTextNode(Chats.data[i].message));
//         if(i%2 === 0){
//             child1.style.backgroundColor = '#f4f4f4';
//         }else{
//             child1.style.backgroundColor = '#ccc';
//         }

//         message.appendChild(child1);
//     }
// })





// setInterval(async ()=>{
 
//     const token = localStorage.getItem('token');

//     message.innerHTML = '';

//         const Chats = await axios.get("http://52.193.101.35:3000/chat/getChats",{ headers: {"Authorization": token}});
    
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

document.getElementById('create').onclick = function(){
    
    window.location.href = './group-creation.html'
}

document.getElementById('join').onclick = JoinGroup;

window.addEventListener('DOMContentLoaded',async () => {

    try{

        const token = localStorage.getItem('token');

       const groups = await axios.get("http://52.193.101.35:3000/group/getGroups",{headers: {"Authorization": token}});

      // console.log(groups);


        for(let i=0; i<groups.data.length; i++){
         
            console.log(groups.data[i].groupName,groups.data[i].id);
            const button = document.createElement("button");
            
            button.innerHTML = groups.data[i].groupName;
            button.id = groups.data[i].id;
    
            button.addEventListener('click',()=>getAllMessages(groups.data[i].id));
            
            groupsName.appendChild(button);
           }
    }
        catch(error){
            console.log(error);
        }
    
});

async function getAllMessages(groupId){

   // console.log(groupId);
 try{

  while(message2.hasChildNodes()){
    message2.removeChild(message2.firstChild);
  }

    const token = localStorage.getItem('token');
    
    const chats = await axios.get(`http://52.193.101.35:3000/group/getAllMessages?groupId=${groupId}`,{headers: {"Authorization": token}});

   console.log(chats);

       for(let i=0; i<chats.data.length; i++){
        
        const child1 = document.createElement('li');
        child1.appendChild(document.createTextNode(chats.data[i].message));
        if(i%2 === 0){
            child1.style.backgroundColor = '#ccc';
        }else{
            child1.style.backgroundColor = '#f4f4f4';
        }

        message2.appendChild(child1);
    }

    const input = document.getElementById("group-message");
    input.type="text";

    const button = document.getElementById("button");
    button.style.visibility  = "visible";

    const form1 = document.querySelectorAll('form');
  //  console.log(form1[1]);
    form1[1].addEventListener('submit',async(e)=>{

            e.preventDefault();
            
            const chatty = e.target.chatty.value;
           
            const obj = {
                chat:chatty
            }

          const response = await axios.post(`http://52.193.101.35:3000/chat/addGroupChat?id=${groupId}`,obj, {headers: {"Authorization": token}})
          //console.log(response);
        });
    }
 catch(error){
    console.log(error);
 }
};
    
async function JoinGroup(){

window.location.href = './group-join.html';
    
}


window.addEventListener("DOMContentLoaded",async()=>{
   
    try{
      
        const token = localStorage.getItem('token');

        const response = await axios.get("http://52.193.101.35:3000/group/isAdmin",{headers: {"Authorization": token}});
       
        console.log(response);

        const groups =[];
        
        for(let i=0; i<response.data.length; i++){
            groups.push(response.data[i].GroupId);
        }

        localStorage.setItem('group',JSON.stringify(groups));

        if(response.data[0].Admin === '1'){

            const button = document.getElementById("Admin-button");
            button.style.visibility  = "visible";

            const form2 = document.querySelectorAll('form');
            
            form2[2].addEventListener("submit",async(e)=>{
             
                e.preventDefault();
                
                window.location.href = './admin.html';
            });
        }
    }
    catch(error){
        console.log(error);
    }
});
const groupsName = document.getElementById("groups");
const message = document.getElementById('message');

const form = document.querySelector('form');

form.addEventListener('submit',async(e)=>{

    try{
        e.preventDefault();

        const token = localStorage.getItem('token');
        const groupName = e.target.group.value;

        const obj = {
            group:groupName
        }

        const group = await axios.post("http://localhost:3000/group/createGroup",obj,{headers: {"Authorization": token}});

        window.location.href='./Chat-Window.html';
    }
     catch(error){
        console.log(error);
     }
});

// window.addEventListener('DOMContentLoaded',async () => {

//     try{

//         const token = localStorage.getItem('token');

//        const groups = await axios.get("http://localhost:3000/group/getGroups",{headers: {"Authorization": token}});

//        console.log(groups);

//        if(groups){
//         for(let i=0; i<groups.data.length; i++){
         
//             console.log(groups.data[i].groupName,groups.data[i].id);
//             const button = document.createElement("button");
            
//             button.innerHTML = groups.data[i].groupName;
//             button.id = groups.data[i].id;
    
//             button.addEventListener('click',()=>getAllMessages(groups.data[i].id));
            
//             groupsName.appendChild(button);
//            }
//         }
//     }
//         catch(error){
//             console.log(error);
//         }
    

// });

// async function getAllMessages(groupId){

//  try{
   
//     const token = localStorage.getItem('token');
    
//     const chats = await axios.get(`http://localhost:3000/group/getAllMessages?groupId=${groupId}`,{headers: {"Authorization": token}});

//        for(let i=0; i<chats.data.length; i++){
        
//         const child1 = document.createElement('li');
//         child1.appendChild(document.createTextNode(chats.data[i].message));
//         if(i%2 === 0){
//             child1.style.backgroundColor = '#ccc';
//         }else{
//             child1.style.backgroundColor = '#f4f4f4';
//         }

//         message.appendChild(child1);
//     }
// }
//  catch(error){
//     console.log(error);
//  }
// };
    
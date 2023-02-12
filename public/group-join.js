const groupsName = document.getElementById("groups");

window.addEventListener("DOMContentLoaded",async () => {
try{

    const token = localStorage.getItem('token');

   const groups = await axios.get("http://localhost:3000/group/getAllGroups",{headers: {"Authorization": token}});

   console.log(groups);


    for(let i=0; i<groups.data.length; i++){
     
        console.log(groups.data[i].groupName,groups.data[i].id);
        const button = document.createElement("button");
        
        button.innerHTML = groups.data[i].groupName;
        button.id = groups.data[i].id;

        button.addEventListener('click',()=>JoiningGroup(groups.data[i].id));
        
        groupsName.appendChild(button);
       }
}
    catch(error){
        console.log(error);
    }

});

async function JoiningGroup(id){

    try{
        const token = localStorage.getItem('token');

        const obj = {
            id:id
        }

       const response =  await axios.post("http://localhost:3000/group/joinGroup",obj,{headers: {"Authorization": token}});

       console.log(response);

       window.location.href='./Chat-Window.html';
    }
    catch(error){
     console.log(error);
    }
}
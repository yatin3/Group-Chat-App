const users = document.getElementById('users');

window.addEventListener("DOMContentLoaded",async()=>{
   
    try{
        const token = localStorage.getItem('token');
        const UserName = await axios.get("http://52.193.101.35:3000/user/getAllUsers",{headers: {"Authorization": token}});

        console.log(UserName);

        for(let i=0; i<UserName.data.length; i++){

            const child1 = document.createElement('li');
            const insert = UserName.data[i].name + UserName.data[i].id +UserName.data[i].email;
            child1.appendChild(document.createTextNode(insert ));
            if(i%2 === 0){
                child1.style.backgroundColor = '#ccc';
            }else{
                child1.style.backgroundColor = '#f4f4f4';
            }
    
            users.appendChild(child1);
        }
    }
    catch(error){
        console.log(error);
    }
});

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');

btn1.onclick = async function(){
  
    const input = document.getElementById("join");
    input.type = "text";

    const btn1 = document.getElementById("button1");
    btn1.style.visibility = 'visible';

}

const form = document.querySelectorAll('form');

form[0].addEventListener('submit',async(e)=>{
   
    try{
        e.preventDefault();

        const token = localStorage.getItem('token');
    
        const groups = JSON.parse(localStorage.getItem('group'));
        const groupId = groups[0];
        
        const userId = e.target.join.value;
    
        const obj = {
            groupId:groupId,
            userId:userId
        }
       
        await axios.post(`http://52.193.101.35:3000/group/AddUser`,obj,{headers: {"Authorization": token}});
        window.location.href = "Chat-Window.html";
    
    }
    catch(error){
        console.log(error);
    }

});

btn2.onclick = async function(){
  
    const input = document.getElementById("admin");
    input.type = "text";

    const btn2 = document.getElementById("button2");
    btn2.style.visibility = 'visible';

}

form[1].addEventListener('submit',async(e)=>{
   
    try{
        e.preventDefault();

        const token = localStorage.getItem('token');
    
        const groups = JSON.parse(localStorage.getItem('group'));
        const groupId = groups[0];
        
        const userId = e.target.admin.value;
    
        const obj = {
            groupId:groupId,
            userId:userId
        }
       
        await axios.post(`http://52.193.101.35:3000/group/makeAdmin`,obj,{headers: {"Authorization": token}});
    
    }
    catch(error){
        console.log(error);
    }

});

btn3.onclick = async function(){
  
    const input = document.getElementById("delete");
    input.type = "text";

    const btn3 = document.getElementById("button3");
    btn3.style.visibility = 'visible';

}

form[2].addEventListener('submit',async(e)=>{
   
    try{
        e.preventDefault();

        const token = localStorage.getItem('token');
    
        const groups = JSON.parse(localStorage.getItem('group'));
        const groupId = groups[1];
        
        const userId = e.target.delete.value;
    
        const obj = {
            groupId:groupId,
            userId:userId
        }
       
        await axios.post(`http://52.193.101.35:3000/group/deleteUser`,obj,{headers: {"Authorization": token}});

        window.location.href = 'Chat-Window.html';
    
    }
    catch(error){
        console.log(error);
    }

});




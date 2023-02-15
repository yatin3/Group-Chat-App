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


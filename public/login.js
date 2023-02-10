const form = document.querySelector('form');

form.addEventListener('submit',async(e)=>{

    try{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const obj = {
            email:email,
            password:password
        }

        console.log(obj);

        //await axios.post("http://localhost:3000/user/signup",obj);
    }
    catch(error){
      console.log(error);
    }
});
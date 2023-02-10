const form = document.querySelector('form');

form.addEventListener('submit',async(e)=>{
  
    try{
        e.preventDefault();
        const user = e.target.user.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const password = e.target.password.value;
    
      const obj = {
        user:user,
        email:email,
        phone:phone,
        password:password
      }
    
     const res =  await axios.post("http://localhost:3000/user/signup",obj);
      document.body.innerHTML =  document.body.innerHTML + ` ${res.data.message}`;

    }
    catch(err){
        console.log(err);
        document.body.innerHTML =  document.body.innerHTML + ` ${err}`;
    }
});
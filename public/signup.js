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

      window.alert("Successfully signed up");
      window.location.href = './login.html'

    }
    catch(err){
        console.log(err);
        document.body.innerHTML =  document.body.innerHTML + 'user already exist';
        window.alert("User already exists, Please Login");
    }
});

// const form = document.querySelector('form');

// form.addEventListener('submit',(e)=>{

//   e.preventDefault();

// const array = [{id:1,message:"hello"},{id:2,message:"yatin"}];
// localStorage.setItem('chat',JSON.stringify(array));
// window.location.href = './login.html'
// });
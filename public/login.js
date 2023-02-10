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

  const response = await axios.post("http://localhost:3000/user/login",obj);
  localStorage.setItem('token',response.data.token);
  window.location.href = './Chat-Window.html'
  console.log(response);
    }
    catch(error){
      console.log(error);
    }
});
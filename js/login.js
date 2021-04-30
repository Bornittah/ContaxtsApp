//login with api
let userName = document.querySelector('#user_name');
let password = document.querySelector('#pass_word');
let loginbutton = document.querySelector('#loginbutton'); 
const API_URL="https://truly-contacts.herokuapp.com/api"

loginbutton.addEventListener('click', (e)=>{
    loginbutton.value="Logging in..."
    let user={
        "username": userName.value,
		"password": password.value
    }
    let json_data=JSON.stringify(user);
   
   e.preventDefault();
   fetch(`${API_URL}/auth/login`,
   {
           method: "POST",
           headers: {'Content-Type': "application/json" },
           body:json_data
   }
   ).then((response)=>{
    response.json().then((data)=>{
        if(response.status===401){
            document.querySelector('#login_error').innerHTML= data.detail;
            loginbutton.value="Try again!"
        }
        if(response.status===200){
            window.location="index.html";
            localStorage.token=data.token;
            localStorage.user=json_data;
           
        }
    });
        
    }).catch((err)=>{
       console.log(err);
       });
});
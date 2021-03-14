//login with api
var user = document.querySelector('#user_name').value;
var pass = document.querySelector('#pass_word').value;
var loginbutton = document.querySelector('#loginbutton'); 
const API_URL="https://truly-contacts.herokuapp.com/api"

loginbutton.addEventListener('click', (e)=>{
    loginbutton.value="Checking data.."
e.preventDefault();
   fetch(`${API_URL}/auth/login`,
   {
           method: "POST"
   }
   ).then((response)=>{
    response.json().then((data)=>{
        if(response.status===401){
            document.querySelector('#login_error').innerHTML= data.detail;
            loginbutton.value="Try again!"
        }
    });
        
    }).catch((err)=>{
       console.log(err);
       });
});
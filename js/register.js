//register
		var username = document.querySelector('#username').value;
		var fname = document.querySelector('#first_name').value;
		var lname = document.querySelector('#last_name').value;
		var email = document.querySelector('#email').value;
		var pass = document.querySelector('#password').value; 

	   var registerbutton = document.querySelector('#register');
	   const API_URL="https://truly-contacts.herokuapp.com/api"

	   registerbutton.addEventListener('click', (e)=>{
		registerbutton.value="Saving data.."
	   e.preventDefault();
		   fetch(`${API_URL}/auth/register`,
		   {
				   method: "POST"
		   }
		   ).then((response)=>{
			response.json().then((data)=>{
				console.log("data", data)
				if(response.status===400){
					registerbutton.value="Failed to save"

					document.querySelector('#for_username').innerHTML=data.username;
					document.querySelector('#for_firstname').innerHTML=data.first_name;
					document.querySelector('#for_lastname').innerHTML=data.last_name;
					document.querySelector('#for_password').innerHTML=data.password;
					
				}
			});
				

			}).catch((err)=>{
			   console.log(err);
			   });
	   });


//register
		let userName = document.querySelector('#username');
		let firstName = document.querySelector('#first_name');
		let lastName = document.querySelector('#last_name');
		let email = document.querySelector('#email');
		let password = document.querySelector('#password');
		let registerbutton = document.querySelector('#register'); 

	
	   const API_URL="https://truly-contacts.herokuapp.com/api"

	   registerbutton.addEventListener('click', (e)=>{
		let user={
			"username": userName.value,
			"first_name": firstName.value,
			"last_name": lastName.value,
			"email": email.value,
			"password": password.value
		   };
		  
		console.log(user)
		registerbutton.value="Saving data.."
	    e.preventDefault();
		   fetch(`${API_URL}/auth/register`,{
		  method: "POST",
		   headers:
		   {
			'Content-Type': "application/json" 
		   },
		   body:JSON.stringify(user)
		}
		   ).then((response)=>{
			response.json().then((data)=>{
				console.log("data", data)
				if(response.status===400){
					registerbutton.value="Failed to save"

					document.querySelector('#for_username').innerHTML=data.username;
					document.querySelector('#for_firstname').innerHTML=data.first_name;
					document.querySelector('#for_lastname').innerHTML=data.last_name;
					document.querySelector('#for_email').innerHTML=data.email;
					document.querySelector('#for_password').innerHTML=data.password;
					
				}
				if(response.status===201){
					window.location="login.html";

				}
			});
				

			}).catch((err)=>{
			   console.log(err);
			   });
	   });


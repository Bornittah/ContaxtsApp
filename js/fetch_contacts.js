
const API="https://truly-contacts.herokuapp.com/api"

function display_contacts(){

    fetch(`${API}/contacts/`,
    {
            method: "GET",
            headers: {
             'Content-Type': "application/json",
             'Authorization': `Bearer ${localStorage.token}`
          }
    }
    ).then((response)=>{
     response.json().then((data)=>{
        //  console.log("data", data)
        //  console.log(data[0].first_name);
         let showDiv = document.querySelector('.listOfContacts');
         let contacts_length=document.querySelector('#numberOfContacts');
         if(data.length>0){
             let appendTo = '<table id="contacts">';
             for (let i = 0; i < data.length; i++) {
                 appendTo += `<tbody><tr class="contactlist-items" id='${i}' onclick='viewContact(${i})'><td>
                 <img class="profile-pic-list" src="${data[i].contact_picture}"></td><td>${data[i].first_name}<br>${data[i].phone_number}</td></tr>`;
             }
             showDiv.innerHTML = appendTo+"</tbody></table>";
     
             //show number of saved contacts
             if(data.length==1){
                 contacts_length.innerHTML=data.length + " Contact";
             }else{
                 contacts_length.innerHTML=data.length + " Contacts";
             }
                 
         }else {
             // no contacts
             showDiv.innerHTML = "No saved contacts";
             contacts_length.innerHTML=data.length + " Contacts";
         }
         if(response.status===201){}
         if(response.status===403){}
 
         if(response.status===400){}
     });
 
     }).catch((err)=>{
        console.log(err);
        });

}

// pop up for each contact
var popup = document.querySelector('.each-contact');
//close the popup
	  var close_details=document.getElementsByClassName("close-popup")[0];
	  close_details.onclick = function() {
			popup.style.display = "none";
			}
			window.onclick = function(event) { 
			if (event.target == popup) {
			    popup.style.display = "none";
			}
			}
// modal fields
let first_Name = document.querySelector('#cont_fname');
let last_Name = document.querySelector('#cont_lname');
let country_Code = document.querySelector('#tel_code');
let phone_Number = document.querySelector('#cont_phone');
let addContacButton = document.querySelector('#contacts_save');
const updateContactButton=document.getElementById('update_contact');

function viewContact(index){
	fetch(`${API}/contacts/`,
    {
            method: "GET",
            headers: {
             'Content-Type': "application/json",
             'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkJvcm5pIn0.aw5de6XIfZ2StUS42kZIlKLCznAmaMpe9eSZSZ9i_-8'
          }
    }
    ).then((response)=>{
     response.json().then((data)=>{
	    let id = index;
	// let showOne = document.getElementById(id);
	  	popup.style.display = "block";
	    document.getElementById('contactPicture').src=data[id].contact_picture;
        document.getElementById('firstName').innerHTML=data[id].first_name;
		document.getElementById('lastName').innerHTML=data[id].last_name;
		document.getElementById('countryCode').innerHTML=data[id].country_code;
		document.getElementById('phoneNumber').innerHTML=data[id].phone_number;
		
	// when the edit button is clicked, show the modal
		let edit=document.getElementById('edit_contact');
		edit.onclick=function(){
			updatecontact.style.display="block";
			addContacButton.style.display="none"
		    modal.style.display = "block";
			popup.style.display = "none";
			
            first_Name.value=data[id].first_name;
			last_Name.value=data[id].last_name;
			country_Code.value=data[id].country_code;
			phone_Number.value=data[id].phone_number;
			image.src=data[id].contact_picture;

			updatecontact.addEventListener('click', function(e){
				e.preventDefault();
				  // confirm
				  if (confirm("Are you sure, you want to do these changes? ")) {
				// get form data
				let updatedcontact = {
					"country_code":countryCode.value,
					"id":data[id].id,
					"first_name":firstName.value,
					"last_name":lastname.value,
					"phone_number": telePhone.value,
					"contact_picture":image.src,
					"is_favorite":true
						
					}

					data[id] = updatedcontact;
					modal.style.display = "none";
					//update
			fetch(`${API_URL}/contacts/${id}`,
		{
				method: "PUT",
				headers: {
					'Content-Type': "application/json",
					'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkJvcm5pIn0.aw5de6XIfZ2StUS42kZIlKLCznAmaMpe9eSZSZ9i_-8'
				},
				body:JSON.stringify(data)
		}
		).then((response)=>{
			response.json().then((data)=>{

				
				if(response.status===201){
					// display_contacts();
					console.log("data", data)
					modal.style.display = "none";
				}
				if(response.status===403){
					document.querySelector('#saving_status').innerHTML= "Contact not saved!";
					document.querySelector('#login_error').innerHTML= data.detail;
				}
				if(response.status===404){
					console.log(data.details);
				}
				if(response.status===400){
					document.querySelector('#for_fname').innerHTML=data.first_name;
					document.querySelector('#for_lname').innerHTML=data.last_name;
					document.querySelector('#for_code').innerHTML=data.country_code;
					document.querySelector('#for_phone').innerHTML=data.phone_number;
				}
				
			});
				

			}).catch((err)=>{
			console.log(err);
			});
						} else {
						//dont update
						modal.style.display = "none";
						}
						
					});

				}
		// when delete button is clicked
		 	let deletecontact=document.getElementById("delete");
			deletecontact.onclick=function(){
			if (confirm("You are about to delete this contact, Do you want to continue? ")) {
			contact.splice(id, 1);
			localStorage.setItem('Contacts',JSON.stringify(contact));
			popup.style.display = "none";
			}else{
				popup.style.display = "none";
			}
		}

		//when favourate button is clicked
		let addfavourite=document.getElementById("favourite");
		addfavourite.onclick=function(){
			let favourite_contact=JSON.parse(localStorage.getItem('Favourites'));
			if(favourite_contact==null){
				localStorage.setItem('Favourites', '[]');
				let empty_fav=[];
				empty_fav.push('empty');
			}else{
				modal.style.display = "none";
				let new_favourite=JSON.parse(localStorage.getItem('Favourites'));
				new_favourite.push(contact[id]);
				localStorage.setItem('Favourites', JSON.stringify(new_favourite));
				// console.log(new_favourite);
			}
			   
		}
	});
	}).catch((err)=>{
        console.log(err);
        });
}

window.addEventListener('load', ()=>{
	display_contacts();
});
let firstName = document.querySelector('#cont_fname');
let lastname = document.querySelector('#cont_lname');
let countryCode = document.querySelector('#tel_code');
let telePhone = document.querySelector('#cont_phone');
let addcontacts = document.querySelector('#contacts_save');
const updatecontact=document.getElementById('update_contact');
const API_URL="https://truly-contacts.herokuapp.com/api";

//open modal
let modal = document.getElementById('contact-modal');
let openModal = document.getElementById('open_contactmodal');
let span = document.getElementsByClassName("close")[0];
openModal.onclick = function() {
	modal.style.display = "block";
	updatecontact.style.display="none";
	addcontacts.style.display="block"
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 

//display contact
// upload aprofile picture
// declaring profile pic html elements
const imagediv=document.querySelector('.profile_pic');
const image=document.querySelector('#photo');
const file=document.querySelector('#file');
const img_label=document.querySelector('#uploadpic');
 // when a file is chosen
 file.addEventListener('change', function(e){
	e.preventDefault();
 	const img=this.files[0];
 	if(img){
 		const reader = new FileReader();
 		reader.addEventListener('load', function(){
 			image.setAttribute('src', reader.result);
 		});
 		reader.readAsDataURL(img);
 	}


 });

addcontacts.addEventListener('click', (e)=>{
    let contact_details={
        // "photo":img,
        "contact_picture":image.src,
        "id":"",
        "first_name":firstName.value,
        "last_name":lastname.value,
        "country_code":countryCode.value,
        "phone_number": telePhone.value,
        "is_favorite":true

}
addcontacts.value="Saving data.."
e.preventDefault();

   fetch(`${API_URL}/contacts/`,
   {
           method: "POST",
           headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkJvcm5pIn0.aw5de6XIfZ2StUS42kZIlKLCznAmaMpe9eSZSZ9i_-8'
         },
           body:JSON.stringify(contact_details)
   }
   ).then((response)=>{
    response.json().then((data)=>{

        console.log("data", data)
        if(response.status===403){
            document.querySelector('#saving_status').innerHTML= "Contact not saved!";
            document.querySelector('#login_error').innerHTML= data.detail;
        }

        if(response.status===400){
            document.querySelector('#for_fname').innerHTML=data.first_name;
            document.querySelector('#for_lname').innerHTML=data.last_name;
            document.querySelector('#for_code').innerHTML=data.country_code;
            document.querySelector('#for_phone').innerHTML=data.phone_number;
        }
        if(response.status===201){
            modal.style.display = "none";
        }
    });
        

    }).catch((err)=>{
       console.log(err);
       });
});

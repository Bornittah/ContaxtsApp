var username = document.querySelector('#cont_fname').value;
var fname = document.querySelector('#cont_lname').value;
var lname = document.querySelector('#tel_code').value;
var email = document.querySelector('#cont_phone').value;
var addcontacts = document.querySelector('#contacts_save');
const updatecontact=document.getElementById('update_contact');
const API_URL="https://truly-contacts.herokuapp.com/api"
//open modal
var modal = document.getElementById('contact-modal');
var openModal = document.getElementById('open_contactmodal');
var span = document.getElementsByClassName("close")[0];
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
addcontacts.value="Saving data.."
e.preventDefault();
   fetch(`${API_URL}/contacts/`,
   {
           method: "POST"
   }
   ).then((response)=>{
    response.json().then((data)=>{
        console.log("data", data)
        if(response.status===403){
            addcontacts.value="Failed to save"
            document.querySelector('#login_error').innerHTML= data.detail;
            // document.querySelector('#for_fname').innerHTML=data.first_name;
            // document.querySelector('#for_lname').innerHTML=data.last_name;
            // document.querySelector('#for_code').innerHTML=data.country_code;
            // document.querySelector('#for_phone').innerHTML=data.phone_number;
            
        }
    });
        

    }).catch((err)=>{
       console.log(err);
       });
});

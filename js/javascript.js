 // save contacts section
 const name=document.getElementById('cont_name');
 const phone=document.getElementById('cont_phone');
 const email=document.getElementById('cont_email');
 const address=document.getElementById('cont_address');
 const birthday=document.getElementById('cont_birthday');
 const savecontact_btn=document.getElementById('cont_save');
 const updatecontact=document.getElementById('update_contact');
// modal
var modal = document.getElementById('contact-modal');
var openModal = document.getElementById('open_contactmodal');
var span = document.getElementsByClassName("close")[0];
openModal.onclick = function() {
	modal.style.display = "block";
	updatecontact.style.display="none";
	savecontact_btn.style.display="block"
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//when add contacts is clicked
		savecontact_btn.addEventListener('click', function(e){
			e.preventDefault();
			//create an object
			var person={
				Name:name.value,
				Phone:phone.value,
				Email:email.value,
				Address:address.value,
				Birthday:birthday.value,
				Profile:image.src
			};
			var data=JSON.parse(localStorage.getItem('Contacts'));
			if(data==null){
				localStorage.setItem('Contacts', '[]');
				var emptyContacts=[];
				emptyContacts.push('empty');
			}
			   modal.style.display = "none";
				var new_contact=JSON.parse(localStorage.getItem('Contacts'));
				new_contact.push(person);
				// new_contact.sort();
				localStorage.setItem('Contacts', JSON.stringify(new_contact));
				document.getElementById("cont").innerHTML = new_contact;
					});

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

function displaycontacts(){
	var contact=JSON.parse(localStorage.getItem('Contacts'));
	var showDiv = document.querySelector('.listOfContacts');
	var contacts_length=document.querySelector('#numberOfContacts');
	if(contact.length>0){
		var appendTo = '<table id="contacts">';
		for (var i = 0; i < contact.length; i++) {
			appendTo += `<tr class="contactlist-items" id='${i}' onclick='viewContact(${i})'><td>
			<img class="profile-pic-list" src="${contact[i].Profile}"></td><td>${contact[i].Name}<br>${contact[i].Phone}</td></tr>`;
		}
		showDiv.innerHTML = appendTo+"</table>";

		//show number of saved contacts
		if(contact.length==1){
			contacts_length.innerHTML=contact.length + " Contact";
		}else{
			contacts_length.innerHTML=contact.length + " Contacts";
		}
			
	}else {
		// no contacts
		showDiv.innerHTML = "No saved contacts";
		contacts_length.innerHTML=contact.length + " Contacts";
	}
	
}
setInterval(displaycontacts, 1000);
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
function viewContact(index){
	var id = index;
	var contact=JSON.parse(localStorage.getItem('Contacts'));
	var showOne = document.getElementById(id);

	  popup.style.display = "block";
	  document.getElementById('ctProfile').src=contact[id].Profile;
        document.getElementById('ctName').innerHTML=contact[id].Name;
		document.getElementById('ctPhone').innerHTML=contact[id].Phone;
		document.getElementById('ctEmail').innerHTML=contact[id].Email;
		document.getElementById('ctAddress').innerHTML=contact[id].Address;
		document.getElementById('ctBirthday').innerHTML=contact[id].Birthday;
	// when the edit button is clicked, show the modal
		var edit=document.getElementById('edit_contact');
		edit.onclick=function(){
			updatecontact.style.display="block";
			savecontact_btn.style.display="none"
		    modal.style.display = "block";
			popup.style.display = "none";
			
		   name.value=contact[id].Name;
			phone.value=contact[id].Phone;
			email.value=contact[id].Email;
			address.value=contact[id].Address;
			birthday.value=contact[id].Birthday;
			image.src=contact[id].Profile;

			updatecontact.addEventListener('click', function(e){
				e.preventDefault();
				  // confirm
				  if (confirm("Are you sure, you want to do these changes? ")) {
				// get form data
				var newperson = {
					Name:name.value,
					Phone:phone.value,
					Email:email.value,
					Address:address.value,
					Birthday:birthday.value,
					Profile:image.src
					}

					contact[id] = newperson;
					localStorage.setItem('Contacts',JSON.stringify(contact));
					modal.style.display = "none";
				} else {
				//dont update
				modal.style.display = "none";
				}
				
			});

		}
		// when delete button is clicked
		var deletecontact=document.getElementById("delete");
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
		var addfavourite=document.getElementById("favourite");
		addfavourite.onclick=function(){
			var favourite_contact=JSON.parse(localStorage.getItem('Favourites'));
			if(favourite_contact==null){
				localStorage.setItem('Favourites', '[]');
				var empty_fav=[];
				empty_fav.push('empty');
			}else{
				modal.style.display = "none";
				var new_favourite=JSON.parse(localStorage.getItem('Favourites'));
				new_favourite.push(contact[id]);
				localStorage.setItem('Favourites', JSON.stringify(new_favourite));
				// console.log(new_favourite);
			}
			   
		}
 
}





// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCWgi8w2yoYXagg-QxopN03HtGMLsKMtOQ",
  authDomain: "projectapplication-8be05.firebaseapp.com",
  databaseURL: "https://projectapplication-8be05.firebaseio.com",
  projectId: "projectapplication-8be05",
  storageBucket: "projectapplication-8be05.appspot.com",
  messagingSenderId: "505061046411",
  appId: "1:505061046411:web:7ba970d3eca865adcd3c8e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// console.log(firebase);
let ref=firebase.database().ref("Contacts");

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

// upload aprofile picture
// declaring profile pic html elements
const imagediv=document.querySelector('.profile_pic');
const image=document.querySelector('#photo');
const file=document.querySelector('#file');
const img_label=document.querySelector('#uploadpic');

function uploadImage(image){
let ref=firebase.storage().ref('Images/'+ new Date().getTime().toString()+ image.name );
let uploadTask = ref.put(image);
uploadTask.on('state_changed',function(snapshot){
    
}, function(error){

}, 
function(){
    ref.getDownloadURL().then(
        function(data){
            console.log(data);
            localStorage.setItem('image', data);
        }
    ).catch(
        function(error){
            console.log(error);
        }
    );
    

});
}
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

     uploadImage(img);
 }


});

function sendToBackEnd(data){
fetch(`${API_URL}/contacts/`,
{
       method: "POST",
       headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${localStorage.token}`
     },
       body:JSON.stringify(data)
}
).then((response)=>{
response.json().then((data)=>{

    // console.log("data", data)
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
        localStorage.removeItem('image');
        fetchdata();
    }
});
    

}).catch((err)=>{
   console.log(err);
   });


}
addcontacts.addEventListener('click', (e)=>{
  e.preventDefault();
 let contact_details={
    "contact_picture":localStorage.image,
    "first_name":firstName.value,
    "last_name":lastname.value,
    "country_code":countryCode.value,
    "phone_number": telePhone.value,
    "is_favorite":false

}
addcontacts.value="Saving data.."
console.log(image.src);

sendToBackEnd(contact_details);

});

function fetchdata(){
ref.on('value', function(snapshot){
    snapshot.forEach(
        function(ChildSnapshot){
            let name = ChildSnapshot.val().first_name;
            let pic = ChildSnapshot.val().contact_picture;
            // console.log(name)

        }
    );
});
}

window.addEventListener('load',()=>{
fetchdata();
            });

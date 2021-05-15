
const API="https://truly-contacts.herokuapp.com/api";
let contacts_length=document.querySelector('#numberOfFavorites');
function displayFavorites(){

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
        let favouriteList = document.querySelector('#myfavourites');
         if(data.length>0){
			//  console.log(data[i].first_name)
            let append = '<table id="contacts">';
            for (let i = 0; i < data.length; i++) {
                if(data[i].is_favorite===true){
                append += `<tbody><tr class="contactlist-items"><td style="text-align:center; margin:0 auto;">
                <img class="profile-pic-list" src="${data[i].contact_picture}"></td><td> ${data[i].first_name}<br>${data[i].phone_number}</td><td><button class="removeFavourite"><img src="images/remove-icon.png" id='remove_fav' onclick='delete_fav(${data[i].id},${data[i].is_favorite})'style="width: 20px"></button></td></tr>`;
            }

            }
            favouriteList.innerHTML =append+"<tbody></table>";
     
             //show number of saved contacts
             if(data.length==1){
                 contacts_length.innerHTML=`${data.length}  Contact`;
             }else{
                 contacts_length.innerHTML=`${data.length}  Contacts`;
             }
              
         }else {
             // no contacts
             favouriteList.innerHTML = "No saved contacts";
             contacts_length.innerHTML=data.length + " Contacts";
         }
         if(response.status===201){
			 
		 }
         if(response.status===403){
			 
		 }
 
         if(response.status===400){

		 }
     });
 
     }).catch((err)=>{
        console.log(err);
        });

}
window.addEventListener('load',()=>{
    displayFavorites();

    });

// window.addEventListener('load',()=>{
//     let fav=JSON.parse(localStorage.getItem('Favourites'));
//     let cl = document.querySelector('#myfavourites');
//         if(fav.length>0){
//             let append = '<table id="contactslists">';
//             for (let i = 0; i < fav.length; i++) {
//                 append += `<tr class="contactlist-items"><td><button class="removeFavourite"><img src="images/remove-icon.png"  id='remove_fav' onclick='delete_fav(${i})'style="width: 20px"></button></td><td style="text-align:center; margin:0 auto;">
//                 <img class="profile-pic-list" src="${fav[i].Profile}"></td><td> ${fav[i].Name}
//                 </td></tr>`;
//             }
//             cl.innerHTML =append+"</table>";
//         }else {
//             // no contacts
//         //         document.querySelector("#noContacts").style.display="block";
//         cl.innerHTML ="No favourite contact added yet!";
//        }
      

//     });
      
    function delete_fav(index, is_favorite){
        // confirm
        // if (confirm("Do you want to delete this contact from your favourites? ")) {
        //     //delete the contact
            let id, favorite;
            id=index;
            favorite=is_favorite;
        //    id.is_favorite===false;
        //    displayFavorites();
        // } else {
        // //dont delete
        // } 
        if(favorite==true){
           favorite=false;
           displayFavorites();
           
        }
            console.log(id,favorite);
    }
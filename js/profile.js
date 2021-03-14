//profile menu
var pmenu = document.querySelector('.profile-menu');
//close the popup
	  var close_menu=document.getElementsByClassName("close_profile_menu")[0];
	  close_menu.onclick = function() {
			pmenu.style.display = "none";
			}
			window.onclick = function(event) { 
			if (event.target == pmenu) {
			    pmenu.style.display = "none";
			}
			}
function profile_menu(){
var menu_list=document.querySelector(".profile-menu");
menu_list.style.display = 'block'
}
// close user details when a close span is clicked
	var user_profile=document.querySelector(".show-user-profile");
//close the popup
	  var close_details=document.getElementsByClassName("close_userdetails")[0];
	  close_details.onclick = function() {
			user_profile.style.display = "none";
			}
			window.onclick = function(event) { 
			if (event.target == user_profile) {
			    user_profile.style.display = "none";
			}
			}
// when my profile is clicked
function myprofile(){
	user_profile.style.display = 'block'
	var user=JSON.parse(localStorage.getItem('User'));
	document.getElementById('profile_name').innerHTML=user.fullName;
	document.getElementById('profile_phone').innerHTML=user.phone;
	document.getElementById('profile_email').innerHTML=user.email;
	document.getElementById('profile_password').value=user.password;
}
//when logout is clicked
function logout_user(){
	var logout_clicked=document.querySelector(".logout");

}
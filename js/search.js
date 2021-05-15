    // search bar
	function search_function(){
		const searchli=document.getElementById('searchcontacts');
			let searchbar = searchli.value.toUpperCase();
			// console.log(searchbar);
			let contactlist = document.querySelector('#contacts');
			let mysearch=contactlist.getElementsByTagName('tr');
		
			for (let i = 0; i < mysearch.length; i++) {
				let searchResult=mysearch[i].getElementsByTagName('td')[1];
				if(searchResult){
					let searchvalue=searchResult.textContent || searchResult.innerHTML;
					if(searchvalue.toUpperCase().indexOf(searchbar) > -1){
						mysearch[i].style.display="";
		
					}else{
						mysearch[i].style.display="none";
					}
				}
				
			}
		}
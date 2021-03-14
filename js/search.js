
window.addEventListener('load',()=>{
    var cont=JSON.parse(localStorage.getItem('Contacts'));
    var cl = document.querySelector('#mycontactlist');
        if(cont.length>0){
            var append = '<table id="contactslists">';
            for (var i = 0; i < cont.length; i++) {
                append += `<tr class="contactlist-items"><td style="text-align:center; margin:0 auto;">
                <img class="profile-pic-list" src="${cont[i].Profile}"></td><td> ${cont[i].Name}
                </td></tr>`;
                // console.log(cont[i].Name);
            }
            cl.innerHTML =append+"</table>";
        }else {
            // no contacts
                document.querySelector("#noContacts").style.display="block";
        }
        

    });

    // search bar
function search_function(){
    const searchli=document.getElementById('searchcontacts');
        let searchbar = searchli.value.toUpperCase();
        // console.log(searchbar);
        let contactlist = document.querySelector('#contactslists');
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
    
    
const url = "./" + window.location.href.split('/')[5];

function resaltarNavbarItem(){
    navbarItems.forEach(item => {
        if(item.firstChild.getAttribute("href") == url){
            item.classList.add("active");
        }
    })
}

resaltarNavbarItem();


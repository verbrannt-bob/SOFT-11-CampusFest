const url = "./" + window.location.href.split('/')[5];
console.log(url);
console.log(navbarItems);
function resaltarNavbarItem(){
    navbarItems.forEach(item => {
        console.log(item.firstChild.getAttribute("href"));
        if(item.firstChild.getAttribute("href") == url){
            item.classList.add("active");
        }
    })
}

resaltarNavbarItem();


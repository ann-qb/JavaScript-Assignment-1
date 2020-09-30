const menuBtn = document.querySelector('#menu-btn');
menuBtn.addEventListener('click', dropDownMenu);

//Responsive menu
function dropDownMenu() {
    const navMenu = document.querySelector('#nav');
    if (navMenu.style.display === 'none') {
        navMenu.style.display = 'block';
    } else {
        navMenu.style.display = 'none';
    }
}
const menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', dropDownMenu);

//Responsive menu
function dropDownMenu() {
    const navMenu = document.getElementById('nav');
    if (navMenu.style.display === 'none') {
        navMenu.style.display = 'block';
    } else {
        navMenu.style.display = 'none';
    }
}
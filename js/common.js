const menuBtn = document.querySelector('#menu-btn');
menuBtn.addEventListener('click', toggleDropDownMenu);

//Function to toggle display of responsive dropdown menu
function toggleDropDownMenu() {
    const navMenu = document.querySelector('#nav');
    if (navMenu.style.display === 'none') {
        navMenu.style.display = 'block';
    } else {
        navMenu.style.display = 'none';
    }
}
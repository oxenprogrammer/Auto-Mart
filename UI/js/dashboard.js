/*jshint esversion: 6 */
function onSideMenu() {
    const sideMenu = document.querySelector('#side-menu');
    sideMenu.style.width = '250px';
    const main = document.querySelector('#main');
    main.style.marginLeft = '250px';
    const navbar = document.querySelector('.navbar');
    navbar.style.marginLeft = '250px';
}

function offSideMenu() {
    const sideMenu = document.querySelector('#side-menu');
    sideMenu.style.width = '0px';
    const main = document.querySelector('#main');
    main.style.marginLeft = '0px';
    const navbar = document.querySelector('.navbar');
    navbar.style.marginLeft = '0px';
}
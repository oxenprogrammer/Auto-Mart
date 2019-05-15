/*jshint esversion: 6 */
function onSideMenu() {
    const mobile = window.matchMedia('@media(max-width: 568px)');
    const sideMenu = document.querySelector('#side-menu');
    sideMenu.style.width = '250px';
    const main = document.querySelector('#main');
    if (mobile) {
        main.style.marginLeft = '250px';
    } else {
        main.style.marginLeft = '120px';
    }
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

const togglePostAd = () => {
    const postAd = document.querySelector('#post-ad');
    const postAdList = document.querySelector('#post-ad-list');
    postAd.style.display = 'flex';
    postAdList.style.display = 'none';
};

const togglePostAdList = () => {
    const postAd = document.querySelector('#post-ad');
    const postAdList = document.querySelector('#post-ad-list');
    postAd.style.display = 'none';
    postAdList.style.display = 'flex';
    postAdList.style.marginLeft = '250px';
};
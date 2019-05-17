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
    const purchaseOrderList = document.querySelector('#purchase-order-list');
    const postAd = document.querySelector('#post-ad');
    const postAdList = document.querySelector('#post-ad-list');
    postAd.style.display = 'flex';
    postAdList.style.display = 'none';
    purchaseOrderList.style.display = 'none';
};

const togglePostAdList = () => {
    const postAd = document.querySelector('#post-ad');
    const purchaseOrderList = document.querySelector('#purchase-order-list');
    const postAdList = document.querySelector('#post-ad-list');
    postAd.style.display = 'none';
    purchaseOrderList.style.display = 'none';
    postAdList.style.display = 'flex';
    postAdList.style.marginLeft = '250px';
};

const togglePurchaseOrderList = () => {
    const purchaseOrderList = document.querySelector('#purchase-order-list');
    const postAd = document.querySelector('#post-ad');
    const postAdList = document.querySelector('#post-ad-list');
    purchaseOrderList.style.display = 'flex';
    postAd.style.display = 'none';
    postAdList.style.display = 'none';
    postAdList.style.marginLeft = '250px';
};

const toggleMyPurchaseOrder = () => {
    const myPurchaseOrderList = document.querySelector('#my-purchase-list');
    const headerPurchaseOrder = document.querySelector('.header-purchase-order');
    const headerAd = document.querySelector('#header-ad');
    const search = document.querySelector('#search');
    // const postAd = document.querySelector('#post-ad');
    const postAdList = document.querySelector('#post-ad-list-buyer');
    myPurchaseOrderList.style.display = 'flex';
    headerPurchaseOrder.style.display = 'flex';
    // postAd.style.display = 'none';
    headerAd.style.display = 'none';
    search.style.display = 'none';
    postAdList.style.display = 'none';
    postAdList.style.marginLeft = '250px';
};

const sold = () => {
    const soldout1 = document.querySelector('.sold1');
    const soldout2 = document.querySelector('.sold2');
    const soldout3 = document.querySelector('.sold3');
    const soldout4 = document.querySelector('.sold4');
    const soldStatus = document.querySelector('#sold-status');
    const soldLink = document.querySelector('#sold');
    // const content = document.createTextNode('Sold');
    soldStatus.innerHTML = 'Sold';
    soldLink.innerHTML = 'Sold';
    soldStatus.style.color = 'green';
    soldLink.style.background = 'green';
    soldout1.style.background = 'green';
    soldout1.innerHTML = 'SOLD OUT';
    soldout1.style.color = 'white';
};

const markFraud = () => {
    const fraud = document.querySelector('.fraud');
    fraud.innerHTML = 'Fraudulent';
    fraud.style.color = 'red';
    const fraudLink = document.querySelector('#fraud');
    fraudLink.style.background = 'red';
    fraudLink.innerHTML = 'Flagged as Fraudulent';
    fraudLink.style.color = 'white';
};
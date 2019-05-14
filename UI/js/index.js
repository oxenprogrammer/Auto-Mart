/*jshint esversion: 6 */
const toggleLogin = () => {
    const signup = document.querySelector('#signup');
    const login = document.querySelector('#login');
    login.style.display = 'flex';
    signup.style.display = 'none';
};

const toggleSignup = () => {
    const signup = document.querySelector('#signup');
    const login = document.querySelector('#login');
    login.style.display = 'none';
    signup.style.display = 'flex';
};

const signup = document.querySelector('.signup');
const login = document.querySelector('.login');

signup.addEventListener('click', toggleSignup);
login.addEventListener('click', toggleLogin);
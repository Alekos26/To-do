const themeBtn = document.getElementById('theme-switcher');
const navBar = document.getElementById('navbarNav');

const changeTheme = () => {
    document.querySelector('body').classList.toggle('light');
    const themeImg = this.children[0];
    themeImg.setAttribute(
        'src',
        themeImg.getAttribute('src') === './assets/images/icon-sun.svg'
            ? './assets/images/icon-moon.svg'
            : './assets/images/icon-sun.svg'
    );
};



themeBtn.addEventListener('click', changeTheme);

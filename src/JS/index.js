document.addEventListener('DOMContentLoaded', function () {

    // Burger menu (Header)
    
    class MainMenu {
        constructor() {
            this.menu = document.querySelector('.main-menu');
            this.body = document.body;
            this.menuBtn = document.querySelectorAll('.main-menu-btn');
        }

        openMenu = (e) => {
            this.menu.classList.add('show');
            this.body.classList.add('lock');
            e.target.classList.add('collapsed');
        }

        closeMenu = (e) => {
            this.menu.classList.remove('show');
            this.body.classList.remove('lock');
            e.target.classList.remove('collapsed');
        }

        render () {
            this.menuBtn.forEach(element => {
                element.addEventListener('click', (e) => {
                    if (this.menu.classList.contains('show')) {
                        this.closeMenu(e);
                    } else {
                        this.openMenu(e);
                    }
                })
            })
        }
    }

    const mainMenuInstance = new MainMenu();
    mainMenuInstance.render();

    // home-offer slider
    
    if (document.querySelector('.home-offer__slider')) {
        $('.home-offer__slider').slick({
            slidesToShow: 1,
            dots: true,
            arrows: false,
            dotsClass: 'home-offer__slider-dots'
        })
    }

    // home-partners slider 

    if (document.querySelector('.home-partners__slider')) {
        $('.home-partners__slider').slick({
            slidesToShow: 4,
            dots: false,
            arrows: true,
            prevArrow: `<button class="slick-prev slick-arrow home-partners__arrow"><svg class="home-partners__prev slick-prev__icon"><use xlink:href='svg/dest/stack/sprite.svg#arrow-left'></use></svg></button>`,
            nextArrow: `<button class="slick-next slick-arrow home-partners__arrow"><svg class="home-partners__next slick-next__icon"><use xlink:href='svg/dest/stack/sprite.svg#arrow-left'></use></svg></button>`,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        })
    } 

    // Adaptive 768

    if (window.screen.width < 768) {
        // home-categories slider

        $('.home-categories__items').slick({
            slidesToShow: 1,
            prevArrow: `<button class="slick-prev slick-arrow"><svg class="slick-prev__icon"><use xlink:href='svg/dest/stack/sprite.svg#arrow-left'></use></svg></button>`,
            nextArrow: `<button class="slick-next slick-arrow"><svg class="slick-next__icon"><use xlink:href='svg/dest/stack/sprite.svg#arrow-left'></use></svg></button>`
        })
    }
});
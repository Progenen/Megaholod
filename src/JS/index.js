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

        render() {
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


    // map
    map();

    // Adaptive 768
    if (window.screen.width < 768) {
        // home-categories slider

        $('.home-categories__items').slick({
            slidesToShow: 1,
            prevArrow: `<button class="slick-prev slick-arrow"><svg class="slick-prev__icon"><use xlink:href='svg/dest/stack/sprite.svg#arrow-left'></use></svg></button>`,
            nextArrow: `<button class="slick-next slick-arrow"><svg class="slick-next__icon"><use xlink:href='svg/dest/stack/sprite.svg#arrow-left'></use></svg></button>`
        })
    }

    // Validation

    $('#modalForm').validate({
        rules: {
            email: {
                required: true,
            },
            name: {
                required: true,
            },
            phone: {
                required: true
            },
            terms: "required"
        },
        messages: {
            email: "Ввведите корректный email",
            name: "Введите корректное имя",
            phone: "Введите корректный номер",
            terms: ''
        },
        errorPlacement: function (error, element) {
            if (element.attr("type") === "checkbox") {
                error.insertAfter('');
            } else {
                error.insertAfter(element);
            }
        }
    });
    
    $('#modalFormProduct').validate({
        rules: {
            email: {
                required: true,
            },
            name: {
                required: true,
            },
            phone: {
                required: true
            },
            terms: "required"
        },
        messages: {
            email: "Ввведите корректный email",
            name: "Введите корректное имя",
            phone: "Введите корректный номер",
            terms: ''
        },
        errorPlacement: function (error, element) {
            if (element.attr("type") === "checkbox") {
                error.insertAfter('');
            } else {
                error.insertAfter(element);
            }
        }
    })

    // functions 
    function map(image) {
        if (document.querySelector("#map-yandex")) {
            
            const mapSelector = document.querySelector('#map-yandex');
            //Переменная для включения/отключения индикатора загрузки
            var spinner = document.querySelector('.ymap-container .loader');
            //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
            var check_if_load = false;
            //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
            var myMapTemp, myPlacemark;

            //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
            function init() {
                myMapTemp = new ymaps.Map('map-yandex', {
                    // При инициализации карты обязательно нужно указать
                    // её центр и коэффициент масштабирования.
                    center: mapSelector.getAttribute('data-map-pos').split(', '), // Москва
                    zoom: mapSelector.getAttribute('data-map-zoom'),
                    controls: []
                }, {
                    searchControlProvider: 'yandex#search'
                });
                myPlacemark = new ymaps.Placemark(myMapTemp.getCenter(), {
                    hintContent: 'Собственный значок метки',
                    balloonContent: 'Это красивая метка'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: image,
                    // Размеры метки.
                    iconImageSize: [50, 72],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-5, -38]
                });
                myMapTemp.geoObjects.add(myPlacemark)

                // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
                var layer = myMapTemp.layers.get(0).get(0);

                // Решение по callback-у для определения полной загрузки карты
                waitForTilesLoad(layer).then(function () {
                    // Скрываем индикатор загрузки после полной загрузки карты
                    spinner.classList.remove('is-active');
                });
            }

            // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
            function waitForTilesLoad(layer) {
                return new ymaps.vow.Promise(function (resolve, reject) {
                    var tc = getTileContainer(layer), readyAll = true;
                    Array.prototype.forEach.call(tc.tiles, function (tile) {
                        console.log('foreach: ' + tile);
                        if (!tile.isReady()) {
                            readyAll = false;
                        }
                    })
                    if (readyAll) {
                        resolve();
                    } else {
                        tc.events.once("ready", function () {
                            resolve();
                        });
                    }
                });
            }

            function getTileContainer(layer) {
                for (var k in layer) {
                    if (layer.hasOwnProperty(k)) {
                        if (
                            layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                            || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                        ) {
                            return layer[k];
                        }
                    }
                }
                return null;
            }

            // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
            function loadScript(url, callback) {
                var script = document.createElement("script");

                if (script.readyState) {  // IE
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" ||
                            script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                } else {  // Другие браузеры
                    script.onload = function () {
                        callback();
                    };
                }

                script.src = url;
                document.getElementsByTagName("head")[0].appendChild(script);
            }

            // Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
            var ymap = function () {
                document.querySelector('.ymap-container').addEventListener('mouseenter', function () {
                    if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                        // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                        check_if_load = true;

                        // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                        spinner.classList.add('is-active');

                        // Загружаем API Яндекс.Карт
                        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=9c9066f4-2079-4b71-b871-46dbea21ece3", function () {
                            // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                            ymaps.load(init);
                        });
                    }
                });

                document.querySelector('.ymap-container').addEventListener('click', function () {
                    if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                        // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                        check_if_load = true;

                        // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                        spinner.classList.add('is-active');

                        // Загружаем API Яндекс.Карт
                        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=9c9066f4-2079-4b71-b871-46dbea21ece3", function () {
                            // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                            ymaps.load(init);
                        });
                    }
                });
            }

            ymap();
        }
    }


    // Thanks window

    let thanksModal = new bootstrap.Modal(document.getElementById('modalThanks'), {
        keyboard: true
    })
    let modalForm = new bootstrap.Modal(document.getElementById('modal1'), {
        keyboard: true
    });
    let modalFormProduct = new bootstrap.Modal(document.getElementById('modalProduct'));

    document.querySelectorAll('form').forEach(element => {
        element.addEventListener('submit', function( event ) {
            modalForm.hide();
            modalFormProduct.hide();
            thanksModal.show();
            setTimeout(() => {
                thanksModal.hide();
            }, 5000)
        })
    })

    // Category
    
    $(".catalog__category-title").on("click", function(){
        $(this).toggleClass("active")
        $(this).next().slideToggle(400)
    });

    // Products modal

    const productModal = document.querySelector("#modalProduct");

    productModal.addEventListener('show.bs.modal', (e) => {
        let btn = e.relatedTarget;
        let content = btn.getAttribute('data-bs-whatever')
        const modalInput = productModal.querySelector('#service');

        modalInput.value = content;
    })
});
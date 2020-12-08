'use strict';
// ---------- меню, фильтр и модалки -----------
(function () {
  var modalLoginOpen = document.querySelector('.page-header__login');
  var modalCartOpen = document.querySelector('.card__add');
  var modalLoginOverlay = document.querySelector('.login');
  var modalCartOverlay = document.querySelector('.cart');
  var body = document.querySelector('body');
  var pageHeader = document.querySelector('.page-header');
  var headerToggle = document.querySelector('.page-header__toggle');
  var filterOverlay = document.querySelector('.catalog__filter');
  var filterOpen = document.querySelector('.catalog__filter-btn');

  // функция закрытия меню
  var closeMenu = function () {
    pageHeader.classList.remove('page-header--opened-menu');
    pageHeader.classList.add('page-header--closed-menu');
    body.classList.remove('modal__scroll-hidden');
  };

  // функция открытия меню
  var openMenu = function () {
    pageHeader.classList.remove('page-header--closed-menu');
    pageHeader.classList.add('page-header--opened-menu');
    body.classList.add('modal__scroll-hidden');
  };

  // открытие/закрытие меню по нажатию на кнопку
  if (headerToggle) {
    pageHeader.classList.remove('page-header--no-js');
    pageHeader.classList.add('page-header--closed-menu');

    headerToggle.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (pageHeader.classList.contains('page-header--closed-menu')) {
        openMenu();
      } else {
        closeMenu();
      }
    });
  }

  // функция закрытия модалок и фильтра
  var closeModal = function (modal) {
    modal.classList.remove('modal--open');
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  // функция открытия модалок
  var openModal = function (modal) {
    modal.classList.add('modal--open');
    document.addEventListener('keydown', popupEscPressHandler);
  };

  // функция отключения скролла под модалкой
  var scrollOff = function () {
    body.classList.add('modal__scroll-hidden');
  };

  // функция включения скролла
  var scrollOn = function () {
    body.classList.remove('modal__scroll-hidden');
  };

  // обработчик нажатия Esc
  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      scrollOn();
      if (modalLoginOverlay && modalLoginOverlay.classList.contains('modal--open')) {
        closeModal(modalLoginOverlay);
      } else if (modalCartOverlay && modalCartOverlay.classList.contains('modal--open')) {
        closeModal(modalCartOverlay);
      } else if (filterOverlay && filterOverlay.classList.contains('modal--open')) {
        closeModal(filterOverlay);
      }
    }
  };

  var onlyOverlayClick = function (evt) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
  };

  if (modalLoginOverlay) {
    var modalLoginWindow = modalLoginOverlay.querySelector('.login__wrapper');
    var modalLoginClose = modalLoginWindow.querySelector('.modal__toggle');

    modalLoginWindow.addEventListener('click', function (evt) {
      onlyOverlayClick(evt);
    });

    modalLoginOpen.addEventListener('click', function (evt) {
      evt.preventDefault();
      openModal(modalLoginOverlay);
      scrollOff();
    });

    modalLoginOverlay.addEventListener('click', function () {
      closeModal(modalLoginOverlay);
      scrollOn();
    });

    modalLoginClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeModal(modalLoginOverlay);
      scrollOn();
    });
  }

  if (modalCartOverlay) {
    var modalCartWindow = modalCartOverlay.querySelector('.cart__wrapper');
    var modalCartClose = modalCartWindow.querySelector('.modal__toggle');

    modalCartWindow.addEventListener('click', function (evt) {
      onlyOverlayClick(evt);
    });

    modalCartOpen.addEventListener('click', function (evt) {
      evt.preventDefault();
      openModal(modalCartOverlay);
      scrollOff();
    });

    modalCartOverlay.addEventListener('click', function () {
      closeModal(modalCartOverlay);
      scrollOn();
    });

    modalCartClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeModal(modalCartOverlay);
      scrollOn();
    });
  }

  if (filterOverlay) {
    var filter = filterOverlay.querySelector('.filter');
    var filterClose = filter.querySelector('.filter__btn-close');

    filter.addEventListener('click', function (evt) {
      onlyOverlayClick(evt);
    });

    filterOpen.addEventListener('click', function (evt) {
      evt.preventDefault();
      openModal(filterOverlay);
      scrollOff();
    });

    filterOverlay.addEventListener('click', function () {
      closeModal(filterOverlay);
      scrollOn();
    });

    filterClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeModal(filterOverlay);
      scrollOn();
    });
  }

  // -----отправка формы и открытие окна успешной отправки------
  var loginForm = document.querySelector('.login__form');
  var subscribeForm = document.querySelector('.page-footer__form');
  var URL = 'https://echo.htmlacademy.ru';
  var isStorageSupport = true;

  var upload = function (data, successHandler) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      successHandler(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.responseType = 'json';
    xhr.send(data);
  };

  var uploadSuccessHandler = function () {
    if (modalLoginOverlay) {
      closeModal(modalLoginOverlay);
    } else {
      return;
    }
  };

  if (loginForm) {
    loginForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var mail = loginForm.querySelector('[name=mail]');
      upload(new FormData(loginForm), uploadSuccessHandler);
      if (isStorageSupport) {
        localStorage.setItem('mail', mail.value);
      }
      loginForm.reset();
    });
  }

  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var mail = subscribeForm.querySelector('[name=mail]');
      upload(new FormData(subscribeForm), uploadSuccessHandler);
      if (isStorageSupport) {
        localStorage.setItem('mail', mail.value);
      }
      subscribeForm.reset();
    });
  }
})();

(function () {
// -------------аккордеон---------------------

  var accordionFaq = document.querySelector('.faq__list');
  var accordionFilter = document.querySelector('.filter__group');

  var accordionFaqCallback = function (evt) {
    var parent = evt.target.parentElement;
    parent.classList.toggle('faq__item--active');
  };

  if (accordionFaq) {
    accordionFaq.classList.remove('faq__list--no-js');

    var accordionQuestions = accordionFaq.querySelectorAll('.faq__question');
    for (var j = 0; j < accordionQuestions.length; j++) {
      var item = accordionQuestions[j];
      item.addEventListener('click', accordionFaqCallback);
    }
  }

  var accordionFilterCallback = function (evt) {
    var parent = evt.target.parentElement;
    parent.classList.toggle('filter__fieldset--active');
  };

  if (accordionFilter) {
    var accordionFilters = accordionFilter.querySelectorAll('.filter__legend');
    for (var k = 0; k < accordionFilters.length; k++) {
      var filter = accordionFilters[k];
      filter.addEventListener('click', accordionFilterCallback);
    }
  }
})();

// ---------------табы------------------
(function () {
  var tabButtons = document.querySelectorAll('.card__tab');

  if (tabButtons.length > 0) {
    var tabsHandler = function (evt) {
      evt.preventDefault();
      var link = evt.currentTarget.querySelector('a');
      var tab = document.querySelector(link.getAttribute('href'));
      var activeTab = document.querySelector('.card__tab--active');

      activeTab.classList.remove('card__tab--active');
      document.querySelector('.card__tab-content--active')
          .classList.remove('card__tab-content--active');

      evt.currentTarget.classList.add('card__tab--active');
      tab.classList.add('card__tab-content--active');
    };

    for (var i = 0; i < tabButtons.length; i++) {
      tabButtons[i].addEventListener('click', tabsHandler);
    }
  }
})();

// -------------swiper---------------------
(function () {
  var slider = document.querySelector('.slider');
  var createSwiper = function () {
    var swiper = new Swiper('.swiper-container', {// eslint-disable-line
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
              return '<span class="' + currentClass + '"></span>' +
                ' of ' +
                '<span class="' + totalClass + '"></span>';
            }
          },
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class=' + className + '>' + (index + 1) + '</span>';
            },
          },
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class=' + className + '>' + (index + 1) + '</span>';
            },
          },
        },
        1252: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class=' + className + '>' + (index + 1) + '</span>';
            },
          },
        }
      },
    });
  };

  if (slider) {
    createSwiper();
  }
})();

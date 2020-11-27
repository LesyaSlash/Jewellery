'use strict';
// ---------- меню и модалки -----------
(function () {
  var modalLoginOpen = document.querySelector('.page-header__login');
  var modalCartOpen = document.querySelector('.card__add');
  var modalLoginOverlay = document.querySelector('.login');
  var modalCartOverlay = document.querySelector('.cart');
  var body = document.querySelector('body');
  var pageHeader = document.querySelector('.page-header');
  var headerToggle = document.querySelector('.page-header__toggle');

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

  // функция закрытия модалок
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
      if (modalLoginOverlay.classList.contains('modal--open')) {
        closeModal(modalLoginOverlay);
      } else if (modalCartOverlay.classList.contains('modal--open')) {
        closeModal(modalCartOverlay);
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
})();

(function () {
// -------------аккордеон---------------------

  var accordion = document.querySelector('.faq__list');

  var accordionCallback = function (evt) {
    var parent = evt.target.parentElement;
    parent.classList.toggle('faq__item--active');
  };

  if (accordion) {
    accordion.classList.remove('faq__list--no-js');

    var accordionQuestions = accordion.querySelectorAll('.faq__question');
    for (var j = 0; j < accordionQuestions.length; j++) {
      var item = accordionQuestions[j];
      item.addEventListener('click', accordionCallback);
    }
  }
})();

// -------------swiper---------------------
(function () {
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
      // when window width is >= 1024px
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
        // when window width is >= 1252px
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
})();

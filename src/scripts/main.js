/* eslint-disable max-len */
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper.css';
import 'swiper/modules/pagination.css';

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#menu') {
    document.body.classList.add('page__body--with-menu');
  } else {
    document.body.classList.remove('page__body--with-menu');
  }
});

const pageReload = document.querySelector('#form-reload');

pageReload.addEventListener('submit', function formReload(event) {
  event.preventDefault();
  pageReload.reset();
});

// Slider
const swiperBenefitsClass = document.querySelector('.benefits__swiper');
const wrapperBenefitsClass = document.querySelector('.benefits__content');
const itemsBenefitsClass = document.querySelectorAll('.benefits__item');

const swiperFeaturesClass = document.querySelector('.features__swiper');
const wrapperFeaturesClass = document.querySelector('.features__swiper-wrapper');
const itemsFeaturesClass = document.querySelectorAll('.features__content-item');

const menuContent = document.querySelector('.menu__content');

function removeSwiperBenefits() {
  swiperBenefitsClass.classList.remove('swiper');
  swiperBenefitsClass.classList.remove('swiper-backface-hidden');
  wrapperBenefitsClass.classList.remove('swiper-wrapper');
  wrapperBenefitsClass.removeAttribute('id');

  itemsBenefitsClass.forEach(slide => {
    slide.classList.remove('swiper-slide');
    slide.removeAttribute('style');
  });

  document.querySelector('.benefits__pagination').remove();
}

function removeSwiperFeatures() {
  swiperFeaturesClass.classList.remove('swiper');
  swiperFeaturesClass.classList.remove('swiper-backface-hidden');
  wrapperFeaturesClass.classList.remove('swiper-wrapper');
  wrapperFeaturesClass.removeAttribute('id');

  itemsFeaturesClass.forEach(slide => {
    slide.classList.remove('swiper-slide');
    slide.removeAttribute('style');
  });
}

function addSwiperBenefits() {
  swiperBenefitsClass.classList.add('swiper');
  wrapperBenefitsClass.classList.add('swiper-wrapper');

  itemsBenefitsClass.forEach(slide => {
    slide.classList.add('swiper-slide');
  });

  const newElement = document.createElement('div');

  newElement.setAttribute('class', 'benefits__pagination swiper-pagination');
  swiperBenefitsClass.appendChild(newElement);
}

function addSwiperFeatures() {
  swiperFeaturesClass.classList.add('swiper');
  wrapperFeaturesClass.classList.add('swiper-wrapper');

  itemsFeaturesClass.forEach(slide => {
    slide.classList.add('swiper-slide');
  });
}

function initSwiperBenefits() {
  return new Swiper('.benefits__swiper', {
    modules: [Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

function initSwiperFeatures() {
  return new Swiper('.features__swiper', {
    modules: [Pagination, Navigation],
    pagination: {
      el: '.features__slider-count',
      type: 'fraction',
      renderFraction: function(current, total) {
        return `
          0<span class="${current}"></span>
          <span class="features__slider-count-down">/ 0</span>
          <span class="features__slider-count-down ${total}"></span>
        `;
      },
    },
    navigation: {
      nextEl: '.features__icon--right',
      prevEl: '.features__icon--left',
    },
  });
}

let swiperBenefits = null;
let swiperFeatures = null;

if (window.innerWidth < 768) {
  addSwiperBenefits();
  addSwiperFeatures();
  swiperBenefits = initSwiperBenefits();
  swiperFeatures = initSwiperFeatures();
}

if (window.innerWidth < 1194) {
  addSwiperFeatures();
  swiperFeatures = initSwiperFeatures();
}

function checkScreenWidth() {
  if (window.innerWidth >= 1194) {
    if (swiperBenefits) {
      swiperBenefits.destroy(true, true);
      swiperBenefits = null;
      removeSwiperBenefits();
    }

    if (swiperFeatures) {
      swiperFeatures.destroy(true, true);
      swiperFeatures = null;
      removeSwiperFeatures();
    }
  } else if (window.innerWidth >= 768) {
    if (swiperBenefits) {
      swiperBenefits.destroy(true, true);
      swiperBenefits = null;
      removeSwiperBenefits();
    }

    if (!swiperFeatures) {
      addSwiperFeatures();
      swiperFeatures = initSwiperFeatures();
    }

    menuContent.style.height = '100vh';
  } else {
    if (!swiperBenefits) {
      addSwiperBenefits();
      swiperBenefits = initSwiperBenefits();
    }

    if (!swiperFeatures) {
      addSwiperFeatures();
      swiperFeatures = initSwiperFeatures();
    }

    menuContent.style.height = document.documentElement.clientHeight + 'px';
  }
}

checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);

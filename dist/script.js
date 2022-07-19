"use strict";

window.addEventListener('DOMContentLoaded', () => {

  const tabContent = document.querySelectorAll(".tabcontent");
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent (){
    tabContent.forEach(elem => {
      elem.classList.remove("show");
      elem.classList.add("hide");
    })

    tabs.forEach(elem => {
      elem.classList.remove("tabheader__item_active");
    })
  }

  function showTabContent (i = 0){
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if(target && target.classList.contains("tabheader__item")){
      tabs.forEach((elem, i) => {
        if(target == elem){
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  })

  // Timer

  const deadLine = '2022-07-12';

  function getTimeRemaining(endTime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endTime) - Date.parse(new Date());

    if(t <= 0){
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60 )) % 60 ),
      seconds = Math.floor((t / (1000)) % 60);
    }
         
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };   
  }


  function setClock(selector, endTime){
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          updateInterval = setInterval(updateClock, 1000);

    updateClock();      

    function updateClock(){
      const time = getTimeRemaining(endTime);

      function setZero(num){
        if(num >= 0 && num < 10){
          return `0${num}`;
        }else{
          return num;
        }
      }

      days.innerHTML = setZero(time.days);
      hours.innerHTML = setZero(time.hours);
      minutes.innerHTML = setZero(time.minutes);
      seconds.innerHTML = setZero(time.seconds);

      if (time.total <= 0){
        clearInterval(updateInterval);
      }
    }
  }

  setClock(".timer", deadLine);

  // MODAL

  const modalBtnOpen = document.querySelectorAll('[data-modal]'),
        modalBtnClose = document.querySelector('[data-closeModal]'),
        modal = document.querySelector(".modal");

  console.log(modalBtnOpen);

  function openModal(){
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  modalBtnOpen.forEach(elem => {
    elem.addEventListener('click', () => {
      if(modal.style.display != 'block'){
        openModal();
      } 
    });
  });

 modalBtnClose.addEventListener('click', () => {
  if(modal.style.display == "block"){
    closeModal();
  }
 })
  
  modal.addEventListener('click', (e) => {
    if(e.target === modal){
      closeModal();
    }
  })

 document.addEventListener('keydown', (e) => {
  if(e.code === "Escape" && modal.style.display == "block"){
    closeModal();
  }
 });

 // mod Modal

 const openModalByTimer = setTimeout(openModal, 5000);

 function showModalByScroll (){
  if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
   }
 }

 window.addEventListener('scroll', showModalByScroll);

  // classes

  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classes){
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.classes = classes;
      this.parentMenu = document.querySelector(parentSelector);
      this.exchange = 30;
      this.changePriceToUAH();

    }

    changePriceToUAH(){
      this.price = this.price * this.exchange;
    }

    renderCard(){
      const element = document.createElement('div');
      if(this.classes.length === 0){
        element.classList.add("menu__item");
      }else{
        this.classes.forEach(className => {element.classList.add(className)});
      }

      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.description}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
        `;
      
      this.parentMenu.append(element);  
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
  ).renderCard();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    15,
    ".menu .container"
  ).renderCard();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    12,
    ".menu .container"
  ).renderCard();
});
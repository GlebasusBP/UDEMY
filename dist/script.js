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
});
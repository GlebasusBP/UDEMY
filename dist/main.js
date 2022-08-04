"use strict";

window.addEventListener("DOMContentLoaded", () => {
// TABS
  const tabContent = document.querySelectorAll(".tabcontent"),
        parentTabs = document.querySelector(".tabheader__items"),
        tabs = document.querySelectorAll(".tabheader__item");

  function hideTabContent(){
    tabContent.forEach((e) => {
      e.classList.add("hide");
      e.classList.remove("show", "fade");
    });

    tabs.forEach(elem => {
      elem.classList.remove("tabheader__item_active")
    })
  }

  function showTabContent(item = 0){
    tabContent[item].classList.remove("hide");
    tabContent[item].classList.add("show", "fade");
    tabs[item].classList.add("tabheader__item_active")
  }

  hideTabContent();
  showTabContent();

  parentTabs.addEventListener("click", (event) => {
    const target = event.target;

    if(target && target.classList.contains("tabheader__item")){
      tabs.forEach( (elem, i) => {
        if(target == elem){
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  })

  // при клике на какой либо элемент родителя работает колбэк, в котором, если клик произошол по элементу с классом в условии,
  // то запускется перебор элементов и сравнение их с элементом, по которому произошол клик. При true вызываются функции и 
  // передаётся индекс элемента, который нужно показать на стр.


  //TIMER

  const deadLine = '2022-07-20';

  function getTimeRemaining(endTime){
    let days, hours, minutes, seconds;
    const t = Date.parse(endTime) - Date.parse(new Date());   

    if(t <= 0){
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60) % 24));
      minutes = Math.floor((t / (1000 * 60) % 60));
      seconds = Math.floor((t / 1000) % 60);
    }
    
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
  }
  
  console.log(getTimeRemaining(deadLine));
  

  function setClock(selector, endTime){
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector("#hours"),
          minutes = timer.querySelector("#minutes"),
          seconds = timer.querySelector("#seconds"),
          updateInterval = setInterval(updateTimer, 1000);

    updateTimer();      

    function updateTimer(){
      const time = getTimeRemaining(endTime);

      function setZero(num){
        if(num < 10){
          return `0${num}`;
        } else {
          return num;
        }
      }

      days.innerHTML = setZero(time.days);
      hours.innerHTML = setZero(time.hours);
      minutes.innerHTML = setZero(time.minutes);
      seconds.innerHTML = setZero(time.seconds);

      if(time.total <= 0){
        clearInterval(updateInterval);
      }
    }   
  }

  setClock(".timer", deadLine);

  // MODAL

  const modalBtnOpen = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector(".modal");

  console.log(modalBtnOpen);

  function openModal(){
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearTimeout(openModalByTimer); // если модалка была открыта до таймера, то setTimeout сбрасывается
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
  
  modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target.getAttribute('data-closeModal') == ''){
      closeModal();
    }
  })

 document.addEventListener('keydown', (e) => {
  if(e.code === "Escape" && modal.style.display == "block"){
    closeModal();
  }
 });

 // mod Modal

 const openModalByTimer = setTimeout(openModal, 50000);

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
      this.classes  = classes;
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

  const getResource = async (url) => {
    const res = await fetch(url)

    if(!res.ok){
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getResource('http://localhost:3000/menu')
    .then( data => {
      data.forEach( ({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').renderCard();
      } )
    });

  

  // POST to SERV.

  const forms = document.querySelectorAll("form");

  const messages = {
    loading: "img/svg/spinner.svg",
    saccess: "Отправлено",
    failure: "произошла ошибка"
  }

  forms.forEach( item => {
    bindPostData(item);
  })

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
        },
      body: data
    })
    return await res.json();
  };

  function bindPostData(form){
    form.addEventListener('submit', (event) => {
      event.preventDefault();  //сброс стандартного поведения браузера

      const statusMessage = document.createElement("img");
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);
      // FormData
      const formData = new FormData(form);

      // чтобы прогнать FormData() в формат JSON нужна следующая конструкция:

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then( data => {
          console.log(data);
          showModalForm(messages.saccess);          
          statusMessage.remove();
        })
        .catch( () => {
          showModalForm(messages.failure);
        })
        .finally(() => {
          form.reset();
        })
    })
  }

  function showModalForm(message){
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.classList.add('hide');

    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-closeModal class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector('.modal').append(thanksModal);

    setTimeout( () => {
      thanksModal.remove(); // чтобы не накапливались лишние блоки.
      modalDialog.classList.remove('hide');
      modalDialog.classList.add('modal__dialog');
      closeModal();
    }, 3000);
  }

  // Slider

  const slider = document.querySelector('.offer__slider'),
        slidesList = slider.querySelectorAll('.offer__slide'),
        currentCount = slider.querySelector('#current'),
        totalCount = slider.querySelector('#total'),
        prev = slider.querySelector('.offer__slider-prev'),
        next = slider.querySelector('.offer__slider-next'),
        wrapper = slider.querySelector('.offer__slider-wrapper'),
        inner = slider.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(wrapper).width;

  let indexSlide = 1;
  let offset = 0;
  
  inner.style.width = 100 * slidesList.length + '%';
  inner.style.display = 'flex';
  inner.style.transition = '0.5s all';
  wrapper.style.overflow = 'hidden';

  slidesList.forEach( e => {
    e.style.width = width;
  });

  function getTotalSliders(){
    if(slidesList.length < 10){
      totalCount.textContent = `0${slidesList.length}`;
    } else {
      totalCount.textContent = slidesList.length;
    }
  }

  function statusCount(){
    if(slidesList.length < 10){
      currentCount.textContent = `0${indexSlide}`;
    } else {
      currentCount.textContent = indexSlide;
    }
  }

  function getNextSlider(){
    if(offset === +width.slice(0, width.length - 2) * (slidesList.length - 1)){
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    inner.style.transform = `translateX(-${offset}px)`;
    if(indexSlide === slidesList.length){
      indexSlide = 1;
    }else{
      indexSlide++;
    }
    
    statusCount();
    activeDot();
  }

  function getPrevSlider(){
    if(offset === 0){
      offset = +width.slice(0, width.length - 2) * (slidesList.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    inner.style.transform = `translateX(-${offset}px)`;
    if(indexSlide === 1){
      indexSlide = slidesList.length;
    }else{
      indexSlide--;
    }

    statusCount();
    activeDot();
  }

  getTotalSliders();
  statusCount();

  next.addEventListener('click', getNextSlider);

  prev.addEventListener('click', getPrevSlider);

//////// DOTS

  slider.style.position = 'relative';

  const indicator = document.createElement('ol');
  let arrDots = [];
  indicator.classList.add('carousel-indicators');
  indicator.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
  `;
  slider.append(indicator);

  

  for(let i = 0; i < slidesList.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;

    if(i === 0){
      dot.style.opacity = "1";
    }
    indicator.append(dot);
    arrDots.push(dot);
    console.log(arrDots);

  }

  function activeDot(){
    arrDots.forEach( dot => dot.style.opacity = ".5" );
    arrDots[indexSlide - 1].style.opacity = "1";
  }

  arrDots.forEach( dot => {
    dot.addEventListener('click', e => {
      const dotData = e.target.getAttribute("data-slide-to");
      indexSlide = dotData;

      offset = +width.slice(0, width.length - 2) * (dotData - 1);
      inner.style.transform = `translateX(-${offset}px)`;
      
      statusCount();
      activeDot();
    })
  })

  // simple

//   function getTotalSliders(){
//     if(slidesList.length < 10){
//       totalCount.textContent = `0${slidesList.length}`;
//     } else {
//       totalCount.textContent = slidesList.length;
//     }
//   }

//  function statusCount(){
//   if(slidesList.length < 10){
//     currentCount.textContent = `0${indexSlide}`;
//   } else {
//     currentCount.textContent = indexSlide;
//   }
//  }

//   function showSlide(n){
//     if(n > slidesList.length){
//       indexSlide = 1;
//     }

//     if(n < 1){
//       indexSlide = slidesList.length;
//     }

//     slidesList.forEach(e => {
//       e.classList.add('hide')
//       e.classList.remove('fade')
//     });

//     slidesList[indexSlide - 1].classList.remove('hide');
//     slidesList[indexSlide - 1].classList.add('fade');
//   }

//   showSlide(indexSlide);
//   statusCount();
//   getTotalSliders();

//   prev.addEventListener('click', () => {
//     indexSlide--;
//     showSlide(indexSlide);
//     statusCount();
//   });

//   next.addEventListener('click', () => {
//     indexSlide++;
//     showSlide(indexSlide);
//     statusCount();
//   });

 ///////////////////////////////////////////////////
 
 //carousel slider



});


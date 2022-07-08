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

})
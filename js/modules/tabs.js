function tabs(){
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

}

module.exports = tabs;
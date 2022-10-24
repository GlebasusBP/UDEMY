function cards(){
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
}

module.exports = cards;
function slider(){
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

   //carousel slider
  
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

   function replaceWith(value){
    return +value.replace(/\D/g, "");
   }

  function getNextSlider(){
    if(offset === replaceWith(width) * (slidesList.length - 1)){
      offset = 0;
    } else {
      offset += replaceWith(width);
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
      offset = replaceWith(width) * (slidesList.length - 1);
    } else {
      offset -= replaceWith(width);
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

      offset = replaceWith(width) * (dotData - 1);
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

//   function getPrevSlide(){
//     indexSlide--;
//     showSlide(indexSlide);
//     statusCount();
//     activeDot();
//   }

//   function getNextSlide(){
//     indexSlide++;
//     showSlide(indexSlide);
//     statusCount();
//     activeDot();
//   }

//   next.addEventListener('click', getNextSlide);

//   prev.addEventListener('click', getPrevSlide);

//   // add dots
//   slider.style.position = 'relative';
//   const indicator = document.createElement('ol');
//   let arrDots = [];
//   indicator.classList.add('carousel-indicators');
//   indicator.style.cssText = `
//          position: absolute;
//          right: 0;
//          bottom: 0;
//          left: 0;
//          z-index: 15;
//          display: flex;
//          justify-content: center;
//          margin-right: 15%;
//          margin-left: 15%;
//          list-style: none;
//   `;
//   slider.append(indicator);

//   for(let i = 0; i < slidesList.length; i++){
//     const dot = document.createElement('li');
//     dot.setAttribute('data-slide-to', i + 1);
//     dot.style.cssText = `
//            box-sizing: content-box;
//            flex: 0 1 auto;
//            width: 30px;
//            height: 6px;
//            margin-right: 3px;
//            margin-left: 3px;
//            cursor: pointer;
//            background-color: #fff;
//            background-clip: padding-box;
//            border-top: 10px solid transparent;
//            border-bottom: 10px solid transparent;
//            opacity: .5;
//            transition: opacity .6s ease;
//     `;
//     indicator.append(dot);
//     arrDots.push(dot);
//     if(i === 0){
//       dot.style.opacity = '1';
//     }
//   }

//   function activeDot(){
//     arrDots.forEach(dot => dot.style.opacity = '.5');
//     arrDots[indexSlide - 1].style.opacity = '1';
//   }

//   arrDots.forEach(dot => {
//     dot.addEventListener('click', (e) => {
//       const dotData = e.target.getAttribute('data-slide-to');
//       indexSlide = dotData;
//       statusCount();
//       showSlide(dotData);
//       activeDot();
//     })
//   })
}

module.exports = slider;
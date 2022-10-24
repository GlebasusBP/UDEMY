function modal(){
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

}

module.exports = modal;
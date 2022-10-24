function postToServer(){
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
}

module.exports = postToServer;
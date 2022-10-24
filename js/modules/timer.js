function timer(){
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
}

module.exports = timer;
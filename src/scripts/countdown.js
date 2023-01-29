document.addEventListener('DOMContentLoaded', () => {
  let timer;

  const compareDate = new Date();
  const edit = (num) => {
    if (num < 10) {
      return '0' + num
    } else {
      return num
    }
  }
  compareDate.setDate(compareDate.getDate() + 7);

  timer = setInterval(function() {
    countdown(compareDate);
  }, 1000);

  const countdown = (toDate) => {

  const hoursCD = document.getElementById('hours');
  const minutesCD = document.getElementById('minutes');
  const secondsCD = document.getElementById('seconds');

  const dateEntered = toDate;
  const now = new Date();
  const difference = dateEntered.getTime() - now.getTime();

  if (difference <= 0) {

    clearInterval(timer);
  
  } else {
    
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let hourEdit = hours %= 24;
    let minEdit = minutes %= 60;
    let secEdit = seconds %= 60;

    hoursCD.textContent = edit(hourEdit);
    minutesCD.textContent = edit(minEdit);
    secondsCD.textContent = edit(secEdit);
  }
}
});
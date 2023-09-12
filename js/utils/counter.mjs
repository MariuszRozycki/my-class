/**
 * Implements a countdown timer that redirects the user to the home page after reaching zero.
 * The countdown starts from 3 and decrements every second.
 * 
 * @function counter
 * 
 * @example  
 * counter(); 
 * Starts the countdown and eventually redirects to page given in window.location.href.
 */

export function counter() {
  let counter = 3;
  const countingDownSuccess = document.querySelector('.counter');
  countingDownSuccess.classList.remove('d-none');
  const countDown = setInterval(() => {
    countingDownSuccess.innerText = `
  Moving to log-in
  ${counter} sek. left...
  `;
    counter -= 1;

    if (counter < 0) {
      clearInterval(countDown);
      window.location.href = "../../"
    }
  }, 1000);
}
export function counter() {
  console.log('dziala');
  let counter = 5;
  const countingDownSuccess = document.querySelector('.counter');
  countingDownSuccess.classList.remove('d-none');
  const countDown = setInterval(() => {
    countingDownSuccess.innerText = `
  Moving to log-in
  ${counter} sek. left...
  `;
    counter -= 1;
    console.log(counter);

    if (counter < 0) {
      clearInterval(countDown);
      window.location.href = "../../"
    }
  }, 1000);
}
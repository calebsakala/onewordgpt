import * as config from '/config.js';

const body = document.querySelector('body');
const textBox = document.querySelector('.question--textbox');
const responseArea = document.querySelector('.chatgpt-response');
const sendBtnContainer = document.querySelector('.send-btn--container');
const sendBtn = document.querySelector('.material-symbols-outlined');
const chatgptLogo = document.querySelector('.chatgpt-logo');
sendBtn.style.color = '#6b6c7b';

 
export const createResponseListener = function (responseHandler) {
  textBox.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      chatgptLogo.style.opacity = 100;
      e.preventDefault();
      responseHandler(responseArea, textBox);
    }
  });
};

export function typing(response, answerLength) {
  if (config.text.textPosition >= answerLength) return;
  
  responseArea.textContent += response[config.text.textPosition];

  config.text.textPosition++;

  setTimeout(typing, config.text.speed, response, answerLength)
}

textBox.addEventListener('input', (event) => {
  const text = event.target.value.trim();

  if (text === '') {
    sendBtnContainer.style.backgroundColor = 'transparent';
    sendBtn.style.color = '#6b6c7b';
  } else {
    sendBtnContainer.style.backgroundColor = '#19c37d';
    sendBtn.style.color = 'white';
  }
});

// Footer

body.insertAdjacentHTML('beforeend', `
<footer>
  <div class="footer-container">
    <p id="footer-text" class="text-center">&copy; <span id="current-year"></span> Caleb Sakala</p>
  </div>
</footer>`);

const currentYear = new Date().getFullYear();
const currentYearElement = document.getElementById('current-year');
currentYearElement.textContent = currentYear;
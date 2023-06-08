const body = document.querySelector("body");
const textBox = document.querySelector(".question--textbox");
const responseArea = document.querySelector(".chatgpt-response");
const sendBtnContainer = document.querySelector(".send-btn--container");
const sendBtn = document.querySelector(".material-symbols-outlined");
const chatgptLogo = document.querySelector(".chatgpt-logo");
const blinker = document.querySelector(".blinker");
const titleDropdown = document.querySelector('.title-dropdown');
const userLogo = document.querySelector(".user-icon");
const promptArea = document.querySelector(".user-prompt");
const warningContainer = document.querySelector(".warning-text--container");


// Adding in the footer
body.insertAdjacentHTML(
  "beforeend",
  `
<footer>
  <div class="footer-container">
    <p id="footer-text" class="text-center">&copy; <span id="current-year"></span> Caleb Sakala</p>
  </div>
</footer>`
);

// Setting the current year on the footer
const currentYear = new Date().getFullYear();
const yearOnFooter = document.getElementById("current-year");
yearOnFooter.textContent = currentYear;


// An event listener to change the value in the question-box depending on what the user desires
titleDropdown.addEventListener('change', function() {

  // Grabbing the selected option
  const selectedOption = titleDropdown.options[titleDropdown.selectedIndex].text;
  
  // Extracting the word number from the selected option.
  // We split on the '-' because the title will always have a '-' after the number of words. I.e, 'One-wordGPT', 'Two-wordGPT'.
  const wordNumber = selectedOption.split("-")[0];
  textBox.placeholder =  `Get a ${wordNumber.toLowerCase()}-word response from ChatGPT`; 

  // Changing the text on the warning container
  warningContainer.textContent = `Free Research Preview. ${wordNumber}-wordGPT may produce inaccurate information about people, places, or facts.`;

  // Changing the page title
  document.title = `${wordNumber}-wordGPT: ${wordNumber} word answers from ChatGPT`;

  // If there is a response
  if (responseArea.textContent.length > 0) {

    // And we haven't already added a "(from ${numberOfWords}-wordGPT)" to it
    if (!(responseArea.textContent.split("(").length > 1)) {
    responseArea.textContent = responseArea.textContent.split("(")[0];
    responseArea.textContent += ` (from ${responseArea.dataset.version}-wordGPT)`
    }
    else if (responseArea.textContent.split("(")[1].includes(wordNumber)) {

      // Removing it if the user gets back to their previous version
      responseArea.textContent = responseArea.textContent.split("(")[0].trim();
    }
  }
});

// A function to hide the send button
const hideSendBtn = function () {
  sendBtnContainer.style.backgroundColor = "transparent";
  sendBtn.style.color = "#6b6c7b";
}

hideSendBtn();

// a function to call the response handler after a user inputs their prompt
const callHandler = function (e, state, responseHandler) {
  e.preventDefault()
  state.wordLimit = titleDropdown.selectedIndex + 1;
  state.textPosition = 0;
  titleDropdown.disabled = true;
  hideSendBtn();
  responseHandler(textBox);
}

// A function to initialise the state
export const initState = function (state) {
  state.userIcon = userLogo;
  state.chatGPTLogo = chatgptLogo;
  state.sendBtn = sendBtn;
  state.promptArea = promptArea;
  state.blinker = blinker;
  state.typingSpeed = 100;
  state.textPosition = 0;
  state.responseArea = responseArea;
}

// A function to create the event handlers for users inputting a prompt
export const listenForPrompts = function (responseHandler, state) {
  
  // If the user presses enter, the handler is called
  textBox.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      callHandler(e, state, responseHandler)
    }
  });

  // If the user presses the send button, the handler is called
  sendBtn.addEventListener("click", function (e) {
    if (e.target.closest(".send-btn--container")) {
      callHandler(e, state, responseHandler)
    }
  });
};

// A recursive function to simulate typewriter-like typing
export async function type(response, answerLength, state) {

  // Base case: we have reached the end of the sentence
  if (state.textPosition > answerLength) {
    
    // The user can type again 
    textBox.readOnly = false;

    // The user can select again 
    titleDropdown.disabled = false;

    // The blinker is deactivated
    setTimeout(() => state.blinker.classList.remove("active"), 250);
    return;
  }

  // Adding to the content in the responseArea
  state.responseArea.textContent += response.charAt(state.textPosition);

  // Incrementing the textPosition
  state.textPosition++;

  // Calling the function again
  setTimeout(() => {
    type(response, answerLength, state);
  }, state.typingSpeed);
}


// Adding an eventListener to the user's textBox
textBox.addEventListener("input", event => {
  
  // Selecting the users text
  const text = event.target.value.trim();

  if (text === "") {
    // Hiding the send button - this function is needed in multiple places
    hideSendBtn();
  } else {
    // Showing the send button
    sendBtnContainer.style.backgroundColor = "#19c37d";
    sendBtn.style.color = "rgb(241, 241, 241)";
  }
});


// Some code - copied from StackOverflow - to keep the textarea 
// to the size of the user's input 

const tx = document.getElementsByTagName("textarea");

for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  );
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 0;
  this.style.height = this.scrollHeight + "px";
}

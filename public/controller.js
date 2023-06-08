import * as model from "./model.js";
import * as View from "./View.js";

const state = model.state;
const versionNumbers = ['One', 'Two', 'Three'];


async function generateResponse(textBox) {
  
  const text = textBox.value.trim(); // Get the trimmed text from the textbox
  
  // if there is no text, simply return
  if (text.length === 0) return;

  // Otherwise, show the logos
  state.userIcon.style.opacity = 1;
  state.chatGPTLogo.style.opacity = 1;
  
  // Disable typing 
  textBox.readOnly = true;

  // Start the blinker
  state.blinker.classList.add("active");
  
  // Clear the responseArea
  state.responseArea.textContent = "";

  // Saving the user's prompt
  state.promptArea.textContent = text;

  // Preparing the Json Data for the API
  const jsonData = JSON.stringify({ 
    question: text,
    limit: state.wordLimit, 
  }); 

  // Clearing the user's prompt
  textBox.value = "";

  const { response } = await model.callGPT(jsonData);

  // Store which version of One-wordGPT generated the response
  state.responseArea.hasAttribute("data-version") 
  ? state.responseArea.dataset.version = `${versionNumbers[state.wordLimit - 1]}`
  : state.responseArea.setAttribute("data-version", `${versionNumbers[state.wordLimit - 1]}`);

  // Typing like a typewriter
  View.type(response, response.length, state);
}

const init = function () {
  View.initState(state);
  View.listenForPrompts(generateResponse, state);
}

init();


import * as model from "./model.js";
import * as View from "./View.js";
import * as config from "./config.js";

async function generateResponse(responseArea, textBox, blinker, logo) {
  const text = textBox.value.trim(); // Get the trimmed text from the textarea

  // if there is no text, simply return
  if (text.length === 0) return;

  config.text.textPosition = 0;
  logo.style.opacity = 100;
  blinker.classList.add("active");
  responseArea.textContent = "";

  const jsonData = JSON.stringify({ question: text }); // Output the text to the console or perform any desired operations with it

  const { response } = await model.callGPT(jsonData);

  View.typing(response, response.length);
}

View.createResponseListener(generateResponse);

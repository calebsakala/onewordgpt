import * as model from '/model.js';
import * as View from '/View.js';
import * as config from '/config.js';


async function generateResponse (responseArea, textBox) {

  config.text.textPosition = 0;
  responseArea.textContent = '';

  const text = textBox.value.trim(); // Get the trimmed text from the textarea
  const jsonData = JSON.stringify({ question: text }); // Output the text to the console or perform any desired operations with it
  
  const { response } = await model.callGPT(jsonData);

  View.typing(response, response.length);
}

View.createResponseListener(generateResponse);


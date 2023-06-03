import * as config from './config.js';

/**
 * 
 * @param { Object } questionData an object formatted as { question: 'string' } 
 * @returns { String } a string of text from ChatGPT
 */
export async function callGPT(questionData) {
  
  const data = await fetch('http://localhost:8080/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: questionData
    });
  
    return await data.json();
}
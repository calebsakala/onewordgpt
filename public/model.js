/**
 * 
 * @param { Object } questionData an object formatted as { question: 'string' } 
 * @returns { String } a string of text from ChatGPT
 */
export async function callGPT(questionData) {
  
  const data = await fetch('https://onewordgpt2.ue.r.appspot.com/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: questionData
    });
  
    return await data.json();
}
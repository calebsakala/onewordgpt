/**
 *
 * @param { Object } questionData an object formatted as { question: 'string' }
 * @returns { String } a string of text from ChatGPT
 */
export async function callGPT(questionData) {
  try {

    const data = await fetch('https://onewordgpt.app/answer', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: questionData,
    });

    return await data.json();
    
  } catch (error) {
    console.error(error);
    throw error;
  }

}

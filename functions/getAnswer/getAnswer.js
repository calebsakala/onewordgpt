import dotenv from "dotenv";

dotenv.config();

export async function getAnswer(prompt) {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Respond in one word. ${prompt}`,
    }),
  });

  const data = await response.json();

  const gptResponse = data.choices[0].text.trim();

  return gptResponse;
}


import dotenv from "dotenv";

dotenv.config();

export async function getAnswer(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `Respond to the following prompt in only one word, as truthfully as possible: '${prompt}'`}],
      max_tokens: 100,
      temperature: 0,
    }),
  });

  const data = await response.json();

  const gptResponse = data.choices[0].message.content;

  if (gptResponse.split(' ').length > 5) return "I can't.";
  if (gptResponse.split(' ').length < 5) return gptResponse;
}

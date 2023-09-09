import dotenv from "dotenv";

dotenv.config();

/**
 *
 * @param { String } prompt
 * @param { Integer } limit
 * @returns
 */
export async function getAnswer(prompt, limit) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `My name is User. Respond to the following prompt in ${limit} word${
            limit > 1 ? "s" : ""
          }, as truthfully as possible: '${prompt}'`,
        },
      ],
      max_tokens: 30 * limit,
      temperature: 1,
    }),
  });

  const data = await response.json();

  const gptResponse = data.choices[0].message.content;

  if (gptResponse.split(" ").length > limit) return "Apologies.";
  else return gptResponse;
}

import express from "express";
import bodyParser from "body-parser";
import serverless from "serverless-http";
import mime from "mime";
import cors from "cors";
import { getAnswer } from "./getAnswer.js";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = normalisePort(process.env.PORT || 8080);

app.use((req, res, next) => {
  const mimeType = mime.getType(req.path);
  if (mimeType) {
    res.setHeader("Content-Type", mimeType);
  }
  if (req.path.endsWith(".css")) {
    res.setHeader("Content-Type", "text/css");
  }
  next();
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "www.onewordgpt.app", "onewordgpt.app"],
      connectSrc: [
        "'self'",
        "www.onewordgpt.app",
        "onewordgpt.app",
        "https://onewordgpt3.ue.r.appspot.com",
      ],
      imgSrc: ["'self'", "data:"],
    },
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));


// The post route
app.post("/answer", async (req, res) => {
  const { question, limit } = req.body;

  sanitiseInput(question);

  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Please try again.");
    }, 15000); // 15 seconds timeout
  });

  const answerPromise = getAnswer(question, limit);

  const answer = await Promise.race([timeoutPromise, answerPromise])
  res.status(200).send(JSON.stringify({ response: answer }));
});

app.listen(port, () => {
  console.log("Server is running on port 8080.");
});

export const handler = serverless(app);

// Function to normalise a port value
function normalisePort(val) {
  const port = parseInt(val, 10); // Parse the port value as an integer

  if (isNaN(port)) {
    // Named pipe
    return val;
  }

  if (port >= 0) {
    // Port number
    return port;
  }

  return false; // Invalid port value
}

function sanitiseInput(input) {
  // Remove leading and trailing white spaces
  const sanitisedInput = input.trim();

  // Remove HTML tags
  const sanitisedText = sanitisedInput.replace(/<[^>]+>/g, "");

  // Return the sanitized input
  return sanitisedText;
}

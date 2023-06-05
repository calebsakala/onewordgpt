import express from "express";
import bodyParser from "body-parser";
import serverless from "serverless-http";
import path from "path";
import { fileURLToPath } from "url";
import mime from "mime";
import cors from "cors";
import { getAnswer } from "./getAnswer.js";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = normalizePort(process.env.PORT || 8080);
const __filename = fileURLToPath(import.meta.url);


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

// Enable Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:"], // Allow self and data URIs for images
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

// app.get("/", (req, res) => {
//   const indexPath = path.join(__dirname, "../index.html");
//   res.sendFile(indexPath);
// });

app.use(express.static('public'));

// app.get('/index.css', (req, res) => {
//   res.setHeader('Content-Type', 'text/css');
//   res.sendFile(path.join(__dirname, '../index.css'));
// });

// app.get('/controller.js', (req, res) => {
//   res.setHeader('Content-Type', 'application/javascript');
//   res.sendFile(path.join(__dirname, '../controller.js'));
// });

// app.get('/images/chatgptLogo.jpg', (req, res) => {
//   res.sendFile(path.join(__dirname, '../images/chatgptLogo.jpg'));
// });


app.post("/answer", async (req, res) => {
  const { question } = req.body;

  const answer = await getAnswer(question);
  res.status(200).send(JSON.stringify({ response: answer }));
});

app.listen(port, () => {
  console.log("Server is running on port 8080.");
});

export const handler = serverless(app);

// Function to normalize a port value
function normalizePort(val) {
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

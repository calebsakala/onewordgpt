import express from "express";
import bodyParser from "body-parser";
import serverless from 'serverless-http';
import cors from 'cors';
import { getAnswer } from "./getAnswer.js";

const app = express();
const router = express.Router();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/answer", async (req, res) => {
  const { question } = req.body;
  const answer = await getAnswer(question);
  res.status(200).send(JSON.stringify({response: answer}));
});

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});

app.use('/.netlify/functions/api', router);

export const handler = serverless(app);
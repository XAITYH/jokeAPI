import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
const API_URL = 'https://v2.jokeapi.dev/';

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs", { content: "Waiting for the name..." });
});

app.post("/get-joke", async (req, res) => {
  let fname = '';
  fname += req.body.fname;
  try {
    const result = await axios.get(
      `${API_URL}joke/Any?format=txt&contains=${fname}`)
    // console.log(fname);
    // console.log(result.data);
    res.render('index.ejs', { content: result.data });
  } catch (error) {
    res.render("index.ejs", { content: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs", { joke: "Waiting for the name..." });
});

app.post("/get-joke", async (req, res) => {
  const yourName = req.body.yourName;
  try {
    const result = await axios.get(
      `https://v2.jokeapi.dev/joke/Any?contains=${yourName}`, req.body,
      config
    );
    const jokeObj = await result.json();

    res.render('index.ejs', { joke: jokeObj.joke });
  } catch (error) {
    res.render("index.ejs", { joke: JSON.stringify(error) });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

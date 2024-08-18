import axios from "axios";
import bodyParser from "body-parser";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", async (req, res) => {
  res.render("index.ejs", { content: "Waiting for the word..." });
});

app.post("/get-joke", async (req, res) => {
  let fname = "";
  fname += req.body.fname;
  try {
    const result = await axios.get(
      `${API_URL}joke/Any?format=txt&contains=${fname}`
    );
    // console.log(fname);
    // console.log(result.data);
    res.render("index.ejs", {
      content:
        result.data != "Error 106" ? result.data : "No jokes found, sorry.",
    });
  } catch (error) {
    res.render("index.ejs", { content: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

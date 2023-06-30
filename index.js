const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

// db connection
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
// db connection

// jwt below
const jwt = require("jsonwebtoken");
// jwt above
app.use(cors());
app.use(express.json());

// this data below is used here to work back end with out database

const user = { userName: "Rahul", password: "Rahul@123" };
const myKey = "myKey";

// authenticaion middleware

const checkToken = (request, response, next) => {
  let authorise = request.headers["authorization"];
  if (!authorise) {
    response.json({ information: "send token" });
  } else {
    const token = authorise.split(" ")[1];
    jwt.verify(token, myKey, async (err, payload) => {
      if (err) {
        response.json({ information: "jwt is not valid" });
      } else {
        request.usename = payload.userName;
        next();
      }
    });
  }
};

// db based work
const dbConnectionFn = async () => {
  try {
    const client = await MongoClient.connect(url);
    console.log("db connction is on");

    const db = client.db("ott");
    const collectionOne = db.collection("video_collection");

    app.get("/", checkToken, async (request, response) => {
      const dataarr = await collectionOne.find({}).toArray();
      const homeData = dataarr.map((data) => ({
        ...data,
        _id: data._id.toString(),
      }));
      response.json(homeData);
    });

    app.get("/trending", checkToken, async (request, response) => {
      const dataArr = await collectionOne.find({ type: "trending" }).toArray();
      const trendingData = dataArr.map((data) => ({
        ...data,
        _id: data._id.toString(),
      }));
      response.json(trendingData);
    });

    app.get("/movie", checkToken, async (request, response) => {
      const dataArr = await collectionOne.find({ type: "movie" }).toArray();
      const movieData = dataArr.map((data) => ({
        ...data,
        _id: data._id.toString(),
      }));
      response.json(movieData);
    });

    app.get("/game", checkToken, async (request, response) => {
      const dataArr = await collectionOne.find({ type: "game" }).toArray();
      const gameData = dataArr.map((data) => ({
        ...data,
        _id: data._id.toString(),
      }));
      response.json(gameData);
    });
  } catch (err) {
    console.log("error", err);
  }
};

dbConnectionFn();

// this data above is used here to work back end with out database

app.post("/login", (request, response) => {
  const { username, password } = request.body;
  if (username && password) {
    if (username === user.userName && password === user.password) {
      const payLoad = {
        userName: user.userName,
      };

      const token = jwt.sign(payLoad, myKey);
      response.json({ jwt: token });
    } else {
      response.json({ information: "incorrect user details" });
    }
  } else {
    response.json({ information: "send proper data" });
  }
});

app.listen(PORT, () => {
  console.log(`the sever is listening on http://localhost:${PORT}`);
});

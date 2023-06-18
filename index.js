const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

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

app.get("/", checkToken, (request, response) => {
  response.json([
    {
      video_url: "https://www.youtube.com/watch?v=xLCn88bfW1o",
      name: "Venom official trailer-2",
      img_url: "https://images7.alphacoders.com/948/thumbbig-948853.webp",
    },
    {
      video_url: "https://www.youtube.com/watch?v=aWzlQ2N6qqg&t=49s",
      name: "Doctor Strange in the Multiverse of Madness",
      img_url:
        "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202206/NJXQ8h3mUd9mhsh2m8xpba.jpg?VersionId=mVpE3eHaQw5lJN5IBfmso4J2LuW7.PqZ",
    },
    {
      video_url: "https://www.youtube.com/watch?v=17ywQS6XO-M",
      name: "Harry Potter and the Deathly Hallows Pt. 1 & 2 | Official Trailer",
      img_url:
        "https://lafrikileria.com/blog/wp-content/uploads/2023/02/varitas-harry-potter.jpg",
    },
  ]);
});

app.get("/trending", checkToken, (request, response) => {
  response.json([
    {
      video_url: "https://www.youtube.com/watch?v=xLCn88bfW1o",
      name: "Venom official trailer-2",
      img_url: "https://images7.alphacoders.com/948/thumbbig-948853.webp",
    },
    {
      video_url: "https://www.youtube.com/watch?v=aWzlQ2N6qqg&t=49s",
      name: "Doctor Strange in the Multiverse of Madness",
      img_url:
        "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202206/NJXQ8h3mUd9mhsh2m8xpba.jpg?VersionId=mVpE3eHaQw5lJN5IBfmso4J2LuW7.PqZ",
    },
    {
      video_url: "https://www.youtube.com/watch?v=17ywQS6XO-M",
      name: "Harry Potter and the Deathly Hallows Pt. 1 & 2 | Official Trailer",
      img_url:
        "https://lafrikileria.com/blog/wp-content/uploads/2023/02/varitas-harry-potter.jpg",
    },
  ]);
});

app.get("/movie", checkToken, (request, response) => {
  response.json([
    {
      video_url: "https://www.youtube.com/watch?v=NAIzQFZACcw",
      name: "THE DETECTIVE",
      img_url: "https://i.ytimg.com/vi/NAIzQFZACcw/sddefault.jpg",
    },
    {
      video_url: "https://www.youtube.com/watch?v=VNemf4gKeDA",
      name: "INDO SUB (Sniper Vengeance)",
      img_url:
        "https://image.tmdb.org/t/p/original/4O75kTTR91as9ecAQMazZGYmXLB.jpg",
    },
  ]);
});

app.get("/game", checkToken, (request, response) => {
  response.json([
    {
      video_url: "https://www.youtube.com/watch?v=tv7LfFeamsc",
      name: "Call of Duty",
      img_url:
        "https://cdn.ytechb.com/wp-content/uploads/2019/12/Call-of-duty-ghosts-wallpaper-1.jpg",
    },
    {
      video_url: "https://www.youtube.com/watch?v=4SHaDwa1J0k",
      name: "I.G.I. Origins",
      img_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz7LA81i2onTY50jNY7N8eNKm6t_HyW3WhTQ&usqp=CAU",
    },
    {
      video_url: "https://www.youtube.com/watch?v=vmH1gUJS5sw",
      name: "BATTLESHIP: Video Game",
      img_url:
        "https://coolwallpapers.me/picsup/6014740-german-art-battleship-military-ship-fleet.jpg",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`the sever is listening on http://localhost:${PORT}`);
});

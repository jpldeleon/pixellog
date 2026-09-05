const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- View engine & middleware ----------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ---------- In-memory data store ----------
// No database, no external APIs — just a plain array living in server memory.
let posts = [
  {
    id: 1,
    title: "Nintendo Family Computer",
    category: "Gaming",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbRUSAMQ2z4EnSKUYr9rCOFprcdhgWfC1RVw2g4z_qj7UjzHUL5WSE4r9j&s=10",
    content:
      "Man, looking back, the Famicom era was just peak childhood with that distinct dark-red and white plastic box plugged into the TV as the center of the universe. Long afternoons after school were spent huddled in front of the screen with friends taking turns, passing the controller when someone finally died on Contra while praying someone remembered the Konami code (Up, Up, Down, Down, Left, Right, Left, Right, B, A, Start for those thirty lives), or trying not to fight over who got to play Mario (and hunting down every hidden 1-up mushroom to stack extra lives). The controls were hardwired right into the console, the cartridges were chunky, and half the time you would be blowing into the bottom of a game just to get it to boot up. Games like Super Mario, Contra, Pac-Man, and Bomberman were simple, but they caused absolute chaos in the room with zero patches or internet, just pure couch co-op and endless replay value.",
    createdAt: new Date("2024-01-15T10:30:00").toISOString(),
  },
  {
    id: 2,
    title: "Brick Game",
    category: "Gaming",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwrroaaHezb0FkIeuNqCRZZ7tSEynGz-OXDOydTDLKiQ&s=10",
    content:
      "That Brick Game was my very first handheld console, and firing it up for the first time to play classics like Tetris or that insanely addictive racing game where you had to dodge oncoming cars made me feel like I had the future right in my hands.",
    createdAt: new Date("2024-02-02T14:00:00").toISOString(),
  },
  {
    id: 3,
    title: "Atari 2600",
    category: "Gaming",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/02/Atari-2600-Wood-4Sw-Set.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    content:
      "In the mid-90s, my Atari 2600 and its lineup of classics like Pac-Man, Ms. Pac-Man, Donkey Kong, Mario Bros., and Pole Position provided a bit of after-school fun, but those blocky graphics and repetitive synth beeps made me get bored real fast. The fate of my Atari was sealed the moment Yu Yu Hakusho aired on IBC 13; Yusuke Urameshi and the Spirit Gun completely stole the show, prompting me to dump the stiff joystick for good and lock the TV channel on pure anime hype every single afternoon.",
    createdAt: new Date("2024-02-20T09:15:00").toISOString(),
  },
  {
    id: 4,
    title: "Teks",
    category: "Nostalgia",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTByUEzffZcuPPnpuRyzi38tFbswHKwhOM1pLH3UzE89w&s=10",
    content:
      "Roaming around different streets with my best friend to challenge random kids and hustle for their teks cards was peak childhood gambling, especially when we were armed with our favorite movie cards bought straight from the local sari-sari store.",
    createdAt: new Date("2024-02-20T09:15:00").toISOString(),
  },
  {
    id: 5,
    title: "Teks",
    category: "Nostalgia",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9c/Spider_fight_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
    content:
      "Hunting for fighting spiders deep in the woods with my friends was an absolute mission, and keeping them safe in matchboxes lined with damp leaves made us feel like fierce little trainers. We used to feed them just enough and keep them hungry right before fight day to make sure they were aggressive and ready to dominate the arena. Looking back, carrying around a tiny matchbox arsenal of spiders and walking up to other kids to challenge them on the streets was pure, unadulterated childhood adrenaline.",
    createdAt: new Date("2024-02-20T09:15:00").toISOString(),
  },
];

let nextId = 4;

// ---------- Helpers ----------
function findPost(id) {
  return posts.find((p) => p.id === Number(id));
}

const CATEGORIES = ["Hardware", "Gaming", "Nostalgia"];

// ---------- Routes ----------

// GET / — render the centered feed with all posts, newest first
app.get("/", (req, res) => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.render("index", { posts: sortedPosts, categories: CATEGORIES });
});

// POST /create — push a new post into the in-memory array
app.post("/create", (req, res) => {
  const { title, category, imageUrl, content } = req.body;

  if (!title || !title.trim() || !content || !content.trim()) {
    return res.redirect("/");
  }

  const newPost = {
    id: nextId++,
    title: title.trim(),
    category: category && category.trim() ? category.trim() : "Nostalgia",
    imageUrl: imageUrl && imageUrl.trim() ? imageUrl.trim() : "",
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  res.redirect("/");
});

// GET /edit/:id — load the retro-styled edit screen for a post
app.get("/edit/:id", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) {
    return res.redirect("/");
  }
  res.render("edit", { post, categories: CATEGORIES });
});

// POST /edit/:id — update the existing post in memory
app.post("/edit/:id", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) {
    return res.redirect("/");
  }

  const { title, category, imageUrl, content } = req.body;

  post.title = title && title.trim() ? title.trim() : post.title;
  post.category = category && category.trim() ? category.trim() : post.category;
  post.imageUrl = imageUrl !== undefined ? imageUrl.trim() : post.imageUrl;
  post.content = content && content.trim() ? content.trim() : post.content;

  res.redirect("/");
});

// POST /delete/:id — filter the post out of the in-memory array
app.post("/delete/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== Number(req.params.id));
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`PixelLog is running at http://localhost:${PORT}`);
});

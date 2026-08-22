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
    title: "A Childhood Summer & Rediscovering Spirited Away",
    category: "Anime",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSINJHZKscWPPgIL0sTcPF6pnqcLODb2g1jLHgS_qmfOw&s=10",
    content:
      "Spirited Away was the very first anime film I ever remember watching. Every summer break, my siblings and I would head off to the province, and during one of those quiet afternoons, this magical movie played on screen. Back then as a kid, I didn't truly grasp the deeper themes or what Chihiro's journey meant—it was just an enchanting, strange world. Years later as an adult, I came back to rewatch it, and everything finally clicked. It is such an incredible masterpiece: adventurous, wonderfully chill, and completely free of artificial stress. That comforting, feel-good atmosphere is exactly what makes Studio Ghibli films so special, and it inspired my current goal to rewatch and complete their entire filmography.",
    createdAt: new Date("2024-01-15T10:30:00").toISOString(),
  },
  {
    id: 2,
    title: "YuYu Hakusho / Ghost Fighter",
    category: "Anime",
    imageUrl:
      "https://static0.cbrimages.com/wordpress/wp-content/uploads/sharedimages/2024/10/yu-yu-hakusho-poster.jpg?q=49&fit=contain&w=480&dpr=2",
    content:
      "Running back home straight after the final school bell was an absolute ritual, and the reason was non-negotiable: Yu Yu Hakusho on IBC 13. Missing even a single minute meant missing out on the absolute coolest demon on TV, Hiei (or Vincent in the iconic Tagalog dub). His Jaganshi Dragon of the Darkness Flame instantly made him my favorite character, and watching him slice through enemies made every afternoon rush worth it. That era of Philippine television possessed a special kind of magic that no retro video game could ever match, permanently cementing my love for classic anime.",
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
];

let nextId = 4;

// ---------- Helpers ----------
function findPost(id) {
  return posts.find((p) => p.id === Number(id));
}

const CATEGORIES = ["Hardware", "Gaming", "Nostalgia", "Anime"];

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

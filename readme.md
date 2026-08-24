# PixelLog 🎮📼

> a retro feed for gadgets, anime, games & tech stories worth remembering

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#-license) [![Node.js](https://img.shields.io/badge/node.js-v18%2B-green.svg)](#-tech-stack) [![Deployment](https://img.shields.io/badge/deployed%20on-Render-informational)](#-live-demo)

---

## 📼 About This Project

PixelLog is a capstone project built for [The Complete Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) - a full-stack blog application built with **Node.js**, **Express**, and **EJS**.

The assignment was open-ended: build a blog app that lets users create, view, edit, and delete posts. I decided to make mine personal. I've always been a sucker for **retro tech and nostalgia** - CRT scanlines, 8-bit UI chrome, the specific *thunk* of a joystick, afternoons spent in front of a TV waiting for an anime rerun. So instead of a generic blog, PixelLog became a place to log those memories: the shows, games, and gadgets that shaped how I grew up, styled like something you'd boot up on an old console.

Every design decision - the pixel borders, the D-pad-style navigation, the CRT-glow color palette - was an excuse to indulge that love of retro design while still hitting every technical requirement of the brief.

---

## 🚀 Live Demo

👉 **[https://pixellog-dev.onrender.com](https://pixellog-dev.onrender.com)**

*(Hosted on Render's free tier - the server may take a few seconds to spin up on first load.)*

---

## ✨ Features

- **📝 Post Creation** - Add a new memory with a title, category, image URL, and story, right from the home feed.
- **🗂️ Post Viewing** - All posts render newest-first in a scrollable feed, each shown as a retro-styled card.
- **🔍 Lightbox Detail View** - Click any post card to open a full-screen 8-bit-style lightbox with the full story, category badge, and timestamp.
- **✏️ Post Editing** - Update the title, category, image, or content of any existing memory.
- **🗑️ Post Deletion** - Remove a memory permanently, with a confirmation prompt to prevent accidental deletes.
- **🎨 Retro Styling** - Custom pixel-border UI, a D-pad-inspired navigation pill, and a light/dark theme toggle, all built without a CSS framework.
- **🖼️ Graceful Image Fallbacks** - Broken or missing image URLs fall back to a pixel-art "IMAGE NOT FOUND" placeholder instead of a broken image icon.
- **📱 Responsive Layout** - Designed to work comfortably on both desktop and mobile.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Templating:** EJS
- **Frontend:** HTML5, CSS3 (hand-written, no framework), vanilla JavaScript
- **Data Storage:** In-memory array (no database - data resets when the server restarts, per the assignment spec)
- **Hosting:** Render

---

## 💻 Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jpldeleon/pixellog.git
   cd pixellog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   node index.js
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
pixellog/
├── index.js           # Express server, routes, in-memory post store
├── views/
│   ├── index.ejs       # Home feed + create form + lightbox
│   └── edit.ejs         # Edit screen for an existing post
├── public/
│   └── styles.css       # Retro/pixel styling
├── package.json
└── readme.md
```

---

## 🗺️ Routes

| Method | Route         | Description                        |
|--------|---------------|-------------------------------------|
| GET    | `/`           | Render the home feed of all posts   |
| POST   | `/create`     | Create a new post                   |
| GET    | `/edit/:id`   | Load the edit screen for a post     |
| POST   | `/edit/:id`   | Save changes to an existing post    |
| POST   | `/delete/:id` | Delete a post                       |

---

## 🎯 What I Learned

Building PixelLog reinforced the fundamentals of server-rendered apps: routing with Express, passing dynamic data into EJS templates, and handling form submissions without a database or client-side framework to lean on. It also pushed me to think more carefully about small UX details - image fallbacks, confirmation prompts before destructive actions, and keeping a consistent visual language (down to the button labels) across every screen.

---

## 📝 License

This project is licensed under the MIT License.
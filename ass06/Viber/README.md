# 🎵 React Redux Music Player

A modern music streaming web app built with **React**, **Redux Toolkit**, **Tailwind CSS**, and the Shazam Core API. It lets you discover top charts, view artists, get song details and lyrics, and play songs with a responsive, clean music player UI.

---

## 🚀 Features

✅ Discover top charts  
✅ Play/pause any song  
✅ View lyrics and song details  
✅ See top artists  
✅ Fully responsive design  
✅ Smooth animations  
✅ Redux-powered state management  
✅ Tailwind CSS styling  

---

## 📂 Folder Structure

The project follows a standard feature-sliced design pattern to keep the code organized, scalable, and easy to maintain.

```
src/
│
├── assets/
│ └── constants.js
│
├── components/
│ ├── DetailsHeader.jsx
│ ├── Error.jsx
│ ├── Loader.jsx
│ ├── MusicPlayer.jsx
│ ├── PlayPause.jsx
│ ├── RelatedSongs.jsx
│ ├── Searchbar.jsx
│ ├── Sidebar.jsx
│ ├── SongCard.jsx
│ └── TopPlay.jsx
│
├── pages/
│ ├── AroundYou.jsx
│ ├── ArtistDetails.jsx
│ ├── Discover.jsx
│ ├── Search.jsx
│ ├── SongDetails.jsx
│ ├── TopArtists.jsx
│ └── TopCharts.jsx
│
├── redux/
│ ├── features/
│ │ └── playerSlice.js
│ └── services/
│ └── shazamCore.js
│
├── App.jsx
├── main.jsx
└── index.css
```
---

## ⚙️ Installation

1️⃣ **Clone the repository:**

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
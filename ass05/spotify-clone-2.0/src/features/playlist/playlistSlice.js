import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlists: [],
  likedSongs: [], // NEW: An array to hold the IDs of liked songs
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    createPlaylist: (state) => {
      const newPlaylist = {
        id: `playlist-${Date.now()}`,
        name: `My Playlist #${state.playlists.length + 1}`,
        songs: [],
      };
      state.playlists.push(newPlaylist);
    },
    // NEW: Action to like or unlike a song
    toggleLikeSong: (state, action) => {
      const songId = action.payload;
      const isLiked = state.likedSongs.includes(songId);

      if (isLiked) {
        // If already liked, remove it (unlike)
        state.likedSongs = state.likedSongs.filter((id) => id !== songId);
      } else {
        // If not liked, add it
        state.likedSongs.push(songId);
      }
    },
  },
});

// Export the new action
export const { createPlaylist, toggleLikeSong } = playlistSlice.actions;
export default playlistSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      state.currentSongs = action.payload.data;
      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    nextSong: (state, action) => {
      const nextIndex = action.payload;
      state.activeSong = state.currentSongs[nextIndex];
      state.currentIndex = nextIndex;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      const prevIndex = action.payload;
      state.activeSong = state.currentSongs[prevIndex];
      state.currentIndex = prevIndex;
      state.isActive = true;
    },
  },
});

// This line is critical. We are exporting the action creators.
export const { setActiveSong, playPause, nextSong, prevSong } = playerSlice.actions;

export default playerSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../features/player/playerSlice';
import playlistReducer from '../features/playlist/playlistSlice'; // Import the new reducer

export const store = configureStore({
  reducer: {
    player: playerReducer,
    playlist: playlistReducer, // Add it to the store
  },
});
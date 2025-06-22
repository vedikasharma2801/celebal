import React from 'react';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../../features/player/playerSlice';
import styles from './SongCard.module.css';
import { FaPlay } from 'react-icons/fa';

const SongCard = ({ song, i, data }) => {
  const dispatch = useDispatch();

  // This function is called when you click on the card
  const handlePlayClick = () => {
    // Dispatch an action to set the current song in the Redux store
    // This uses the 'setActiveSong' action creator we imported
    dispatch(setActiveSong({ song, data, i }));

    // Dispatch an action to start playback
    // This uses the 'playPause' action creator we imported
    dispatch(playPause(true));
  };

  return (
    // The onClick handler is correctly assigned here
    <div className={styles.card} onClick={handlePlayClick}>
      <img src={song.albumArt} alt={song.title} />
      <div className={styles.playIcon}>
        <FaPlay />
      </div>
      <div className={styles.info}>
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
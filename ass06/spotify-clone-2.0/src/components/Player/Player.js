import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playPause, nextSong, prevSong } from '../../features/player/playerSlice';
import { toggleLikeSong } from '../../features/playlist/playlistSlice';
import styles from './Player.module.css';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeart, FaRegHeart } from 'react-icons/fa';

const Player = () => {
  const { activeSong, isPlaying, currentIndex, currentSongs } = useSelector((state) => state.player);
  const { likedSongs } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const isLiked = activeSong ? likedSongs.includes(activeSong.id) : false;

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeSong]);

  const handlePlayPause = () => {
    if (!activeSong) return;
    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    if (!currentSongs || currentSongs.length === 0) return;
    const nextIndex = (currentIndex + 1) % currentSongs.length;
    dispatch(nextSong(nextIndex));
    dispatch(playPause(true));
  };
  
  const handlePrevSong = () => {
    if (!currentSongs || currentSongs.length === 0) return;
    const prevIndex = (currentIndex - 1 + currentSongs.length) % currentSongs.length;
    dispatch(prevSong(prevIndex));
    dispatch(playPause(true));
  };

  const handleLikeToggle = () => {
    if (activeSong) {
      dispatch(toggleLikeSong(activeSong.id));
    }
  };

  return (
    <div className={styles.player}>
      <div className={styles.songInfo}>
        <img src={activeSong?.albumArt} alt={activeSong?.title} />
        <div>
          <h4>{activeSong?.title || 'No song playing'}</h4>
          <p>{activeSong?.artist || '...'}</p>
        </div>
        <button onClick={handleLikeToggle} className={styles.likeButton}>
          {isLiked ? <FaHeart className={styles.likedIcon} /> : <FaRegHeart />}
        </button>
      </div>

      {/* THIS IS THE SECTION THAT WAS MISSING AND IS NOW RESTORED */}
      <div className={styles.controls}>
        <FaStepBackward className={styles.controlBtn} onClick={handlePrevSong} />
        {isPlaying ? (
          <FaPause className={`${styles.controlBtn} ${styles.playBtn}`} onClick={handlePlayPause} />
        ) : (
          <FaPlay className={`${styles.controlBtn} ${styles.playBtn}`} onClick={handlePlayPause} />
        )}
        <FaStepForward className={styles.controlBtn} onClick={handleNextSong} />
      </div>

      <div className={styles.volumeControls}>
        {/* Placeholder for volume controls */}
      </div>
      
      <audio
        ref={audioRef}
        src={activeSong?.audioSrc}
        onEnded={handleNextSong}
      />
    </div>
  );
};

export default Player;
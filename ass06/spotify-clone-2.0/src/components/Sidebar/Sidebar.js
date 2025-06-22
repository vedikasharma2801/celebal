import React from 'react';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { IoHome, IoSearch, IoLibrary } from 'react-icons/io5';
import { FaPlus, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createPlaylist } from '../../features/playlist/playlistSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  // Get both user-created playlists and liked songs from the Redux store
  const { playlists, likedSongs } = useSelector((state) => state.playlist);

  const handleCreatePlaylist = () => {
    dispatch(createPlaylist());
  };

  // A simple boolean to check if there are any liked songs
  const hasLikedSongs = likedSongs.length > 0;

  return (
    <div className={styles.sidebar}>
      {/* Top section for Home and Search navigation */}
      <div className={styles.navigation}>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
              <IoHome /><span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={({ isActive }) => (isActive ? styles.active : '')}>
              <IoSearch /><span>Search</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main library section */}
      <div className={styles.yourLibrary}>
        <div className={styles.libraryHeader}>
          <button className={styles.libraryButton}>
            <IoLibrary />
            <span>Your Library</span>
          </button>
          <button onClick={handleCreatePlaylist} className={styles.plusButton}>
            <FaPlus />
          </button>
        </div>
        
        <div className={styles.playlistContainer}>
            {/* Conditionally render the "Liked Songs" playlist first */}
            {hasLikedSongs && (
              <div className={styles.playlistItem}>
                <div className={`${styles.playlistArt} ${styles.likedSongsArt}`}>
                  <FaHeart />
                </div>
                <div className={styles.playlistInfo}>
                  <span>Liked Songs</span>
                  <p>Playlist • {likedSongs.length} songs</p>
                </div>
              </div>
            )}

            {/* Render all user-created playlists */}
            {playlists.map(playlist => (
                <div key={playlist.id} className={styles.playlistItem}>
                    <div className={styles.playlistArt}></div>
                    <div className={styles.playlistInfo}>
                        <span>{playlist.name}</span>
                        <p>Playlist</p>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Info boxes at the bottom */}
        <div className={styles.infoBox}>
            <h4>Create your first playlist</h4>
            <p>It's easy, we'll help you</p>
            <button onClick={handleCreatePlaylist}>Create playlist</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
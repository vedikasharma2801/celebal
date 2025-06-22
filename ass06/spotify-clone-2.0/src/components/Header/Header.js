import React from 'react';
import styles from './Header.module.css';
import { FaSearch } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

// Accept props for search functionality
const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <header className={styles.header}>
      <div className={styles.navButtons}>
        <button><IoChevronBack /></button>
        <button><IoChevronForward /></button>
      </div>
      
      <div className={styles.searchBar}>
        <FaSearch />
        <input 
          type="text" 
          placeholder="What do you want to play?" 
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      <div className={styles.userButtons}>
        <button className={styles.signUp}>Sign up</button>
        <button className={styles.logIn}>Log in</button>
      </div>
    </header>
  );
};

export default Header;
import React, { useState, useMemo } from 'react';
import styles from './Search.module.css';
// CORRECTED IMPORT: We only import 'allSongs' which we know exists.
import { allSongs } from '../../data/mockData'; 
import SongCard from '../../components/SongCard/SongCard';
import { FaSearch } from 'react-icons/fa';

// THE FIX: Define the category data directly inside the component file.
// This makes the component self-contained and avoids errors.
const browseCategories = [
  { id: 'c1', title: 'Podcasts', color: '#006450', image: 'https://images.pexels.com/photos/1261820/pexels-photo-1261820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'c2', title: 'Live Events', color: '#8400E7', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'c3', title: 'Made For You', color: '#1E3264', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'c4', title: 'New releases', color: '#E8115B', image: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'c5', title: 'Pop', color: '#148A08', image: 'https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'c6', title: 'Indie', color: '#D84000', image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'c7', title: 'Hip-Hop', color: '#BA5D07', image: 'https://images.pexels.com/photos/2589410/pexels-photo-2589410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'c8', title: 'Rock', color: '#E13300', image: 'https://images.pexels.com/photos/1652361/pexels-photo-1652361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];

const CategoryCard = ({ category }) => {
  return (
    <div className={styles.categoryCard} style={{ backgroundColor: category.color }}>
      <h3>{category.title}</h3>
      <img src={category.image} alt={category.title} />
    </div>
  );
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = useMemo(() => {
    if (!searchTerm) return [];
    
    return allSongs.filter(song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const displayResults = searchTerm.length > 0;

  return (
    <div className={styles.searchPage}>
      <header className={styles.header}>
        <div className={styles.searchBar}>
          <FaSearch />
          <input
            type="text"
            placeholder="What do you want to play?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
      </header>
      
      <main className={styles.content}>
        {displayResults ? (
          <>
            {filteredSongs.length > 0 ? (
              <div className={styles.resultsGrid}>
                {filteredSongs.map((song, i) => (
                  <SongCard key={song.id} song={song} i={i} data={filteredSongs} />
                ))}
              </div>
            ) : (
              <p className={styles.noResults}>No results found for "{searchTerm}"</p>
            )}
          </>
        ) : (
          <>
            <h2 className={styles.browseHeader}>Browse all</h2>
            <div className={styles.categoryGrid}>
              {browseCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Search;
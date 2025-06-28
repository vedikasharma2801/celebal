import React from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import SongCard from '../../components/SongCard/SongCard';
import { allSongs, popularArtists } from '../../data/mockData';

// Let's feature the first 6 songs on the homepage
const trendingSongs = allSongs.slice(0, 6);

const ArtistCard = ({ artist }) => (
    <div className={styles.artistCard}>
        <img src={artist.image} alt={artist.name}/>
        <h4>{artist.name}</h4>
        <p>Artist</p>
    </div>
);

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <main className={styles.content}>
        <section>
          <div className={styles.headerTitle}><h2>Trending songs</h2><a href="#see-all">Show all</a></div>
          <div className={styles.grid}>
            {trendingSongs.map((song, i) => (
              <SongCard key={song.id} song={song} i={i} data={trendingSongs} />
            ))}
          </div>
        </section>
        <section>
          <div className={styles.headerTitle}><h2>Popular artists</h2><a href="#see-all">Show all</a></div>
          <div className={styles.grid}>
            {popularArtists.map(artist => ( <ArtistCard key={artist.id} artist={artist} /> ))}
          </div>
        </section>
      </main>
    </div>
  );
};
export default Home;
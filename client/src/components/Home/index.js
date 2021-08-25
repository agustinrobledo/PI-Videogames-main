import React from 'react';
import { SearchBar } from '../SearchBar';
import { VideogameList } from '../VideogameList';
import './home.scss'
export function Home() {
  return (
    <div className="home-main">
      <SearchBar/>
      <VideogameList/>
    </div>
  );
}
export default Home;
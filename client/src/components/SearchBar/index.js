import React from 'react';
import './searchbar.scss'
export function SearchBar (){
    return(
        <div className="search-bar">
            <form className="search-form">
                <input type="text" className="input-search" placeholder="Search a videogame" />
                <button type="submit" className="search-logo"><i className="fa fa-search"></i></button>
            </form>
        </div>
    )
} 

export default SearchBar;
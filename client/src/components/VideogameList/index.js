import React, {useEffect, useState } from 'react';
import {fetchListGames, fetchGenreList} from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import './videogamelist.scss'
import { Link } from 'react-router-dom';


export function VideogameList() {
    const dispatch = useDispatch();
    const listGames = useSelector(state => state.games);
    console.log(listGames);
    useEffect(() => {
        dispatch(fetchListGames());
    }, [dispatch]);
    const listGenres = useSelector(state => state.genres);
    useEffect(() => {
        dispatch(fetchGenreList());
    }, [dispatch]);
    console.log(listGenres);
    //paginado de los juegos
    const [currentPage, setCurrentPage] = useState(0);
    const[filters, setFilters] = useState({
        search: "",
        filter: "",
        sort: "",
        sortOrigin: ""
    });

    const filteredGames = () => {
        // API array de objetos juegos... game_genres
        // DB array de objetos juegos... genres ... [name]
        
        if (filters.search.length > 0) return listGames.filter(game => game.name.toLowerCase().includes(filters.search.toLowerCase())).slice(currentPage, currentPage + 9);
        if (filters.filter.length > 0) return listGames.filter(game => game.game_genres.split(', ').includes(filters.filter)).slice(currentPage, currentPage + 9);
        if (filters.sort === 'A-Z') return listGames.sort((a, b) => a.name.localeCompare(b.name)).slice(currentPage, currentPage + 9);
        if (filters.sort === 'Z-A') return listGames.sort((a, b) => b.name.localeCompare(a.name)).slice(currentPage, currentPage + 9);
        if (filters.sortOrigin === 'API') return listGames.filter(game => !(isNaN(game.id))).slice(currentPage, currentPage + 9);
        if (filters.sortOrigin === 'Database') return listGames.filter(game => isNaN(game.id)).slice(currentPage, currentPage + 9);
        else return listGames.slice(currentPage, currentPage + 9)
    }
    const nextPage = () => {
            setCurrentPage(currentPage + 9);
    
    }
    const prevPage = () => {
        setCurrentPage(currentPage - 9);
    }
    const handleChange = (e) => {
        setCurrentPage(0);
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }


      return (
        <>
            <div className="search-bar">
                <div className="search-form">
                    <input
                        name="search" 
                        value={filters.search}
                        onChange={handleChange}
                        type="text" 
                        className="input-search" 
                        placeholder="Search a videogame" 
                    />
                    <button type="submit" disabled className="search-logo"><i className="fa fa-search"></i></button>
                </div>
            </div>
            <div className="filters">
                <div className="genre-filter">
                    <h1>
                        Filter by genre:
                    </h1>
                    <select
                        name="filter"
                        value={filters.filter}
                        onChange={handleChange}
                        className="select-genre"
                    >
                        <option value=""></option>
                    {
                        listGenres.map(genre => 
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                        )
                    }     
                    </select>
                </div>
                <div>
                    <h1>
                        Sort by origin:
                    </h1>
                    <select
                        name="sortOrigin"
                        value={filters.sortOrigin}
                        onChange={handleChange}
                        className="select-origin"
                    >
                        <option value=""></option>
                        <option value="API">API</option>
                        <option value="Database">Database</option> 
                    </select>
                </div>
                <div className="sort-filter">
                <h1>
                    Sort by:
                </h1>
                <select
                    name="sort"
                    value={filters.sort}
                    onChange={handleChange}
                    className="select-sort"
                >
                    <option value="">
                    </option>
                    <option value="A-Z">
                        A-Z
                    </option>
                    <option value="Z-A">
                        Z-A
                    </option>
                </select>
                </div>
            </div>
            {listGames.length === 0 ?<div className="spinner-container"> <div class="spinner"></div></div> : 
             filteredGames().length === 0 ? <h1 className="games-not-found">No games found</h1> :  
            <div className="list-container">
                {filteredGames().map(game =>
                    <div className="list-item" key={game.id}>
                            <div className="list-item-name">
                                <h1>{game.name}</h1>
                            </div>
                            <div className="list-item-genres">
                                <h4>{game.game_genres}</h4>
                            </div>
                            <div className="list-item-img">
                                <img 
                                src={game.background_image ? 
                                game.background_image 
                                : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"} 
                                alt={game.name}/>
                            </div>
                           <div className="link-container">
                            <Link className="list-item-link" to={`/videogames/${game.id}`}>
                               <p> More info </p>
                            </Link>
                           </div>
                    </div>
                )}
            </div >
        }
            <div className="pagination">
                <button 
                    className="pagination-button"
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    
                >
                    Previous
                </button>
                <button
                    className="pagination-button"
                    onClick={nextPage}
                    disabled={filteredGames().length < 9}
                >
                    Next
                </button>
            </div>
        </>
    );
                                
}

 

export default VideogameList
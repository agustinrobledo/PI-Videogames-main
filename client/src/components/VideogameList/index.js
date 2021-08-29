import React, {useEffect, useState } from 'react';
import {fetchListGames, fetchGenreList} from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import './videogamelist.scss'


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
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const filteredGames = () => {
        if (search.length === 0 && filter.length === 0 && sort.length === 0) {
            return listGames.slice(currentPage, currentPage + 9);
        }
        else if (search.length > 0) return listGames.filter(game => game.name.toLowerCase().includes(search.toLowerCase())).slice(currentPage, currentPage + 9);
        else if (filter.length > 0) return listGames.filter(game => game.game_genres.split(', ').includes(filter)).slice(currentPage, currentPage + 9);
        else if (sort === 'A-Z') return listGames.sort((a, b) => a.name.localeCompare(b.name)).slice(currentPage, currentPage + 9);
        else if (sort === 'Z-A') return listGames.sort((a, b) => b.name.localeCompare(a.name)).slice(currentPage, currentPage + 9);
    }
    const nextPage = () => {
        if(listGames.filter(game => game.name.toLowerCase().includes(search.toLowerCase())).length > currentPage + 9){
            setCurrentPage(currentPage + 9);
        }
    
    }
    const prevPage = () => {
        setCurrentPage(currentPage - 9);
    }
    const onSearchChange = (event) => {
        setCurrentPage(0);
        setSearch(event.target.value);
    }
    const onFilterChange = (event) => {
        setCurrentPage(0);
        setFilter(event.target.value);
    }
    const onSortChange = (event) => {
        setCurrentPage(0);
        setSort(event.target.value);
    }


    return (
        <>
            <div className="search-bar">
                <form className="search-form">
                    <input 
                        value={search}
                        onChange={onSearchChange}
                        type="text" 
                        className="input-search" 
                        placeholder="Search a videogame" 
                    />
                    <button type="submit" className="search-logo"><i className="fa fa-search"></i></button>
                </form>
            </div>
            <div className="filters">
                <div className="genre-filter">
                    <h1>
                        Filter by genre:
                    </h1>
                    <select
                        value={filter}
                        onChange={onFilterChange}
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
                <div className="sort-filter">
                <h1>
                    Sort by:
                </h1>
                <select
                    value={sort}
                    onChange={onSortChange}
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



            <div className="list-container">
                {filteredGames().map(game =>
                    <div className="list-item" key={game.id}>
                            <div className="list-item-name">
                                <h1>{game.name}</h1>
                            </div>
                            <div className="list-item-description">
                                <h4>{game.game_genres}</h4>
                            </div>
                            <div className="list-item-img">
                                <img src={game.background_img} alt={game.name}/>
                            </div>
                    </div>
                )}
            </div>
            <button
                onClick={prevPage}
                disabled={currentPage === 0}
                
            >
                Anterior
            </button>
            <button
                onClick={nextPage}
                disabled={currentPage + 9 >= listGames.length}
            >
                Siguiente
            </button>
        </>
    );
}

 

export default VideogameList
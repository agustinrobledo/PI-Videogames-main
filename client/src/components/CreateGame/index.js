import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenreList } from "../../actions";

import './creategame.scss'

export default function CreateGame() {
    const dispatch = useDispatch();
    const genreList = useSelector(state => state.genres);
    useEffect(() => {
        dispatch(fetchGenreList());
    }, [dispatch]);
    const [newGame, setNewGame] = useState({
        name: "",
        description: "",
        release_date: "",
        rating: "",
        game_genres: [],
        plataforms: "",
    });
    //handleChange para cada checkbox

    const handleChangeGenres = (e) => {
        if(newGame.game_genres.includes(e.target.value)){
            setNewGame({
                ...newGame,
                game_genres: newGame.game_genres.filter(genre => genre !== e.target.value)
            })
        }
        else{
            setNewGame({
                ...newGame,
                game_genres: [...newGame.game_genres, e.target.value]
            })
        }
    };
    const handleChange = (e) => {
        setNewGame({
            ...newGame,
            [e.target.name]: e.target.value
        });
    };
   
    async function handleSubmit(e) {
        e.preventDefault();
        
        const response = await fetch("http://localhost:3001/videogames", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(newGame),
        });
        const data = await response.json();
        console.log(data);
        
    };







  return (
    <div className="creategame-main">
      <h1>Create Game</h1>
      <p>Create your game</p>
      <form className="form-container">
        <label>
          Game Name:
          <input type="text" name="name" value={newGame.name} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea type="text" name="description" value={newGame.description} onChange={handleChange} />
        </label>
        <label>
          Release Date:
          <input type="date" name="release_date" value={newGame.release_date} onChange={handleChange} />
        </label>
          Genre:
            {genreList.map(genre => (
              <div key={genre.id}>
                <input type="checkbox" onChange={handleChangeGenres} name={genre.name} value={genre.name} />
                {genre.name}
              </div>
            ))}
        <label>
        Rating:
            <select name="rating" value={newGame.rating} onChange={handleChange}>
              <option></option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
        </label>
        <label>
          Platforms:
          <input type="text" name="plataforms" value={newGame.plataforms} onChange={handleChange} />
        </label>
        <label>
          <input type="submit" value="Create Game" onClick={handleSubmit} />  
        </label>   
      </form>
    </div>
  );
}

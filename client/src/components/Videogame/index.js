import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getVideogameById } from '../../actions/index.js'
import ReactHtmlParser from 'react-html-parser';
import './videogame.scss'
export function Videogame(props) {
    const { id } = useParams();
    const videogame = useSelector((state) => state.game);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideogameById(id));
        console.log('hola');
    }, [dispatch]);
    

  return (
 
    <div className="videogame-container">
      <h1>{videogame.name}</h1>
      <h2>Release date: {videogame.release_date} </h2>
     <p>{videogame.description ? videogame.description.replace(/<[^>]+>/g, '') : videogame.description}</p>
     {//ReactHtmlParser(videogame.description) 
    }
     <h2>Rating: {videogame.rating}</h2>

     <h4>Platforms: {videogame.plataforms}</h4>
     <img src={videogame.background_image ?
              videogame.background_image :
              "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    } alt=""/>
   </div>
  );
}
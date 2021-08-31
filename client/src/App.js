import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home'
import Nav from './components/Nav'
import {Videogame} from './components/Videogame'
import Genre from './components/Genre'
import VideogameList from './components/VideogameList'
import CreateGame from './components/CreateGame'
import Intro from './components/Intro'
function App() {
  return (
    <>
    <Nav />
    <Route exact path="/home" component={Home} />
    <Route path="/videogames/:id" component={Videogame} />
    <Route path="/genre/:id" component={Genre} />
    <Route path="/createyourgame" component={CreateGame} />
    <Route exact path='/' component={Intro} />
    </>
  );
}

export default App;

import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home'
import Nav from './components/Nav'
import Videogame from './components/Videogame'
import Genre from './components/Genre'
import VideogameList from './components/VideogameList'
function App() {
  return (
    <>
    <Nav />
    <Route path="/" component={Home} />
    <Route path="/videogame/:id" component={Videogame} />
    <Route path="/genre/:id" component={Genre} />
    <Route path="/videogames" component={VideogameList} />
    </>
  );
}

export default App;

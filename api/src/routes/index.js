const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const fetch = require('node-fetch');
const cors = require('cors');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const apiKey = "55023baf198e42168aea94fd3a0cd49f"

const router = Router();
router.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//guardar datos desde api en nuestra base de datos

router.get('/videogames', async (req, res) => {
    if(req.query.name){
        const { name } = req.query;
        const videogames = await Videogame.findAll({
            where: {
                name: name
            },
            include: Genre
        });
        if(videogames.length > 0){
            res.json(videogames);
        }else{
            const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}&page_size=15`);
            const data = await response.json();
            console.log(data)
            const videogamesApi = data.results;
            res.json(videogamesApi);
        }
        
    }else{
    const videogamesdb = await Videogame.findAll({include: Genre});
        let videogamesMapped = videogamesdb.map(videogame => {
        let genres = videogame.genres.map(genre => genre.name)
        const videogameData = {
            name: videogame.name,
            id: videogame.id,
            description: videogame.description,
            game_genres: genres.join(', '),
            plataforms: videogame.plataforms,
            release_date: videogame.release_date,
            rating: videogame.rating,
        }
        return videogameData;
    })




    const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
    const data = await response.json()
    const responseNext = await fetch(data.next)
    const dataNext = await responseNext.json()
    const responseNext2 = await fetch(dataNext.next)
    const dataNext2 = await responseNext2.json()
    const responseNext3 = await fetch(dataNext2.next)
    const dataNext3 = await responseNext3.json()
    const responseNext4 = await fetch(dataNext3.next)
    const dataNext4 = await responseNext4.json()

    const games = [...data.results, ...dataNext.results, ...dataNext2.results, ...dataNext3.results, ...dataNext4.results].map(async game => {
        const description = await fetch(`https://api.rawg.io/api/games/${game.id}?key=${apiKey}`)
        const dataDescription = await description.json()
        const platforms = [];
        dataDescription.parent_platforms.forEach(platform => {
            platforms.push(platform.platform.name)
        })
        

        const videogame = {
            name: game.name,
            id: game.id,
            description: dataDescription.description,
            rating: game.rating_top,
            plataforms: platforms.join(', '),
            release_date: game.released,
            game_genres: game.genres.map(genre => genre.name).join(', '),
            background_image: game.background_image,
        }
        return videogame
    })
    await Promise.all(games)
    .then(videogames => {
        res.json(videogames.concat(videogamesMapped))
    }
    )
    }
}
)



router.post('/videogames', async (req, res) => {
    var  { name, description, rating, plataforms, release_date, game_genres } = req.body;
    if(!rating){
        rating = null;
    }
    if(!release_date){
        release_date = null;
    }
    
    const videogame = await Videogame.create({
        name,
        description,
        rating,
        plataforms,
        release_date,
       
    });
    //buscar id del genero en la base de datos
    game_genres.forEach( async (genre) => {
    const genero = await Genre.findOne({
        where: {
            name: genre
        }
    })
    await videogame.setGenres(genero)
})
    res.json(videogame)
})

    

router.get('/videogames/:id', async (req, res) => {
    const { id } = req.params;
    if(isNaN(id)){
        try{
            const videogame = await Videogame.findOne({
                where: {
                    id: id
                },
                include: Genre
            })
            res.json(videogame)
        }
        catch(error){
            res.json({error: 'No se encontro el videojuego'})
        }
    }
    else{
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
        const data = await response.json()
        const platforms = [];
        data.parent_platforms.forEach(platform => {
            platforms.push(platform.platform.name)
        })
        const videogameApi = {
            name: data.name,
            id: data.id,
            description: data.description,
            rating: data.rating_top,
            plataforms: platforms.join(', '),
            release_date: data.released,
            game_genres: data.genres.map(genre => genre.name).join(', '),
            background_image: data.background_image,
    }
    res.json(videogameApi)
    }

});

router.post ('/genres', async (req, res) => {
    const { name } = req.body;
    const genre = await Genre.create({ name });
    res.json(genre);
  }
  );
  router.get('/genres', async(req, res) => {
    const genresDatabase = await Genre.findAll();
    if(genresDatabase.length > 0){
        res.json(genresDatabase);
    }else{
    const response = await fetch(`https://api.rawg.io/api/genres?key=${apiKey}`)
    const data = await response.json()
    const genres = data.results.map(async genre => {
        const videogame = await Genre.create({
            name: genre.name,
        })
    })
    await Promise.all(genres)
    .then(async ()  => {
        const genresDb = await Genre.findAll();
        res.json(genresDb)
    })
    }
})




module.exports = router;

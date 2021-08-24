const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const fetch = require('node-fetch');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const apiKey = "8e203509bc72432d8bb5b22762751b6e"

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//guardar datos desde api en nuestra base de datos

router.get('/videogames', async (req, res) => {
    if(req.query.name){
        console.log(req.query.name);
    const videogame = await Videogame.findAll({
    where: {
        name: req.query.name,
        }
    });
    if(videogame.length) res.json(videogame);
    if(videogame.length == 0){
       res.status(400).json({error: "No se encontró el videojuego"});
    }
    } else {
    const videogames = await Videogame.findAll();
    res.json(videogames);
    
    }

});

router.get('/videogames/api' , async(req, res) => {
   
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
        

        const videogame = await Videogame.create({
            name: game.name,
            description: dataDescription.description,
            rating: game.rating_top,
            plataforms: platforms.join(', '),
            release_date: game.released,
        }
        )
    })
    await Promise.all(games)
    .then(async () => {
        const videogame = await Videogame.findAll();
        res.json(videogame);
    }
    )
})

router.get('/genres/api', async(req, res) => {
    const response = await fetch(`https://api.rawg.io/api/genres?key=${apiKey}`)
    const data = await response.json()
    const genres = data.results.map(async genre => {
        const videogame = await Genre.create({
            name: genre.name,
        })
    })
    await Promise.all(genres)
})


router.post('/videogames', async (req, res) => {
    const  { name, description, rating, plataforms, id, release_date,  } = req.body;
    const videogame = await Videogame.create({
        name,
        description,
        rating,
        plataforms,
        id,
        release_date,
    });
    res.json(videogame);

});

router.get('/videogames/:idVideogames', async (req, res) => {
    const videogame = await Videogame.findByPk(req.params.idVideogames);
    res.json(videogame);
});

router.post ('/genres', async (req, res) => {
    const { name } = req.body;
    const genre = await Genre.create({ name });
    res.json(genre);
  }
  );
  router.get('/genres', async (req, res) => {
    const genres = await Genre.findAll();
    res.json(genres);
  }
  );
  




module.exports = router;

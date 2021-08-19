const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const fetch = require('node-fetch');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//guardar datos desde api en nuestra base de datos




router.get('/videogames', async(req, res) => {
    const videogames = await Videogame.findAll();
    res.json(videogames);
});

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

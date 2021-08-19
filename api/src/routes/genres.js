const { Router } = require('express');
const { Videogame, Genre } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  const genres = await Genre.findAll();
  res.json(genres);
}
);

router.post ('/genres', async (req, res) => {
  const { name } = req.body;
  const genre = await Genre.create({ name });
  res.json(genre);
}
);
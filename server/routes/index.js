const router = require('express').Router();

router.post('/', async (req, res) => {
  const sorting = req.body.sorting;
  const apiKey = 'e4481f7edf634ba0b3755068bd11dfa9';
  if (sorting === 'general') {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${apiKey}`)
      .then(response => response.json())
      .then(json => res.json(json))
      .catch(error => console.error(error));
  } else {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${sorting}&pageSize=100&apiKey=${apiKey}`)
      .then(response => response.json())
      .then(json => res.json(json))
      .catch(error => console.error(error));
  }
});

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
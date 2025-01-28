const express = require('express')
const app=express();
const port=3000;

const movies=[
    {id:1, title:'bahubali', director:'rajamouli',year:2015},
    {id:2, title:'kalki',directot:'nag aswin',year:2024},
    {id:3,title:'shyam singha roy',director:'rahul sankratyan',year:2021},
    {id:4,title:'mahanati',director:'nag aswin',year:2018}
]

app.use((express.json()));

app.get('/movies',(req,res) => {
    res.json(movies);
});


app.get('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const movie = movies.find((m) => m.id === movieId);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});


app.get('/movies/search', (req, res) => {
  const { title, genre } = req.query;
  let results = movies;

  if (title) {
    results = results.filter((m) =>
      m.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (genre) {
    results = results.filter((m) =>
      m.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (results.length > 0) {
    res.json(results);
  } else {
    res.status(404).json({ error: 'No movies found' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

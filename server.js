/* eslint-disable no-console */
const express = require('express')
const movies = require('./movies')
const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))


// eslint-disable-next-line no-unused-vars

app.get('/', (req, res) => {
  res.render('index', { movies })
})


app.get('api/movies', (req, res) => {
  res.render('movies', { movies })
})

app.get('api/movie/:id', (req, res) => {
  const movie = movies.find(movie => movie.id === req.params.id)

  res.render('movie', { movie })
})


app.post('api/movies', (req, res) => {
  if (req.body.id !== undefined) movies.push(req.body)
  res.status(201).json(movies)
})

app.all('*', (req, res) => {
  return res.status(404).send('Sorry, the page you requested does not exist')
})


app.listen(1337, () => {
  console.log('listening on port 1337')
})

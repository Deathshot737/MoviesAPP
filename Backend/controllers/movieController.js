// controllador para manejar el crud a la colleccion movies
const Movie = require('../models/movies');


const getAllMovies = async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
}

const getMovieById = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
}

const createMovie = async (req, res) => {
    const movie = new Movie(req.body);
    await movie.save();
    res.json(201, "Movie created");
}

const updateMovie = async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.json(movie);
}

const deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
}
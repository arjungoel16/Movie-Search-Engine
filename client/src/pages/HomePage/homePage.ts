// this file is meant for after the login page
// after a user is stored and logged in, they will be able to save movies to their profile on a new page
// import search, save, and remove movie functions from the api

const { Schema, model } = require('mongoose');

const homePageSchema = new Schema({
    // add a user to the home page
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // add a movie to the home page
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    // add a saved movie to the home page
    savedMovies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie',
        },
    ],
    // add a search movie to the home page
    searchMovies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie',
        },
    ],
    });

// create the home page model using the home page schema
// home page model allows user to search for movies and save them or remove to their profile
// display the Home Page
const HomePage = model('HomePage', homePageSchema);


module.exports = HomePage;





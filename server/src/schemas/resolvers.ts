import User from '../models/index.js';
import { AuthenticationError, signToken } from '../services/auth.js';
// import Movie from '../models/movies.js';

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  movieCount: number;
}

interface Context {
  user?: User;
}

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const resolvers: { Query: any; Mutation: any } = {
  Query: {
    me: async (_: unknown, { filter }: { filter?: { type: string } }, context: Context) => {
      if (!context.user) throw new AuthenticationError('You must be logged in');

      const filters = filter ? { /* Add filtering logic */ } : {};
      return await User.User.findOne({ _id: context.user._id })
        .populate({ path: 'nextUpMovies', match: filters })
        .populate({ path: 'seenItMovies', match: filters });
    },
    trendingMovies: async () => {
      const response = await fetch(
        `${BASE_URL}/trending/movie/day?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          }, 
        }
      );
      const { results } = await response.json();

      return results.map((movie: any) => ({
        adult: movie.adult,
        backdropPath: movie.backdrop_path,
        genreIds: movie.genre_ids,
        id: movie.id,
        originalLanguage: movie.original_language,
        originalTitle: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        title: movie.title,
        video: movie.video,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        mediaType: movie.media_type,
      }));
    },
  },
  Mutation: {
    addUser: async (
      _: unknown,
      { input }: { input: { username: string; email: string; password: string } }
    ) => {
      const user = await User.User.create(input);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    login: async (_: any, {email}: any) => {
      const user = await User.User.findOne({ $or: [{ username: email }, { email }] });

      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }

      // const correctPw = await user.isCorrectPassword(password);
      // if (!correctPw) {
      //   throw new AuthenticationError('Incorrect password!');
      // }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    
  
    // saveMovie: async (_parent: any, { movieId }: { movieId: string }, context: any) => {
    //   console.log('User saved a movie', context.user);
    //   console.log('Incoming movie', movieId);
    //   if (context.user) {
    //     console.log('Received movie data:', movieId); // log

    //     try {
    //       // Create the book
    //       const movies = await Movie.create({ movieId });
    //       console.log('Created movie:', movies); // log 

    //       // Update the user and add the book to their savedBooks
    //       const updatedUser = await User.findByIdAndUpdate(
    //         context.user._id,
    //         { $addToSet: { savedMovie: { movieId } } },
    //         { new: true, runValidators: true }
    //       ).populate('savedMovies');

    //       console.log('Updated user:', updatedUser); // log

    //       if (!updatedUser) {
    //         throw new Error('User not found');
    //       }

    //       // Return the newly created book, not the user
    //       return movies;
    //     } catch (error) {
    //       console.error('Error in saveMovie mutation:', error);
    //       throw new Error('Failed to save the movie');
    //     }
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },


    // removeMovie: async (_: any, { movieId }: { movieId: string }, context: Context) => {
    //   if (context.user) {
    //     const updatedUser = await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { savedMovies: { movieId } } },
    //       { new: true }
    //     );

    //     if (!updatedUser) {
    //       throw new AuthenticationError("Couldn't find user with this id!");
    //     }

    //     return updatedUser;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    rateMovie: async (_: any, { movieId, rating }: { movieId: string; rating: number }, context: Context) => {
      if (context.user) {
        const updatedUser = await User.User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              'movieRatings.$[elem].rating': rating,
            },
          },
          {
            arrayFilters: [{ 'elem.movieId': movieId }],
            new: true,
          }
        );

        if (!updatedUser) {
          throw new Error("Couldn't update the rating");
        }

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // async saveNextUpMovie(_ : unknown, { input } : any, context : Context) {
    //   if (!context.user) throw new AuthenticationError('You must be logged in.');
    
    //   const { movieId, title, overview, posterPath, releaseDate, voteAverage } = input;   // title, description, genre, director, cast, year
    
    //   let movie = await Movie.findOne({ movieId });
    //   if (!movie) {
    //     movie = await Movie.create({
    //       movieId,
    //       title,
    //       overview,
    //       posterPath,
    //       releaseDate,
    //       voteAverage,
    //     });
    //   }
    
    //   const user = await User.findByIdAndUpdate(
    //     context.user._id,
    //     { $addToSet: { nextUpMovies: movie._id } },
    //     { new: true }
    //   ).populate('nextUpMovies');
    
    //   return user;
    // },

    // async saveSeenItMovie(_ : unknown, { input }: any, context: Context) {
    //   if (!context.user) throw new AuthenticationError('You must be logged in.');
    
    //   const { movieId, title, overview, posterPath, releaseDate, voteAverage } = input;
    
    //   let movie = await Movie.findOne({ movieId });
    //   if (!movie) {
    //     movie = await Movie.create({
    //       movieId,
    //       title,
    //       overview,
    //       posterPath,
    //       releaseDate,
    //       voteAverage,
    //     });
    //   }
    
    //   const user = await User.findByIdAndUpdate(
    //     context.user._id,
    //     { $addToSet: { seenItMovies: movie._id } },
    //     { new: true }
    //   ).populate('seenItMovies');
    
    //   return user;
    // }
  },
};


export default resolvers;

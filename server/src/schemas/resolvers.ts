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

const resolvers = {
  Query: {
    me: async (_: unknown, { filter }: { filter?: { type: string } }, context: Context) => {
      if (!context.user) throw new AuthenticationError('You must be logged in');

      const filters = filter ? { /* Add filtering logic */ } : {};
      return await User.findOne({ _id: context.user._id })
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

      return results.map((movie: {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
        media_type: string;
      }) => ({
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
      console.log(input);
      const user = await User.create(input);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    login: async (_: unknown, { email }: { email: string }) => {
      const user = await User.findOne({ $or: [{ username: email }, { email }] });

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


    saveMovie: async (_parent: string, { input }: { input: unknown }, context: any) => {

      if (context.user) {
        console.log('Received movie data:', input,context.user._id); // log

        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $addToSet: { savedMovies: input } },
            { new: true, runValidators: true }
          )

          console.log('Updated user:', updatedUser); // log

          if (!updatedUser) {
            console.log('User not found');
          }

          return updatedUser;
        } catch (error) {
          console.error('Error in saveMovie mutation:', error);
          throw new Error('Failed to save the movie');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },



    rateMovie: async (_: unknown, { movieId, rating }: { movieId: string; rating: number }, context: Context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
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

  },
};


export default resolvers;

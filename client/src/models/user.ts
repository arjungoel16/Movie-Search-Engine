import {Movie} from "./movie.ts"

export interface User {
    username: string;
    email: string;
    password: string;
    savedMovies: Movie [];
}
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import  "./Movies.scss";

const apiKey = "7e5122f42b3d47b2f9c1deaf4e1d2214";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // Fetch popular movies
        const fetchMovies = async () => {
            try {
                const { data } = await axios.get(`${url}/movie/popular?api_key=${apiKey}`);
                setMovies(data.results); // Save movie data in state
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            }
        };

        // Fetch movie genres
        const fetchGenres = async () => {
            try {
                const { data } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
                setGenres(data.genres); // Save genre data in state
            } catch (error) {
                console.error("Error fetching movie genres:", error);
            }
        };

        fetchMovies();
        fetchGenres();
    }, []);

    return (
        <div className="movies-page">
            <h2 className="text-3xl font-semibold mb-6 text-white">Popular Movies</h2>

            {/* Movie rows */}
            <div className="movie-rows">
                {movies.length > 0 ? (
                    genres.map((genre) => (
                        <div key={genre.id} className="movie-row">
                            <h3 className="genre-title text-black">{genre.name}</h3>
                            <div className="movie-row-posters">
                                {movies
                                    .filter((movie) => movie.genre_ids.includes(genre.id))
                                    .map((movie) => (
                                        <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-poster">
                                            <img
                                                className="poster-image"
                                                src={`${imgUrl}${movie.poster_path}`}
                                                alt={movie.title}
                                            />
                                            <div className="poster-overlay">
                                                <BiPlay className="text-2xl text-white" />
                                                <AiOutlinePlus className="text-2xl text-white" />
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Movies;

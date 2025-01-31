import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import "./RecentlyAdded.scss";

const apiKey = "7e5122f42b3d47b2f9c1deaf4e1d2214";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Card = ({ img, movieId }) => (
    <Link to={`/movie/${movieId}`}>
        <img className="card" src={img} alt="cover" />
    </Link>
);

const RecentlyAdded = () => {
    const [recentMovies, setRecentMovies] = useState([]);

    useEffect(() => {
        const fetchRecentMovies = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/latest?api_key=${apiKey}`);
            setRecentMovies([results]);
        };

        fetchRecentMovies();
    }, []);

    return (
        <div className="recently-added-page">
            <div
                className="banner"
                style={{
                    backgroundImage: recentMovies[0]
                        ? `url(${`${imgUrl}/${recentMovies[0].backdrop_path}`})`
                        : "rgb(16, 16, 16)",
                }}
            >
                {recentMovies[0] && <h1>{recentMovies[0].original_title}</h1>}
                {recentMovies[0] && <p>{recentMovies[0].overview}</p>}

                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>
            </div>

            <div className="recent-movies">
                <h2>Recently Added</h2>
                <div className="movies-list">
                    {recentMovies.map((movie) => (
                        <Card
                            key={movie.id}
                            movieId={movie.id}
                            img={`${imgUrl}/${movie.poster_path}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentlyAdded;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import "./Tvshows.scss";

const apiKey = "7e5122f42b3d47b2f9c1deaf4e1d2214";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div className="row__posters">
      {arr.map((item, index) => (
        <img
          key={index}
          className="row__poster row__posterLarge"
          src={`${imgUrl}/${item.poster_path}`}
          alt={item.name}
        />
      ))}
    </div>
  </div>
);

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchTvShows = async () => {
      const { data: { results } } = await axios.get(`${url}/tv/popular?api_key=${apiKey}`);
      setPopularShows(results);
    };
    const fetchTopRatedShows = async () => {
      const { data: { results } } = await axios.get(`${url}/tv/top_rated?api_key=${apiKey}`);
      setTopRatedShows(results);
    };
    const fetchGenres = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/tv/list?api_key=${apiKey}`);
      setGenres(genres);
    };

    fetchTvShows();
    fetchTopRatedShows();
    fetchGenres();
  }, []);

  return (
    <section className="tvShows">
      {/* Banner */}
      <div
        className="tvShows__banner"
        style={{
          backgroundImage: popularShows[0]
            ? `url(${imgUrl}/${popularShows[0].poster_path})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popularShows[0] && <h1>{popularShows[0].name}</h1>}
        {popularShows[0] && <p>{popularShows[0].overview}</p>}
        <div>
          <button><BiPlay /> Play</button>
          <button>My List <AiOutlinePlus /></button>
        </div>
      </div>

      {/* Rows for Popular and Top Rated Shows */}
      <Row title="Popular TV Shows" arr={popularShows} />
      <Row title="Top Rated TV Shows" arr={topRatedShows} />

      {/* Genres Links */}
      <div className="genreBox">
        {genres.map((genre) => (
          <Link key={genre.id} to={`/genre/${genre.id}`}>
            {genre.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TvShows;

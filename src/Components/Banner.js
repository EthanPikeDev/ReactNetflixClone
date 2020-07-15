import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css"

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      //This is to fetch the netflix originals to display in the banner
      const request = await axios.get(requests.fetchNetflixOriginals);
      //use math.random to randomise which movie gets displayed on the page upon load or reload
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate (str, n) {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {" "}
        {/*Background image*/}
        {/*Title */}
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">
        {truncate(movie?.overview, 150)}
        </h1>
        {/*Div 2 buttons */}
        {/*Description */}
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;

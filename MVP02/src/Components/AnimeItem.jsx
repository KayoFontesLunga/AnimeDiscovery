import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useThemeContext } from "../Context/ThemeContext";

function AnimeItem() {
  const { id } = useParams();

  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const { theme, toggleTheme } = useThemeContext();

  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  const getAnime = async (animeId) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    const data = await response.json();
    setAnime(data.data);
  };

  const getCharacters = async (animeId) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/characters`,
    );
    const data = await response.json();
    setCharacters(data.data);
  };

  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, [id]);

  return (
    <AnimeItemStyle>
      <div className='back'>
        <Link to='/'>
          <i className='fas fa-arrow-left'></i>
          Back to Home
        </Link>
      </div>
      <button className='theme-toggle' onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}{" "}
        <i className={theme === "light" ? "fas fa-moon" : "fas fa-sun"}></i>
      </button>
      <h1>{title}</h1>
      <div className='details'>
        <div className='detail'>
          <div className='image'>
            <img src={images?.jpg.large_image_url} alt={title} />
          </div>
          <div className='anime-detail'>
            <p>
              <span>Aired:</span>
              <span>{aired?.string}</span>
            </p>
            <p>
              <span>Rating:</span>
              <span>{rating}</span>
            </p>
            <p>
              <span>Rank:</span>
              <span>{rank}</span>
            </p>
            <p>
              <span>Score:</span>
              <span>{score}</span>
            </p>
            <p>
              <span>Scored By:</span>
              <span>{scored_by}</span>
            </p>
            <p>
              <span>Popularity:</span>
              <span>{popularity}</span>
            </p>
            <p>
              <span>Status:</span>
              <span>{status}</span>
            </p>
            <p>
              <span>Source:</span>
              <span>{source}</span>
            </p>
            <p>
              <span>Season:</span>
              <span>{season}</span>
            </p>
            <p>
              <span>Duration:</span>
              <span>{duration}</span>
            </p>
          </div>
          <p className='description'>
            {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
            <button onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Read More"}
            </button>
          </p>
        </div>
        <h3 className='title'>Trailer</h3>
        <div className='trailer-con'>
          {trailer?.embed_url && (
            <iframe
              src={trailer.embed_url}
              title='Trailer'
              width='800'
              height='450'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          )}
        </div>
        <h3 className='title'>Characters</h3>
        <div className='characters'>
          {characters?.map((character, index) => {
            const { role } = character;
            const { images, name, mal_id } = character.character;
            return (
              <Link to={`/character/${mal_id}`} key={index}>
                <div className='character'>
                  <img src={images?.jpg.image_url} alt={name} />
                  <h4>{name}</h4>
                  <p>{role}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AnimeItemStyle>
  );
}

const AnimeItemStyle = styled.div`
  padding: 2rem 5%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  h1 {
    display: inline-block;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.4s ease-in-out;
  }
  h1:hover {
    transform: skew(-3deg);
  }

  .title {
    display: inline-block;
    margin: 2rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7 23%, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    margin-top: 2rem;
    color: ${({ theme }) => theme.color};
    line-height: 1.7rem;
  }
  .description button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #27ae60;
    font-weight: 600;
  }

  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
  .trailer-con iframe {
    outline: none;
    border: 5px solid ${({ theme }) => theme.buttonBorder};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.buttonBackground};
    max-width: 100%;
    width: 560px;
    height: 315px;
    padding: 0;
    margin: 0;
    display: block;
  }

  .details {
    background-color: ${({ theme }) => theme.buttonBackground};
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid ${({ theme }) => theme.buttonBorder};
    margin-top: 2rem;
  }
  .detail {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .detail img {
    border-radius: 7px;
    max-width: 100%;
  }
  .anime-detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .anime-detail p {
    display: flex;
    gap: 1rem;
  }
  .anime-detail p span:first-child {
    font-weight: 600;
    color: ${({ theme }) => theme.color};
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: ${({ theme }) => theme.buttonBackground};
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid ${({ theme }) => theme.buttonBorder};
    .character {
      padding: 0.4rem 0.6rem;
      border-radius: 7px;
      background-color: ${({ theme }) => theme.buttonBackground};
      transition: all 0.4s ease-in-out;
      img {
        width: 100%;
        border-radius: 5px;
      }
      h4 {
        padding: 0.5rem 0;
        color: red;
      }
      p {
        color: #27ae60;
      }
      &:hover {
        transform: translateY(-5px);
      }
    }
  }

  .back {
    position: absolute;
    top: 2rem;
    left: 2rem;
    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      text-decoration: none;
      color: ${({ theme }) => theme.color};
      padding: 0.3rem 0.6rem;
      background: ${({ theme }) => theme.buttonBackground};
      border-radius: 5px;
      border: 1px solid ${({ theme }) => theme.buttonBorder};
      font-size: 0.9rem;
      transition: all 0.3s ease-in-out;
    }
    a:hover {
      background: #eb5757;
      color: #fff;
    }
    i {
      margin-right: 0.3rem;
    }
  }
  .theme-toggle {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.buttonBackground};
    border: 3px solid ${({ theme }) => theme.buttonBorder};
    cursor: pointer;
    color: ${({ theme }) => theme.color};
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-left: auto;

    &:hover {
      background-color: #e5e7eb;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
    }

    i {
      font-size: 1.2rem;
    }
  }
`;

export default AnimeItem;

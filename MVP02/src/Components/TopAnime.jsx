import React from "react";
import { useGlobalContext } from "../Context/global";
import { Link } from "react-router-dom";
import styled from "styled-components";

function TopAnime({ rendered }) {
  const { topAnime, isSearch, searchResult } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rendered === "topAnime") {
      return topAnime.map((anime) => (
        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.jpg.large_image_url} alt={anime.title} />
        </Link>
      ));
    } else {
      return searchResult?.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt='' />
          </Link>
        );
      });
    }
  };

  return (
    <PopularStyle>
      <div className='top-anime'>{conditionalRender()}</div>
    </PopularStyle>
  );
}

const PopularStyle = styled.div`
  display: flex;
  justify-content: center;
  .top-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 5rem;
    padding-right: 5rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(200px, 1fr)
    ); 
    grid-gap: 2rem;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    border-top: 5px solid ${({ theme }) => theme.buttonBorder};
    a {
      height: 300px;
      border-radius: 7px;
      border: 5px solid ${({ theme }) => theme.buttonBorder};
      display: block;
    }
    a img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`;

export default TopAnime;

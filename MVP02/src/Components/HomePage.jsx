import React from "react";
import { useGlobalContext } from "../Context/global";
import { useThemeContext } from "../Context/ThemeContext";
import Popular from "./Popular";
import styled from "styled-components";
import Upcoming from "./Upcoming";
import Airing from "./Airing";
import TopAnime from "./TopAnime";

function HomePage() {
  const { search, handleChange, handleSubmit } = useGlobalContext();
  const { theme, toggleTheme } = useThemeContext();
  const [rendered, setRendered] = React.useState("popular");
  const [pageTitle, setPageTitle] = React.useState("Popular Anime");

  const switchComponent = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "upcoming":
        return <Upcoming rendered={rendered} />;
      case "airing":
        return <Airing rendered={rendered} />;
      case "topAnime":
        return <TopAnime rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  const handleRenderChange = (type, title) => {
    setRendered(type);
    setPageTitle(title);
  };

  return (
    <HomePageStyled>
      <header>
        <div className='logo'>
          <h1>{pageTitle}</h1>
        </div>
        <div className='filters-container'>
          <div className='filters'>
            <div className='filter-btn topAnime-filter'>
              <button
                onClick={() => handleRenderChange("topAnime", "Top Anime")}
              >
                Top Animes
              </button>
            </div>
            <div className='filter-btn popular-filter'>
              <button
                onClick={() => handleRenderChange("popular", "Popular Anime")}
              >
                Popular <i className='fas fa-fire'></i>
              </button>
            </div>
            <div className='filter-btn airing-filter'>
              <button
                onClick={() => handleRenderChange("airing", "Airing Anime")}
              >
                Airing
              </button>
            </div>
            <div className='filter-btn upcoming-filter'>
              <button
                onClick={() => handleRenderChange("upcoming", "Upcoming Anime")}
              >
                Upcoming
              </button>
            </div>
          </div>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='input-control'>
              <input
                type='text'
                placeholder='Search Anime'
                value={search}
                onChange={handleChange}
              />
              <button type='submit'>Search</button>
            </div>
          </form>
          <button className='theme-toggle' onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}{" "}
            <i className={theme === "light" ? "fas fa-moon" : "fas fa-sun"}></i>
          </button>
        </div>
      </header>
      <main>{switchComponent()}</main>
    </HomePageStyled>
  );
}

const HomePageStyled = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  header {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .logo {
      h1 {
        font-size: 1.5rem;
        background: linear-gradient(to right, #a855f7, #27ae60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .filters-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      flex-wrap: wrap;

      .filters {
        display: flex;
        gap: 0.5rem;

        .filter-btn {
          button {
            padding: 0.3rem 0.8rem;
            font-size: 0.875rem;
            border-radius: 15px;
            background-color: ${({ theme }) => theme.buttonBackground};
            border: 2px solid ${({ theme }) => theme.buttonBorder};
            cursor: pointer;
            color: ${({ theme }) => theme.color};
            transition: all 0.3s ease-in-out;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

            &:hover {
              background-color: ${({ theme }) => theme.buttonBackground};
              box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
            }
          }
        }
      }

      .search-form {
        display: flex;
        align-items: center;
        gap: 0.3rem;

        input {
          padding: 0.3rem 0.6rem;
          font-size: 0.875rem;
          border-radius: 15px;
          background-color: ${({ theme }) => theme.buttonBackground};
          border: 2px solid ${({ theme }) => theme.buttonBorder};
          color: ${({ theme }) => theme.color};
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        button {
          padding: 0.3rem 0.8rem;
          font-size: 0.875rem;
          border-radius: 15px;
          background-color: ${({ theme }) => theme.buttonBackground};
          border: 2px solid ${({ theme }) => theme.buttonBorder};
          cursor: pointer;
          color: ${({ theme }) => theme.color};
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

          &:hover {
            background-color: ${({ theme }) => theme.buttonBackground};
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
          }
        }
      }

      .theme-toggle {
        padding: 0.3rem 0.8rem;
        font-size: 0.875rem;
        border-radius: 15px;
        background-color: ${({ theme }) => theme.buttonBackground};
        border: 2px solid ${({ theme }) => theme.buttonBorder};
        cursor: pointer;
        color: ${({ theme }) => theme.color};
        transition: all 0.3s ease-in-out;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.3rem;

        &:hover {
          background-color: ${({ theme }) => theme.buttonBackground};
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
        }

        i {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default HomePage;

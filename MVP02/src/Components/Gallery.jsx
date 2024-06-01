import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../Context/global';
import { useParams, Link } from 'react-router-dom';
import { useThemeContext } from '../Context/ThemeContext';

function Gallery() {
    const { getAnimePictures, pictures } = useGlobalContext();
    const { id } = useParams();

    const [index, setIndex] = useState(0);
    const { theme, toggleTheme } = useThemeContext();


    const handleImageClick = (i) => {
        setIndex(i);
    };

    useEffect(() => {
        if (id) {
            getAnimePictures(id);
        }
    }, [id, getAnimePictures]);

    return (
        <GalleryStyled>
            <div className="back">
                <Link to="/">
                    <i className="fas fa-arrow-left"></i>
                    Back to Home
                </Link>
            </div>
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}{' '}
                <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
            </button>
            <div className="big-image">
                {pictures[index] ? (
                    <img src={pictures[index].jpg.image_url} alt="Selected Anime" />
                ) : (
                    <p>No image available</p>
                )}
            </div>
            <div className="small-images">
                {pictures?.map((picture, i) => (
                    <div className="image-con" onClick={() => handleImageClick(i)} key={i}>
                        <img
                            src={picture?.jpg.image_url}
                            style={{
                                border: i === index ? "3px solid #27AE60" : "3px solid #e5e7eb",
                                filter: i === index ? 'grayscale(0)' : 'grayscale(60%)',
                                transform: i === index ? 'scale(1.1)' : 'scale(1)',
                                transition: 'all .3s ease-in-out',
                            }}
                            alt={`Anime Thumbnail ${i}`}
                        />
                    </div>
                ))}
            </div>
        </GalleryStyled>
    );
}

const GalleryStyled = styled.div`
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    transition: background-color 0.3s ease, color 0.3s ease;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
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
            background: #EB5757;
            color: #fff;
        }
        i {
            margin-right: 0.3rem;
        }
    }
    .big-image {
        display: inline-block;
        padding: 2rem;
        margin: 2rem 0;
        background-color: ${({ theme }) => theme.buttonBackground};
        border-radius: 7px;
        border: 5px solid ${({ theme }) => theme.buttonBorder};
        position: relative;
        img {
            width: 350px;
        }
    }
    .small-images {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        width: 80%;
        padding: 2rem;
        border-radius: 7px;
        background-color: ${({ theme }) => theme.buttonBackground};
        border: 5px solid ${({ theme }) => theme.buttonBorder};
        img {
            width: 6rem;
            height: 6rem;
            object-fit: cover;
            cursor: pointer;
            border-radius: 5px;
            border: 3px solid #e5e7eb;
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
        margin-top: 20px;
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

export default Gallery;

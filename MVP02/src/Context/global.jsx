import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useState,
  } from "react";
  
  const GlobalContext = createContext();
  
  const baseUrl = "https://api.jikan.moe/v4";
  
  const LOADING = "LOADING";
  const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
  const SEARCH = "SEARCH";
  const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
  const GET_AIRING_ANIME = "GET_AIRING_ANIME";
  const GET_PICTURES = "GET_PICTURES";
  const GEt_TOP_ANIME = "GEt_TOP_ANIME";
  
  const reducer = (state, action) => {
    switch (action.type) {
      case LOADING:
        return { ...state, loading: true };
      case GET_POPULAR_ANIME:
        return { ...state, popularAnime: action.payload, loading: false };
      case SEARCH:
        return {
          ...state,
          searchResult: action.payload,
          isSearch: true,
          loading: false,
        };
      case GET_UPCOMING_ANIME:
        return {
          ...state,
          upcomingAnime: action.payload,
          isSearch: false,
          loading: false,
        };
      case GET_AIRING_ANIME:
        return {
          ...state,
          airingAnime: action.payload,
          isSearch: false,
          loading: false,
        };
      case GET_PICTURES:
        return { ...state, pictures: action.payload, loading: false };
      case GEt_TOP_ANIME:
        return { ...state, topAnime: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export const GlobalContextProvider = ({ children }) => {
    const initialState = {
      popularAnime: [],
      upcomingAnime: [],
      airingAnime: [],
      topAnime: [],
      pictures: [],
      isSearch: false,
      searchResult: [],
      loading: false,
    };
  
    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState("");
  
    const handleChange = (e) => {
      setSearch(e.target.value);
      if (e.target.value === "") {
        getPopularAnime();
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (search) {
        searchAnime(search);
      } else {
        alert("Please enter a search term");
      }
    };
  
    const searchAnime = async (anime) => {
      dispatch({ type: LOADING });
      try {
        const response = await fetch(
          `${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        dispatch({ type: SEARCH, payload: data.data });
      } catch (error) {
        console.error("Error searching anime:", error);
        dispatch({ type: LOADING });
      }
    };
  
    const getPopularAnime = async () => {
      dispatch({ type: LOADING });
      try {
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
      } catch (error) {
        console.error("Error fetching popular anime:", error);
        dispatch({ type: LOADING });
      }
    };
  
    const getUpcomingAnime = async () => {
      dispatch({ type: LOADING });
      try {
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
      } catch (error) {
        console.error("Error fetching upcoming anime:", error);
        dispatch({ type: LOADING });
      }
    };
  
    const getAiringAnime = async () => {
      dispatch({ type: LOADING });
      try {
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        dispatch({ type: GET_AIRING_ANIME, payload: data.data });
      } catch (error) {
        console.error("Error fetching airing anime:", error);
        dispatch({ type: LOADING });
      }
    };
  
    const getAnimePictures = async (id) => {
      dispatch({ type: LOADING });
      try {
        const response = await fetch(`${baseUrl}/characters/${id}/pictures`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        dispatch({ type: GET_PICTURES, payload: data.data });
      } catch (error) {
        console.error("Error fetching anime pictures:", error);
        dispatch({ type: LOADING });
      }
    };
  
    const getTopAnime = async (id) => {
      dispatch({ type: LOADING });
      try {
        const response = await fetch(`${baseUrl}/top/anime`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        dispatch({ type: GEt_TOP_ANIME, payload: data.data });
      } catch (error) {
        console.error("Error fetching anime pictures:", error);
        dispatch({ type: LOADING });
      }
      console.log(data.data);
    };
  
    useEffect(() => {
      getPopularAnime();
      getUpcomingAnime();
      getAiringAnime();
      getTopAnime();
    }, []);
  
    return (
      <GlobalContext.Provider
        value={{
          ...state,
          handleChange,
          handleSubmit,
          search,
          searchAnime,
          getPopularAnime,
          getUpcomingAnime,
          getAiringAnime,
          getAnimePictures,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
  };
  
  export const useGlobalContext = () => {
    return useContext(GlobalContext);
  };
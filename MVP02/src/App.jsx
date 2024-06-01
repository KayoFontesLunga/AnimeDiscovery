import AnimeItem from "./Components/AnimeItem";
import Gallery from "./Components/Gallery";
import HomePage from "./Components/HomePage";
import Popular from "./Components/Popular";
import { useGlobalContext } from "./Context/global";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App


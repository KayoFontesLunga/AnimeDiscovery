import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import GlobalStyle from './GlobalStyle';
import { GlobalContextProvider } from './Context/global';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as CustomThemeProvider, useThemeContext } from './Context/ThemeContext';

const lightTheme = {
  background: '#ededed',
  color: '#000',
  buttonBackground: '#fff',
  buttonBorder: '#e5e7eb',
};

const darkTheme = {
  background: '#2e2e2e',
  color: '#fff',
  buttonBackground: '#444',
  buttonBorder: '#666',
};

const ThemedApp = () => {
  const { theme } = useThemeContext();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={currentTheme}>
      <App />
    </StyledThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalContextProvider>
      <CustomThemeProvider>
        <ThemedApp />
      </CustomThemeProvider>
    </GlobalContextProvider>
  </React.StrictMode>
);

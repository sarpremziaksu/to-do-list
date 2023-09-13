import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import React from 'react';
import './App.scss';
import Todo from './components/Todo/Todo';
import Footer from './components/Footer/Footer';

function App() {
  let theme = createTheme({
    palette: {
      primary: {
        main: purple[300],
        dark: purple[500],
      },
      white: {
        main: '#fff'
      },
      secondary: {
        main: 'rgb(16, 16, 16)',
      },
    },
    typography: {
      h5: {
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bolder',
        lineHeight: '2',
        letterSpacing: '0.5em',
      }
    },
    textField: {
      fontSize: '35px',
      fontFamily: [
        'Poppins',
        'sans-serif',
      ].join(','),
    },
    border: '1px solid blue',
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Todo />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;

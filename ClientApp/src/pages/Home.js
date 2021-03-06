import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from "../components/Header/Header";
import './styles.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState([]);

  const history = useHistory();

  useEffect(() => {

    fetch('http://localhost:5000/api/allmovies')
      .then(response => response.json())
      .then(setMovies)
      .catch(err => {
        console.log(err);
    });

    setMovies(
      movies.map(movie => {
        return {
          select: false,
          id: movie.id,
          titulo: movie.titulo,
          ano: movie.ano,
          nota: movie.nota
        };
      })
    );
  }, []);

  const handleButton = (count) => {
    if (count === 7) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  };

  const handleCount = (checked) => {
    if (checked) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  };

  const removeMovie = (titulo, nota) => {
    setOptions(options => options.filter(item => item.titulo !== titulo && item.nota !== nota));
  };

  const handleMovieList = (checked, e, movie) => {
    let titulo = movie.titulo;
    let nota = e.target.value;
    if (checked) {
      options.push({ "titulo": movie.titulo, "nota": parseFloat(e.target.value )});
    } else {
      removeMovie(titulo, nota);
    }
  };

  const sendToFinal = () => {
    fetch('http://localhost:5000/api/championship', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify()
      })
      .then(response => response.json())
      .then(data => {
      
      localStorage.setItem('championshipResult',data);
      
      })
      .catch(err => {
        console.log(err);
      });

    history.push('/final');
    window.location.reload();
  };

  return (
    <main className="wrapper">
      <Header title="Fase de Seleção"
        description="Selecione 8 filmes que você deseja que entrem na competição e 
        depois pressione o botão Gerar Meu Campeonato para prosseguir."
      />

      <section className="info-section">
        <div>
          <p className="selected-movies">Selecionados</p>
          <p className="selected-movies">{count} de 8 filmes</p>
        </div>

        <button type="submit" className="button"
          disabled={disabled}
          onClick={() => sendToFinal()}
        >
          Gerar Meu Campeonato
        </button>
      </section>

      <section className="movies-section">
        <form className="movie-form">
          {
            movies.map(movie =>
              <label className="movie-card" key={movie.id}>
                <input type="checkbox"
                  className="movie-choice"
                  checked={movie.checked}
                  value={movie.nota}
                  onChange={(e) => {
                    let checked = e.target.checked;

                    handleCount(checked);

                    handleMovieList(checked, e, movie);

                    handleButton(count);

                    setMovies(movies.map(movieData => {
                      if (movie.id === movieData.id) {
                        movieData.select = true;
                      }

                      return movieData;
                    }))
                  }}
                />
                <div className="movie-info">
                  <p className="movie-title">{movie.titulo}</p>
                  <p className="movie-year">{movie.ano}</p>
                </div>
              </label>
            )
          }
        </form>
      </section>

    </main>
  );
}

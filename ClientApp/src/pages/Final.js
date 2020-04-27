import React from 'react';

import Header from "../components/Header/Header";
import './styles.css';

export default function Final() {
  let result = JSON.parse(JSON.stringify(localStorage.getItem('championshipResult'))) || [];
  console.log(result)
  return (
      <div className="wrapper">
      <Header title="Resultado Final" 
        description="Veja o resultado final do 
        Campeonato de filmes de forma simples e rápida" 
      />

    
      <div className="result-wrapper">
        <div className="result">
          <p className="result-position">1º</p>
          <p className="result-title">{result[0].titulo}</p>
        </div>
      </div>

      <div className="result-wrapper">
        <div className="result">
          <p className="result-position">2º</p>
          <p className="result-title">{result[1].titulo}</p>
        </div>
      </div>
    </div>  
  );
}
// Componente responsável por exibir o input e o resultado da calculadora
import React from 'react';
import './Display.css'; // Estilos do display

// Recebe o input e o resultado como props
const Display = ({ input, result }) => {
  return (
    <div className="display">
      {/* Mostra o que o usuário digitou ou 0 se vazio */}
      <div className="input">{input || '0'}</div>
      {/* Mostra o resultado da operação */}
      <div className="result">= {result}</div>
    </div>
  );
};

export default Display;

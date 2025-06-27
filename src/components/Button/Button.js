// Componente de botão reutilizável para a calculadora
import React from 'react';
import './Button.css'; // Estilos do botão

// Recebe valor, função de clique e classe opcional
const Button = ({ value, onClick, className = '' }) => {
  return (
    // O botão chama onClick passando o valor ao ser clicado
    <button
      className={`button ${className}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default Button;


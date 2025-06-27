// Importa os hooks do React e os componentes necessários
import React, { useState } from 'react';
import Display from '../Display/Display'; // Componente que mostra o input e o resultado
import Button from '../Button/Button'; // Componente de botão reutilizável
import { calculateResult } from './calculatorLogic'; // Função para calcular o resultado
import './Calculator.css'; // Estilos da calculadora

// Função auxiliar para pegar o último número digitado no input
const getLastNumber = (input) => {
  // Usa regex para encontrar o último número (positivo ou negativo, com ou sem decimal)
  const match = input.match(/(-?\d*\.?\d*)$/);
  return match ? match[0] : '';
};

// Função auxiliar para substituir o último número do input por outro valor
const replaceLastNumber = (input, newNumber) => {
  return input.replace(/(-?\d*\.?\d*)$/, newNumber);
};

// Componente principal da calculadora
const Calculator = () => {
  // Estado para armazenar o que o usuário digitou
  const [input, setInput] = useState('');
  // Estado para armazenar o resultado da operação
  const [result, setResult] = useState('0');

  // Função chamada ao clicar em qualquer botão
  const handleClick = (value) => {
    if (value === 'C') {
      // Limpa tudo
      setInput('');
      setResult('0');
    } else if (value === '=') {
      // Calcula o resultado usando a função importada
      try {
        const calculated = calculateResult(input);
        setResult(calculated);
        setInput(String(calculated)); // Garante que input seja string para evitar bugs
      } catch {
        setResult('Error'); // Mostra erro se a expressão for inválida
        setInput('');
      }
    } else if (value === '+/-') {
      // Inverte o sinal do último número digitado
      const last = getLastNumber(input);
      if (!last) return;
      const inverted = last.charAt(0) === '-' ? last.slice(1) : `-${last}`;
      setInput(replaceLastNumber(input, inverted));
    } else if (value === '%') {
      // Converte o último número para porcentagem
      const last = getLastNumber(input);
      if (!last) return;
      const percent = String(parseFloat(last) / 100);
      setInput(replaceLastNumber(input, percent));
    } else if (value === '.') {
      // Impede que o usuário coloque dois pontos decimais no mesmo número
      const last = getLastNumber(input);
      if (last.includes('.')) return;
      setInput(input + value);
    } else {
      // Se o último resultado foi erro, reinicia o input
      if (result === 'Error') {
        setResult('0');
        setInput(value);
      } else {
        // Adiciona o valor digitado ao input
        setInput(input + value);
      }
    }
  };

  // Verifica se o input é válido para habilitar o botão =
  // Só habilita se houver input e o último número for válido
  const isInputValid = String(input) && !isNaN(Number(getLastNumber(String(input))));

  return (
    <div className="calculator">
      {/* Mostra o input e o resultado */}
      <Display input={input} result={result} />
      <div className="keypad">
        {/* Cada botão chama handleClick ao ser clicado. aria-label melhora acessibilidade */}
        <Button value="C" onClick={handleClick} className="clear" aria-label="Limpar" />
        <Button value="+/-" onClick={handleClick} aria-label="Inverter sinal" />
        <Button value="%" onClick={handleClick} aria-label="Porcentagem" />
        <Button value="/" onClick={handleClick} className="operator" aria-label="Dividir" />
        
        <Button value="7" onClick={handleClick} aria-label="Sete" />
        <Button value="8" onClick={handleClick} aria-label="Oito" />
        <Button value="9" onClick={handleClick} aria-label="Nove" />
        <Button value="*" onClick={handleClick} className="operator" aria-label="Multiplicar" />
        
        <Button value="4" onClick={handleClick} aria-label="Quatro" />
        <Button value="5" onClick={handleClick} aria-label="Cinco" />
        <Button value="6" onClick={handleClick} aria-label="Seis" />
        <Button value="-" onClick={handleClick} className="operator" aria-label="Subtrair" />
        
        <Button value="1" onClick={handleClick} aria-label="Um" />
        <Button value="2" onClick={handleClick} aria-label="Dois" />
        <Button value="3" onClick={handleClick} aria-label="Três" />
        <Button value="+" onClick={handleClick} className="operator" aria-label="Somar" />
        
        <Button value="0" onClick={handleClick} className="zero" aria-label="Zero" />
        <Button value="." onClick={handleClick} aria-label="Ponto decimal" />
        {/* O botão = só pode ser clicado se o input for válido */}
        <Button value="=" onClick={handleClick} className="equals" aria-label="Igual" disabled={!isInputValid} />
      </div>
      {/* Rodapé com o nome do desenvolvedor */}
      <footer style={{textAlign: 'center', marginTop: '1rem', color: '#888', fontSize: '0.9rem'}}>
        Desenvolvido por Jonathan Gomes
      </footer>
    </div>
  );
};

export default Calculator;



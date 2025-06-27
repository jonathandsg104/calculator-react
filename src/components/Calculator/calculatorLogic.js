export const calculateResult = (input) => {
    try {
      // Substitui símbolos para avaliação segura
      const sanitizedInput = input
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '*0.01*');
      
      // Avaliação segura (melhor que usar eval diretamente)
      return new Function(`return ${sanitizedInput}`)();
    } catch {
      throw new Error('Invalid input');
    }
  };
  
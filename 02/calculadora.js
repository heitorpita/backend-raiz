//calculadora simples
// receba dois numeros via argumentos de linha de comando
// e exiba a soma, subtração, multiplicação e divisão desses números
// exiba os resultados formatados

const argumentos = process.argv.slice(2);   
const num1 = parseFloat(argumentos[0]);
const num2 = parseFloat(argumentos[1]); 
const soma = num1 + num2;
const subtracao = num1 - num2;
const multiplicacao = num1 * num2;
const divisao = num1 / num2;
console.log(`Números recebidos: ${num1} e ${num2}`);
console.log(`Soma: ${soma}`);
console.log(`Subtração: ${subtracao}`); 
console.log(`Multiplicação: ${multiplicacao}`);
console.log(`Divisão: ${divisao}`);


// Importando com "default export"
import somar from "./math/soma.js";

//Importando com "named exports"
import { subtracao } from "./math/subtracao.js";
import { multiplicacao, divisao } from "./math/utils.js";
import { percentual } from "./math/percentual.js";
import potencia from "./math/utils.js";

//Testando as funções
console.log(`Soma: ${somar(10, 5)}`);
console.log(`Subtração: ${subtracao(10, 5)}`);
console.log(`Multiplicação: ${multiplicacao(10, 5)}`);
console.log(`Divisão: ${divisao(10, 5)}`);
console.log(`Potência: ${potencia(10, 2)}`);
console.log(`Percentual: ${percentual(15, 100)}`);
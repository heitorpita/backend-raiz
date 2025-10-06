const servidor = http.createServer((request, response) => {
    response.end("Servidor rodando!");
});
const http = require('http');   
const PORTA = 3000;

servidor.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
}); 
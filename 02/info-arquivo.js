const fs = require('fs');
const path = require('path');

const nomeArquivo = 'calculadora.js';
const caminhoArquivo = path.join(__dirname, nomeArquivo);

fs.stat(caminhoArquivo, (err, stats) => {
    if (err) {
        console.error('Erro ao obter informações do arquivo:', err);
        return;
    }
    console.log(`Informações do arquivo: ${nomeArquivo}`);
    console.log(`Caminho: ${caminhoArquivo}`);
    console.log(`Tamanho: ${stats.size} bytes`);
    console.log(`Criado em: ${stats.birthtime}`);
    console.log(`Modificado em: ${stats.mtime}`);
    console.log(`É um arquivo? ${stats.isFile()}`);
    console.log(`É um diretório? ${stats.isDirectory()}`);
});

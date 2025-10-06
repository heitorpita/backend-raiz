//Importando módulos nativos do Node.js
// 'os' fornece informações sobre o sistema operacional
const os = require('os');
// 'path' permite manipular e trabalhar com caminhos de arquivos e diretórios
const path = require('path');
// 'fs' permite interagir com o sistema de arquivos (ler, escrever, listar...)
const fs = require('fs');


//Exibindo informações do sistema operacional
console.log('=== INFORMAÇÕES DO SISTEMA ===');
console.log('Plataforma: ', os.platform()); //Exibe o sistema operacional
console.log('Arquitetura: ', os.arch()); //Exibe a arquitetura do processador
console.log('Memória Total:', Math.round(os.totalmem() / 1024 / 1024 / 1024) + 'GB'); //Memória RAM total em GB
console.log('Memória Livre:', Math.round(os.freemem() / 1024 / 1024 / 1024) + 'GB'); //Memória RAM livre em GB

//Exibindo informações de arquivos e diretorios

console.log('=== INFORMAÇÕES DE CAMINHO ===');
console.log('Diretório atual:', __dirname); //Caminho absoluto do diretorio atual
console.log('Arquivo atual:', __filename); //Caminho absoluto do arquivo atual
console.log('Extensão do arquivo:', path.extname(__filename)); //Extensão do arquivo atual.


console.log('\n === ARQUIVOS NO DIRETÓRIO ===');
fs.readdir('.', (err, files) => {
    if (err) {
        console.error('Erro ao ler diretório:', err);
        return;
    }
    files.forEach(file =>{
        console.log('📁', file);
    });
});



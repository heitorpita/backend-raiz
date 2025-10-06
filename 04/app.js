import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Rota com Send (texto simples)

app.get('/texto', (req, res) => {

    res.send("Resposta em texto simples");


});


//Rota com JSON
app.get('/json', (req, res) => {
    res.json({ mensagem : 'RESPOSTA JAISON', tempo: Date.now()});

});


//Rota com Status Code + JSON
app.post('/criar', (req, res) => {
    res.status(201).json({sucesso: true, mensagem: "Recurso criado com sucesso!"});}
)


app.listen(port, () => {
        console.log(`Aplicação rodando em http://localhost:${port}`);
    });

//Rota com Erro
app.get('/erro', (req, res) => {
    res.status(400).json({sucesso: false, mensagem: "Erro interno do servidor!"});
})

//Rota com Redirecionamento
app.get('/redirect', (req, res) => {
    res.redirect('https://venge.io/#');
})

//rota sem conteudo
app.get('/no-content', (req, res) => {
    res.sendStatus(204);
})

    const maca = { nome: 'Maçã', preco: 2.5 };
    const banana = { nome: 'Banana', preco: 1.5 };
    const laranja = { nome: 'Laranja', preco: 3.0 };

//criar uma rota /produtos que retorne uma lista de produtos em JSON
app.get('/produtos', (req, res) => {
    const produtos = [ maca, banana, laranja ];

    res.json(produtos)
});


//criar uma rota /download que retorna um aquivo local de exeplo use res.download e path.join 
app.get('/download', (req, res) => {
  const arquivo = path.join(__dirname, 'nomeArquivo.txt');
  res.download(arquivo, 'arquivo.txt', (err) => {
    if (err) {
        console.error('Erro ao baixar o arquivo:', err);
        res.status(500).send('Erro ao baixar o arquivo');
    }
  });
});


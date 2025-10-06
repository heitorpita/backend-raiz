import express from "express";
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Worldszsxz!');
})

app.get('/test', (req, res) => {
  res.json({"nome": "Joel Santos"});
})

app.get('/saudacao', (req, res) => {
  res.send("Meu nome é Heitor");
})

app.get('/saudacao/:nome', (req, res) => {
  const nome = req.params.nome;
    res.send(`Meu nome é ${nome}!`);
})


app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
})
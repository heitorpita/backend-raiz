import express from 'express';
import livroRoutes from './src/routes/livroRoutes.js';
const app = new express();
const port = 3000;

app.use(express.json());
app.use('/livros', livroRoutes);

app.get('/', (req, res) => {

    res.status(200).send("Home");

});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


